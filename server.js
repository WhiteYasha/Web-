/**
 * 接口说明:
 *  addShop?name&address&phone
 *  deleteShop?id
 *  updateShop?id&name&address&phone
 *
 *  addNews?title&tags&content&author&source
 *  deleteNews?id
 *  updateNews?id&title&tags&content&author&source
 */

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
// 修改接口
/*-------------------------------对shops表的操作--------------------------------*/
//  增加门店
app.get("/addShop", (req, res) => {
    let name = res.query.name,
        address = res.query.address,
        phone = res.query.phone;
    pool.getConnection((err, connection) => {
        if (err) console.log("增加门店信息: " + err);
        else {
            connection.query(`INSERT INTO shops(name, address, phone) VALUES ('${name}', '${address}', '${phone}')`, (err, result) => {
                if (err) console.log("增加shops: " + err);
                else res.end();
                connection.release();
            });
        }
    });
});
//  删除门店
app.get("/deleteShop", (req, res) => {
    let id = res.query.id;
    pool.getConnection((err, connection) => {
        if (err) console.log("删除门店信息: " + err);
        else {
            connection.query(`DELETE FROM shops WHERE id = ${id}`, (err, result) => {
                if (err) console.log("删除shops: " + err);
                else res.end();
                connection.release();
            });
        }
    });
});
//  修改门店信息
app.get("/updateShop", (req, res) => {
    let id = res.query.id,
        name = res.query.name,
        address = res.query.address,
        phone = res.query.phone;
    pool.getConnection((err, connection) => {
        if (err) console.log("修改门店信息: " + err);
        else {
            connection.query(`UPDATE shops SET name = '${name}', address = '${address}', phone='${phone}' WHERE id = '${id}'`, (err, result) => {
                if (err) console.log("修改shops: " + err);
                else res.end();
                connection.release();
            });
        }
    });
});
/*-------------------------------对news表的操作---------------------------------*/
app.get("/addNews", (req, res) => {
    let title = req.query.title,
        tags = req.query.tags,
        content = req.query.content,
        author = req.query.author,
        source = req.query.source;
    pool.getConnection((err, connection) => {
        if (err) console.log("增加新闻信息: " + err);
        else {
            connection.query(`INSERT INTO news(title, tags, content, author, source) VALUES ('${title}', '${tags}', '${content}', '${author}', '${source}')`, (err, result) => {
                if (err) console.log("增加news: " + err);
                else res.end();
                connection.release();
            });
        }
    });
});
app.get("/deleteNews", (req, res) => {
    let id = req.query.id;
    pool.getConnection((err, connection) => {
        if (err) console.log("修改新闻信息: " + err);
        else {
            connection.query(`DELETE FROM news WHERE id = ${id}`, (err, result) => {
                if (err) consoel.log("删除news: " + err);
                else res.end();
                connection.release();
            });
        }
    });
});
app.get("/updateNews", (req, res) => {
    let id = req.query.id,
        title = req.query.title,
        tags = req.query.tags,
        content = req.query.content,
        author = req.query.author,
        source = req.query.source;
    pool.getConnection((err, connection) => {
        if (err) console.log("修改新闻信息: " + err);
        else {
            const sql = `UPDATE news SET title = ${title}, tags = ${tags}, content = ${content}, author = ${author}, source = ${source} WHERE id = ${id}`;
            connection.query(sql, (err, result) => {
                if (err) console.log("增加news: " + err);
                else res.end();
                connection.release();
            });
        }
    });
});

app.listen(port, () => console.log(`成功: 端口${port}`));
