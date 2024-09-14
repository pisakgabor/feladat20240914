<?php
header('Content-Type: application/json');

// Adatbázis kapcsolódási adatok
include('../../admin/cnfg.php');
// Kapcsolódás az adatbázishoz
$conn = new mysqli($host, $user, $pass, $db);

// Kapcsolódás ellenőrzése
if ($conn->connect_error) {
    die("Kapcsolódási hiba: " . $conn->connect_error);
}

// POST adatok beolvasása
$data = json_decode(file_get_contents('php://input'), true);
$rating = $data['rating'];
$review = $data['review'];

// Értékelés mentése az adatbázisba
$sql = "INSERT INTO ertekeles (rating, review) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("is", $rating, $review);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}

// Kapcsolat bezárása
$stmt->close();
$conn->close();
?>
