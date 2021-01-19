<?php 
require('../connect/connect.php');
$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['email']) && isset($data['pass']) && isset($data['first_name']) && isset($data['last_name'])){
    $user_id = uniqid();
    $email = $data['email'];
    $pass = $data['pass'];
    $first_name = $data['first_name'];
    $last_name = $data['last_name'];
    $query_email = "SELECT * FROM users WHERE email = '$email'";
    $query_reg = "INSERT INTO users (user_id, email, pass, first_name, last_name) VALUES ('$user_id','$email', '$pass','$first_name','$last_name')";
    $result_email_check = mysqli_query($connection, $query_email) or die('Ошибка ' . mysqli_error($connection));
    if (mysqli_fetch_assoc($result_email_check) != '') {
        $answer = array('answer' => 'Пользователь уже существует');
        echo json_encode($answer, JSON_UNESCAPED_UNICODE);
    } else {
        $result_reg = mysqli_query($connection, $query_reg) or die('Ошибка ' . mysqli_error($connection));
        $query_table = "CREATE TABLE  $user_id  (id INT(100) NOT NULL AUTO_INCREMENT, first_name VARCHAR(20), last_name VARCHAR(20), PRIMARY KEY(id))";
        $result_create_table = mysqli_query($connection, $query_table) or die('Ошибка ' . mysqli_error($connection));
        $good_answer = array('good_answer' => 'Пользователь зарегестрирован');
        echo json_encode($good_answer, JSON_UNESCAPED_UNICODE);
    }
    mysqli_close($connection);
} 
?>