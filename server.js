const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mysql = require('mysql');
const port = 9000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var pool = mysql.createPool({
    host: "localhost",
    port: "3306",
    database: "xinbailu",
    user: "root",
    password: "123456"
});
// 获取数据接口
// 获取所有门店信息
app.get('/getShopList', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) console.log("获取门店信息错误!");
        else {
            
        }
    });
});

app.listen(port);
