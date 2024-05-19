<?php
include './includes/db_connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['user_name'], $_POST['message'])) {
        $user_name = $conn->real_escape_string($_POST['user_name']);
        $message = $conn->real_escape_string($_POST['message']);

        $sql = "INSERT INTO chat_messages (user_name, message) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $user_name, $message);

        if ($stmt->execute()) {
            echo "Mensaje guardado exitosamente";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

        $stmt->close();
    } else {
        echo "Todos los campos son obligatorios.";
    }
}

$conn->close();
?>
