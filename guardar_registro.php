<?php
include './includes/db_connection.php';

// Verificar que todos los campos estén presentes
if (isset($_POST['nombre'], $_POST['telefono'], $_POST['ciudad'])) {
    $nombre = $conn->real_escape_string($_POST['nombre']);
    $telefono = $conn->real_escape_string($_POST['telefono']);
    $ciudad = $conn->real_escape_string($_POST['ciudad']);

    // Insertar los datos en la base de datos
    $sql = "INSERT INTO registros (Nombre, Telefono, Ciudad) VALUES ('$nombre', '$telefono', '$ciudad')";

    if ($conn->query($sql) === TRUE) {
        echo "Registro guardado correctamente.";
    } else {
        echo "Error al guardar el registro: " . $conn->error;
    }
} else {
    echo "Todos los campos son obligatorios.";
}

// Cerrar la conexión
$conn->close();
?>
