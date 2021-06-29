const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const jssha = require("jssha");
const { default: jsSHA } = require("jssha");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3001;

// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "tasksdb",
// });
const db = mysql.createPool(
    process.env.CLEARDB_DATABASE_URL ||
        "mysql://b3a38aebcb54d9:05d5cfb9bd885ab@us-cdbr-east-04.cleardb.com/heroku_24cf52c9bb780c1?reconnect=true"
);

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
    res.send("asdf");
});

app.get("/api/get", (req, res) => {
    const id = req.query.id;
    const sqlSelect = "SELECT * FROM tasks WHERE userId = ? ORDER BY date";
    db.query(sqlSelect, [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post("/api/insert", (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const datestring = req.body.date;
    const id = req.body.id;
    const date = new Date(req.body.date);
    const sqlInsert =
        "INSERT INTO tasks (name, date, datestring, description, userId) VALUES (?,?,?,?,?);";
    db.query(
        sqlInsert,
        [name, date, datestring, description, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.delete("/api/delete/:id", (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM tasks WHERE id = ?";
    db.query(sqlDelete, id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put("/api/update", (req, res) => {
    const value = req.body.value;
    const field = req.body.field;
    const id = req.body.id;
    var sqlUpdate = "";
    if (field === "name") {
        sqlUpdate = "UPDATE tasks SET name = ? WHERE id = ?";
    } else if (field === "datestring") {
        sqlUpdate = "UPDATE tasks SET datestring = ? WHERE id = ?";
    } else {
        sqlUpdate = "UPDATE tasks SET description = ? WHERE id = ?";
    }

    db.query(sqlUpdate, [value, id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/api/get-user/", (req, res) => {
    console.log("get-user");
    const username = req.query.username;
    const password = req.query.password;
    const sqlSelect =
        "SELECT id FROM users WHERE username = ? AND password = ?";
    db.query(sqlSelect, [username, password], (err, result) => {
        if (result.length === 0) {
            res.send({ userExists: false, id: null });
        } else {
            res.send({ userExists: true, id: result[0].id });
        }
    });
});
app.get("/api/username-available", (req, res) => {
    console.log("username-available");
    const username = req.query.username;
    const sqlSelect = "SELECT id FROM users WHERE username = ?";
    db.query(sqlSelect, [username], (err, result) => {
        if (result.length === 0) {
            res.send({ usernameAvailable: true });
        } else {
            res.send({ usernameAvailable: false });
        }
    });
});

app.post("/api/add-user", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const hashedPasswordObj = new jsSHA("SHA-512", password, {
        encoding: "UTF8",
    });
    console.log(hashedPasswordObj);

    const sqlInsert = "INSERT INTO users (username, password) VALUES (?,?);";
    db.query(sqlInsert, [username, hashedPassword], (err, result) => {
        const sqlSelect =
            "SELECT id FROM users WHERE username = ? AND password = ?";
        db.query(sqlSelect, [username, hashedPassword], (err, result) => {
            res.send({ id: result[0].id });
        });
    });
});

app.listen(PORT, () => {
    console.log("listening on port: ", PORT);
});
