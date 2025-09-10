<?php
require_once 'config/database.php';

class Subgroup {
    private $conn;
    private $table_name = "subgroups";

    public $id;
    public $group_id;
    public $name;
    public $description;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET group_id=:group_id, name=:name, description=:description";
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(":group_id", $this->group_id);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":description", $this->description);
        
        return $stmt->execute();
    }

    public function readByGroup($group_id) {
        $query = "SELECT s.*, g.name as group_name FROM " . $this->table_name . " s 
                  LEFT JOIN groups_table g ON s.group_id = g.id 
                  WHERE s.group_id = ? ORDER BY s.name";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $group_id);
        $stmt->execute();
        return $stmt;
    }
}
?>
