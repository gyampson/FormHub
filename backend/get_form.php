<?php
require_once("../db/connection.php");
$id = $_GET['id'];
$sql = "SELECT id, name, email, message, created_at FROM forms WHERE id = $id";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
} else {
    echo json_encode(["error" => "Form not found"]);
}
?>
