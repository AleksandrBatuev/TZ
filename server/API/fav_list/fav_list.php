<?php
require('../connect/connect.php');
$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['sess'])){
    $session = $data['sess'];
    $query_session = "SELECT user_id FROM users WHERE sess = '$session'";
    $result_sess_check = mysqli_query($connection, $query_session) or die('Ошибка ' . mysqli_error($connection));
    if ($result_sess_check != '') {
        while($user = mysqli_fetch_assoc($result_sess_check)) {
            $user_list = $user;
        }
        $us_id = array_shift($user_list);
        $query_id = "SELECT * FROM $us_id";
        $result_fav_list = mysqli_query($connection, $query_id) or die('Ошибка ' . mysqli_error($connection));
        $response = [];
        while($res = mysqli_fetch_assoc($result_fav_list)) {
            array_push($response, $res);
        }
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
    }
    mysqli_close($connection);
}
?>