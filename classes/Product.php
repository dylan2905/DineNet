<?php
require_once 'config/database.php';

class Product {
    private $conn;
    private $table_name = "products";

    public $id;
    public $name;
    public $description;
    public $price;
    public $category_id;
    public $group_id;
    public $subgroup_id;
    public $has_preparation;
    public $preparation_time;
    public $image_url;
    public $is_active;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET 
                  name=:name, description=:description, price=:price, 
                  category_id=:category_id, group_id=:group_id, subgroup_id=:subgroup_id,
                  has_preparation=:has_preparation, preparation_time=:preparation_time, 
                  image_url=:image_url";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":category_id", $this->category_id);
        $stmt->bindParam(":group_id", $this->group_id);
        $stmt->bindParam(":subgroup_id", $this->subgroup_id);
        $stmt->bindParam(":has_preparation", $this->has_preparation);
        $stmt->bindParam(":preparation_time", $this->preparation_time);
        $stmt->bindParam(":image_url", $this->image_url);
        
        return $stmt->execute();
    }

    public function readAll() {
        $query = "SELECT p.*, c.name as category_name, g.name as group_name, s.name as subgroup_name 
                  FROM " . $this->table_name . " p
                  LEFT JOIN categories c ON p.category_id = c.id
                  LEFT JOIN groups_table g ON p.group_id = g.id
                  LEFT JOIN subgroups s ON p.subgroup_id = s.id
                  WHERE p.is_active = 1
                  ORDER BY c.name, g.name, s.name, p.name";
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readByCategory($category_id) {
        $query = "SELECT p.*, c.name as category_name, g.name as group_name, s.name as subgroup_name 
                  FROM " . $this->table_name . " p
                  LEFT JOIN categories c ON p.category_id = c.id
                  LEFT JOIN groups_table g ON p.group_id = g.id
                  LEFT JOIN subgroups s ON p.subgroup_id = s.id
                  WHERE p.category_id = ? AND p.is_active = 1
                  ORDER BY g.name, s.name, p.name";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $category_id);
        $stmt->execute();
        return $stmt;
    }
}
?>
