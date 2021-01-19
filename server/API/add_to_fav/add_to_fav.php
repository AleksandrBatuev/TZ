<?php
require('../connect/connect.php');
$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['sess']) && isset($data['id'])){
    $session = $data['sess'];
    $id = $data['id'];
    $query_session = "SELECT user_id FROM users WHERE sess = '$session'";
    $result_sess_check = mysqli_query($connection, $query_session) or die('Ошибка ' . mysqli_error($connection));
    if ($result_sess_check != '') {
        while($res = mysqli_fetch_assoc($result_sess_check)) {
            $user_list = $res;
        }
        $us_id = array_shift($user_list);
        $query_fav = "INSERT INTO $us_id (first_name, last_name) SELECT first_name, last_name FROM all_contact WHERE id = '$id'";
        $result_fav_add = mysqli_query($connection, $query_fav) or die('Ошибка ' . mysqli_error($connection));
        $answer = array('answer'=>'Добавлено');
        echo json_encode($answer, JSON_UNESCAPED_UNICODE);
    }
    mysqli_close($connection);
}
?>