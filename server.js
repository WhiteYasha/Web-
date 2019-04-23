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
    database: "management",
    user: "root",
    password: "123456"
});
// 获取数据接口
// 获取所有新闻信息
app.get('/getNewsList', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) console.log("获取新闻信息: " + err);
        else {
            connection.query("SELECT * FROM news ORDER BY date DESC", (err, result) => {
                if (err) console.log("查询news: " + err);
                else {
                    result.forEach((item) => {
                        if (item.tags !== null) item.tags = item.tags.split(",");
                        item.date = `${item.date.getFullYear()}-${item.date.getMonth() + 1}-${item.date.getDate()}`;
                    });
                    res.send(result);
                }
                connection.release();
            });
        }
    });
});
// 获取所有门店信息
app.get('/getShopList', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) console.log("获取门店信息: " + err);
        else {
            connection.query("SELECT * FROM shops", (err, result) => {
                if (err) console.log("查询shops表: " + err);
                else res.send(result);
                connection.release();
            });
        }
    });
});
// 获取所有菜品信息
app.get("/getDishesList", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) console.log("获取菜品信息: " + err);
        else {
            connection.query("SELECT * FROM dishes", (err, result) => {
                if (err) console.log("查询dishes: " + err);
                else {
                    result.forEach((item) => {
                        if (item.tags !== null) item.tags = item.tags.split(",");
                        item.rate = parseFloat(item.rate);
                    });
                    res.send(result);
                }
                connection.release();
            });
        }
    });
});
// 获取所有招聘信息
app.get("/getRecruitList", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) console.log("获取招聘信息: " + err);
        else {
            connection.query("SELECT * FROM recruit", (err, result) => {
                if (err) console.log("查询recruit: " + err);
                else res.send(result);
                connection.release();
            });
        }
    });
});


app.listen(port, () => console.log(`成功: 端口${port}`));
