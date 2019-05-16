/**
 * 接口说明:
 *  addShop?name&address&phone
 *  deleteShop?id
 *  updateShop?id&name&address&phone
 *
 *  addNews?title&tag&content&author&source
 *  deleteNews?id
 *  updateNews?id&title&tag&content&author&source
 */

const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
const port = 9001;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

var pool = mysql.createPool({
    host: "localhost",
    port: "3306",
    database: "management",
    user: "root",
    password: "123456"
});

function formatDate(date) {
    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();
    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
}

function formatDatetime(datetime) {
    let year = datetime.getFullYear(),
        month = datetime.getMonth() + 1,
        day = datetime.getDate(),
        hour = datetime.getHours(),
        minute = datetime.getMinutes(),
        second = datetime.getSeconds();
    var temp = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    temp += ` ${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}:${second < 10 ? '0' : ''}${second}`;
    return temp;
}

//  用户登录接口
app.get("/login", (req, res) => {
    let name = req.query.name,
        password = req.query.password;
    pool.getConnection((err, connection) => {
        if (err) console.log("用户登录: " + err);
        else {
            connection.query(`SELECT * FROM users WHERE name = '${name}'`, (err, result) => {
                if (err) console.log("查询users: " + err);
                else {
                    if (result.length === 0) res.send({
                        state: -1
                    });
                    else {
                        if (result[0].password === password) res.send({
                            state: 1
                        });
                        else res.send({
                            state: 0
                        });
                    }
                }
                connection.release();
            });
        }
    });
});
//  获取数据接口
//  获取所有新闻信息
app.get('/getNewsList', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) console.log("获取新闻信息: " + err);
        else {
            connection.query("SELECT * FROM news ORDER BY date DESC", (err, result) => {
                if (err) console.log("查询news: " + err);
                else {
                    result.forEach((item) => {
                        let year = item.date.getFullYear(),
                            month = item.date.getMonth() + 1,
                            day = item.date.getDate();
                        item.date = formatDatetime(item.date);
                    });
                    res.send(result);
                }
                connection.release();
            });
        }
    });
});
//  获取所有门店信息
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
//  获取所有菜品信息
app.get("/getDishesList", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) console.log("获取菜品信息: " + err);
        else {
            connection.query("SELECT * FROM dishes", (err, result) => {
                if (err) console.log("查询dishes: " + err);
                else {
                    result.forEach((item) => {
                        item.rate = parseFloat(item.rate);
                    });
                    res.send(result);
                }
                connection.release();
            });
        }
    });
});
//  获取所有招聘信息
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
//  获取留言
app.get("/getMessageList", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) console.log("获取留言: " + err);
        else {
            connection.query("SELECT * FROM messages", (err, result) => {
                if (err) console.log("获取messages: " + err);
                else {
                    result.forEach((item) => {
                        item.date = formatDatetime(item.date);
                    });
                    res.send(result);
                }
                connection.release();
            });
        }
    });
});
//  获取访问量(一个月)
app.get("/getVisits", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) console.log("获取访问: " + err);
        else {
            connection.query("SELECT * FROM visits WHERE day >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND day <= CURDATE()", (err, result) => {
                if (err) console.log("获取visit: " + err);
                else {
                    result.forEach((item) => {
                        item.day = formatDate(item.day);
                    });
                    res.send(result);
                }
                connection.release();
            });
        }
    });
});
//  修改接口
/*-------------------------------对visits表的操作---------------------------------*/
//  访问页面
app.get("/visit", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) console.log("访问页面: " + err);
        else {
            connection.query("CALL visit()", (err, result) => {
                if (err) console.log("调用visit(): " + err);
                else res.end();
                connection.release();
            });
        }
    });
});
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
app.get("/watchNews", (req, res) => {
    let id = req.query.id;
    pool.getConnection((err, connection) => {
        if (err) console.log("查看新闻信息: " + err);
        else {
            connection.query(`UPDATE news SET views = views + 1 WHERE id = ${id}`, (err, result) => {
                if (err) console.log("更新news: " + err);
                else res.end();
                connection.release();
            });
        }
    });
});
app.get("/addNews", (req, res) => {
    let title = req.query.title,
        tag = req.query.tag,
        content = req.query.content,
        author = req.query.author,
        source = req.query.source;
    pool.getConnection((err, connection) => {
        if (err) console.log("增加新闻信息: " + err);
        else {
            connection.query(`INSERT INTO news(title, tag, content, author, source) VALUES ('${title}', '${tag}', '${content}', '${author}', '${source}')`, (err, result) => {
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
        tag = req.query.tag,
        content = req.query.content,
        author = req.query.author,
        source = req.query.source;
    pool.getConnection((err, connection) => {
        if (err) console.log("修改新闻信息: " + err);
        else {
            const sql = `UPDATE news SET title = '${title}', tag = '${tag}', content = '${content}', author = '${author}', source = '${source}' WHERE id = ${id}`;
            connection.query(sql, (err, result) => {
                if (err) console.log("增加news: " + err);
                else res.end();
                connection.release();
            });
        }
    });
});
app.post("/uploadNewsImg", (req, res) => {
    var form = new formidable.IncomingForm();
    form.uploadDir = './public/tmp/newsImg';
    form.maxFieldsSize = 10 * 1024 * 1024;

    form.parse(req, (err, fields, files) => {
        let oldpath = files.newsImg.path,
            extname = files.newsImg.name;
        let newpath = "./public/tmp/newsImg/" + extname;
        fs.rename(oldpath, newpath, (err) => {
            if (err) {
                console.log("新闻图片重命名失败: " + err);
                res.send({
                    errno: 1,
                    data: []
                });
            }
            let respath = newpath.replace("./public", "http://localhost:9000");
            res.send({
                errno: 0,
                data: [respath]
            });
        });
    });
});
/*-------------------------------对messages表的操作---------------------------------*/
//  增加留言
app.get("/addMessage", (req, res) => {
    let name = req.query.name,
        phone = req.query.phone,
        content = req.query.content;
    pool.getConnection((err, connection) => {
        if (err) console.log("增加留言: " + err);
        else {
            connection.query(`INSERT INTO messages(name, phone, content) VALUES ('${name}', '${phone}', '${content}')`, (err, result) => {
                if (err) console.log("增加message: " + err);
                else res.end();
                connection.release();
            });
        }
    });
});
app.get("/readMessages", (req, res) => {
    let ids = "(";
    for (var i = 0; i < req.query.id.length; i += 1) {
        ids += req.query.id[i];
        if (i < req.query.id.length - 1) ids += ", ";
        else ids += ")";
    }
    pool.getConnection((err, connection) => {
        if (err) console.log("已读留言: " + err);
        else {
            connection.query(`UPDATE messages SET watched = 1 WHERE id IN ${ids}`, (err, result) => {
                if (err) console.log("更新messages: " + err);
                else res.end();
                connection.release();
            });
        }
    });
})
app.post("/readAllMessages", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) console.log("全部已读: " + err);
        else {
            connection.query(`UPDATE messages SET watched = 1 WHERE watched = 0`, (err, result) => {
                if (err) console.log("更新messages: " + err);
                else res.end();
                connection.release();
            });
        }
    });
});
/*-------------------------------对dishes表的操作---------------------------------*/
app.post("/uploadDishImg", (req, res) => {
    var form = new formidable.IncomingForm();
    form.uploadDir = './public/tmp/newsImg';
    form.maxFieldsSize = 10 * 1024 * 1024;

    form.parse(req, (err, fields, files) => {
        let oldpath = files.newsImg.path,
            extname = files.newsImg.name;
        if (!extname.endsWith("jpg") && !extname.endsWith("jpeg") && !extname.endsWith("png")) {
            res.send({
                errno: 1,
                message: "请上传jpg/jpeg/png格式的图片!"
            });
        } else {
            let newpath = "./public/tmp/dishesImg/" + extname;
            fs.rename(oldpath, newpath, (err) => {
                if (err) {
                    console.log("新闻图片重命名失败: " + err);
                    res.send({
                        errno: 1,
                        data: []
                    });
                }
                let respath = newpath.replace("./public", "http://localhost:9000");
                res.send({
                    errno: 0,
                    data: [respath]
                });
            });
        }
    });
});
app.get("/addDishes", (req, res) => {
    let name = req.query.name,
        intro = req.query.intro,
        rate = req.query.rate,
        tag = req.query.tag,
        img = req.query.img;
    pool.getConnection((err, connection) => {
        if (err) console.log("增加菜品: " + err);
        else {
            connection.query(`INSERT INTO dishes(name, introduction, rate, tag, img) VALUES ('${name}', '${intro}', ${rate}, '${tag}', '${img}')`, (err, result) => {
                if (err) console.log("增加dishes: " + err);
                else res.end();
                connection.release();
            });
        }
    });
});
app.get("/updateDishes", (req, res) => {
    let id = req.query.id,
        name = req.query.name,
        intro = req.query.intro,
        rate = req.query.rate,
        tag = req.query.tag,
        img = req.query.img;
    pool.getConnection((err, connection) => {
        if (err) console.log("修改菜品: " + err);
        else {
            connection.query(`UPDATE dishes SET name = '${name}', introduction = '${intro}', rate = ${rate}, tag = '${tag}', img = '${img}' WHERE id = ${id}`, (err, result) => {
                if (err) console.log("修改dishes: " + err);
                else res.end();
                connection.release();
            });
        }
    })
});
app.get("/deleteDishes", (req, res) => {
    let id = req.query.id;
    pool.getConnection((err, connection) => {
        if (err) console.log("删除菜品: " + err);
        else {
            connection.query(`DELETE FROM dishes WHERE id = ${id}`, (err, result) => {
                if (err) console.log("删除dishes: " + err);
                else res.end();
                connection.release();
            });
        }
    });
});

app.listen(port, () => console.log(`成功: 端口${port}`));
