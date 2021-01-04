const express = require('express');
const mysql = require('mysql');
const body_parser = require('body-parser');
let uid = require ('uid');
const cors = require ('cors');


const app = express()

app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));

const conn = mysql.createConnection( {
    host: 'localhost',
    user: 'root',
    database: 'user_list',
    password: 'root'
})

app.listen(3001, () => {
    console.log('API started')
})

function Connect() {
    conn.connect(err => {
        if (err) {
            return console.log("Ошибка: " + err.message);
        } else {
            console.log('Подключение открыто');
        }
    })
}

Connect();

app.get('/all_contact', function(req, res) {
    conn.query('SELECT * FROM `all_contact`', (err, result) => {
        if (err) {
            console.log(err);
            Connect();
            res.status(404)
        } else {
            res.send(result)
        }
    })
})

app.post('/reg', function(req, res) {
    let user_id = uid();
    let query_str = 'INSERT INTO users (user_id, email, pass, first_name, last_name) VALUES (?,?,?,?,?)';
    let query_email = 'SELECT * FROM `users` WHERE email = ?';
    conn.query(query_email, [req.body.email], (err, result) =>{
        if (result != '') {
            const answer = {
                answer: 'Пользователь уже существует'
            }
            res.send(answer) 
        } else {
            conn.query(query_str, [user_id, req.body.email, req.body.pass, req.body.first_name, req.body.last_name], (err, result) => {
                if (err) {
                    console.log(err);
                    Connect();
                    res.sendStatus(404)
                } else {
                    let query_table = 'CREATE TABLE '+ user_id + ' (id INT(100) NOT NULL AUTO_INCREMENT, first_name VARCHAR(20), last_name VARCHAR(20), PRIMARY KEY(id))';
                    conn.query(query_table, (err) => {
                        if (err) {
                            console.log(err);
                            Connect();
                            res.sendStatus(404)
                        } else {
                            const answer = {
                                good_answer: 'Пользователь зарегестрирован'
                            }
                            res.send(answer)
                        }
                    })
                }
            })
        }
    }) 
})

app.post('/auth', function(req, res) {
    let query_email = 'SELECT * FROM `users` WHERE email = ?';
    conn.query(query_email, [req.body.email], (err, result) =>{
        if (err) {
            Connect();
            return console.log("Ошибка: " + err.message);
        } else if (result == '') {
            const answer = {
                answer: 'Пользователь не найден'
            }
            res.send(answer)
        } else if (result[0].pass != req.body.pass){
            const answer = {
                answer: 'Неверный пароль'
            }
            res.send(answer)
        } else {
            let session_user = uid();
            let query_session = 'UPDATE users SET sess = ' + '"' + session_user + '"' + ' WHERE email = ' + '"' + req.body.email + '"';
            conn.query(query_session, (err, result) => {
                if (err) {
                    Connect();
                    return console.log("Ошибка: " + err.message);
                } else {
                    let session ={
                        session_user: session_user
                    }
                    res.send(session);
                }
            })
        }
    })
})

app.post('/exit', function(req, res) {
    let query_session = 'UPDATE users SET sess = 0 WHERE sess = ' + '"' + req.body.sess + '"';
    conn.query(query_session, (err) => {
        if (err) {
            Connect();
            return console.log("Ошибка: " + err.message);
        } else {
            const answer = {
                answer: 'ОК'
            }
            res.send(answer);
        }
    })
})

app.post('/add_to_fav', function(req, res) {
    let query_sess = 'SELECT * FROM `users` WHERE sess = ?';
    conn.query(query_sess, [req.body.sess], (err, result) => {
        if (err) {
            console.log("Ошибка: " + err.message);
            Connect();
            res.sendStatus(404)
        } else {
            let query_fav = 'INSERT INTO ' + result[0].user_id + ' (first_name, last_name) ' +
                            'SELECT `first_name`, `last_name` ' + 
                            'FROM `all_contact` ' +
                            'WHERE `id` = ' + req.body.id;
            conn.query(query_fav, (err) => {
                if (err) {
                    console.log("Ошибка: " + err.message);
                    Connect();
                    res.sendStatus(404)
                } else {
                    let answer = {
                        answer: 'Добавлено'
                    }
                    res.send(answer)
                }
            })
        }
    })
})

app.post('/fav_list', function(req, res) {
    if (req.body.sess === '') {
        res.sendStatus(404);
    }
    let query_sess = 'SELECT * FROM `users` WHERE sess = ?';
    conn.query(query_sess, [req.body.sess], (err, result) => {
        if (err) {
            console.log("Ошибка: " + err.message);
            Connect();
            res.sendStatus(404)
        } else {
            let query_id = 'SELECT * FROM ' + result[0].user_id;
            conn.query(query_id, (err, result_data) => {
                if (err) {
                    console.log("Ошибка: " + err.message);
                    Connect();
                    res.sendStatus(404)
                } else {
                    res.send(result_data);
                }
            })
        }
    })
})

app.post('/acc_info', function(req, res) {
    if (req.body.sess === '') {
        res.sendStatus(404);
    }
    let query_sess = 'SELECT * FROM `users` WHERE sess = (?)';
    conn.query(query_sess, [req.body.sess], (err, result) => {
        if (err) {
            console.log("Ошибка: " + err.message);
            Connect();
            res.sendStatus(404)
        } else {
            let data = {
                first_name: result[0].first_name,
                last_name: result[0].last_name
            }
            res.send(data);
        }
    })
})