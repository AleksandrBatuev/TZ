<?php
require('../connect/connect.php');
$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['email']) && isset($data['pass'])){
    $email = $data['email'];
    $pass = $data['pass'];
    $query_auth = "SELECT * FROM users WHERE email = '$email'";
    $result_auth_check = mysqli_query($connection, $query_auth) or die('Ошибка ' . mysqli_error($connection));
    $query_pass = "SELECT * FROM users WHERE pass = '$pass'";
    $result_pass_check = mysqli_query($connection, $query_pass) or die('Ошибка ' . mysqli_error($connection));
    if (mysqli_fetch_assoc($result_auth_check) == '') {
        $answer = array('answer' => 'Пользователь не найден');
        echo json_encode($answer, JSON_UNESCAPED_UNICODE);
    } else if (mysqli_fetch_assoc($result_pass_check) == ''){
        $answer = array('answer' => 'Неверный пароль');
        echo json_encode($answer, JSON_UNESCAPED_UNICODE);
    } else {
        $session_user = uniqid();
        $query_session = "UPDATE users SET sess = '$session_user'  WHERE email = '$email'";
        $result_auth = mysqli_query($connection, $query_session) or die('Ошибка ' . mysqli_error($connection));
        $session_answer = array('session_user' => $session_user);
        echo json_encode($session_answer, JSON_UNESCAPED_UNICODE);
    }
    mysqli_close($connection);
}
?>