<?php
require_once("../db/connection.php");
$id = $_POST['id'];
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$sql = "UPDATE forms SET name='$name', email='$email', message='$message' WHERE id=$id";
if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}
?>
