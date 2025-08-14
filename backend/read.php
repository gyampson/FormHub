<?php
require_once("../db/connection.php");
$sql = "SELECT id, name, email, message, created_at FROM forms ORDER BY id DESC";
$result = $conn->query($sql);
$forms = [];
while ($row = $result->fetch_assoc()) {
    $forms[] = $row;
}
echo json_encode($forms);
?>
