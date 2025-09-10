<?php
header('Content-Type: application/json');
require_once '../config/database.php';
require_once '../classes/Group.php';

if (isset($_GET['category_id'])) {
    $database = new Database();
    $db = $database->getConnection();
    $group = new Group($db);
    
    $result = $group->readByCategory($_GET['category_id']);
    $groups = [];
    
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $groups[] = $row;
    }
    
    echo json_encode($groups);
} else {
    echo json_encode([]);
}
?>
