<?php
require_once 'config/database.php';

class Order {
    private $conn;
    private $table_name = "orders";

    public $id;
    public $table_id;
    public $total;
    public $status;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET table_id=:table_id, total=:total, status=:status";
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(":table_id", $this->table_id);
        $stmt->bindParam(":total", $this->total);
        $stmt->bindParam(":status", $this->status);
        
        if($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }
        return false;
    }

    public function getKitchenOrders() {
        $query = "SELECT DISTINCT o.id as order_id, o.created_at as order_time, 
                         tr.table_number, oi.id as item_id, p.name as product_name, 
                         oi.quantity, p.preparation_time, oi.preparation_status,
                         oi.preparation_start_time, oi.estimated_ready_time
                  FROM " . $this->table_name . " o
                  JOIN order_items oi ON o.id = oi.order_id
                  JOIN products p ON oi.product_id = p.id
                  JOIN tables_restaurant tr ON o.table_id = tr.id
                  WHERE p.has_preparation = 1 
                  AND oi.preparation_status IN ('pending', 'preparing')
                  AND o.status NOT IN ('delivered', 'cancelled')
                  ORDER BY o.created_at ASC, oi.preparation_start_time ASC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function updateItemPreparationStatus($item_id, $status) {
        $query = "UPDATE order_items SET preparation_status = :status";
        
        if($status == 'preparing') {
            $query .= ", preparation_start_time = NOW(), estimated_ready_time = DATE_ADD(NOW(), INTERVAL (SELECT preparation_time FROM products WHERE id = (SELECT product_id FROM order_items WHERE id = :item_id)) MINUTE)";
        }
        
        $query .= " WHERE id = :item_id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":status", $status);
        $stmt->bindParam(":item_id", $item_id);
        
        return $stmt->execute();
    }
}
?>
