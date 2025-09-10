<?php
header('Content-Type: application/json');
require_once '../config/database.php';
require_once '../classes/Subgroup.php';

if (isset($_GET['group_id'])) {
    $database = new Database();
    $db = $database->getConnection();
    $subgroup = new Subgroup($db);
    
    $result = $subgroup->readByGroup($_GET['group_id']);
    $subgroups = [];
    
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $subgroups[] = $row;
    }
    
    echo json_encode($subgroups);
} else {
    echo json_encode([]);
}
?>
