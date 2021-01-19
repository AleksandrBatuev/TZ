<?php 
require('../connect/connect.php');

if (isset($_GET)){
    $query = 'SELECT * FROM `all_contact`';
    $result = mysqli_query($connection, $query) or die('Ошибка ' . mysqli_error($connection));
    $response = [];
    while($res = mysqli_fetch_assoc($result)) {
        array_push($response, $res);
    }
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    mysqli_close($connection);
}
?>