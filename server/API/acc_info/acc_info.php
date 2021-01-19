<?php
require('../connect/connect.php');
$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['sess'])){
    $session = $data['sess'];
    $query_session = "SELECT first_name, last_name FROM users WHERE sess = '$session'";
    $result_acc_info = mysqli_query($connection, $query_session) or die('Ошибка ' . mysqli_error($connection));
    while($res = mysqli_fetch_assoc($result_acc_info)) {
        echo json_encode($res, JSON_UNESCAPED_UNICODE);
    }
    mysqli_close($connection);
}
?>