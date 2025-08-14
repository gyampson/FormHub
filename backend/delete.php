<?php
require_once("../db/connection.php");
$id = $_GET['id'];
if ($conn->query("DELETE FROM forms WHERE id=$id")) {
	echo json_encode(["success" => true]);
} else {
	echo json_encode(["success" => false, "error" => $conn->error]);
}
?>
