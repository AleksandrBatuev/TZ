<?php
require('../connect/connect.php');
$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['sess'])){
    $sess = $data['sess'];
    $query_session = "UPDATE users SET sess = 0 WHERE sess = '$sess'";
    $result_sess_check = mysqli_query($connection, $query_session) or die('Ошибка ' . mysqli_error($connection));
    $answer = array('answer' => 'OK');
    echo json_encode($answer, JSON_UNESCAPED_UNICODE);
    mysqli_close($connection);
}
?>