<?php
require_once 'config/database.php';

class Group {
    private $conn;
    private $table_name = "groups_table";

    public $id;
    public $category_id;
    public $name;
    public $description;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET category_id=:category_id, name=:name, description=:description";
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(":category_id", $this->category_id);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":description", $this->description);
        
        return $stmt->execute();
    }

    public function readByCategory($category_id) {
        $query = "SELECT g.*, c.name as category_name FROM " . $this->table_name . " g 
                  LEFT JOIN categories c ON g.category_id = c.id 
                  WHERE g.category_id = ? ORDER BY g.name";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $category_id);
        $stmt->execute();
        return $stmt;
    }

    public function readAll() {
        $query = "SELECT g.*, c.name as category_name FROM " . $this->table_name . " g 
                  LEFT JOIN categories c ON g.category_id = c.id ORDER BY c.name, g.name";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>
