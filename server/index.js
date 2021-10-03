const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "password",
    database: "test",
});

con.connect(function (err) {
    if (err) return console.log(err);
    console.log("Connected!");
});

app.post("/create", (req, res) => {
    const name = req.body.name;
    const city = req.body.city;

    // console.log(name + city);

    // res.send("Hello");
    const sql = "INSERT INTO users (name, city) VALUES (?,?);";
    con.query(sql, [name, city], (err, result) => {
        res.send("Hello");
    });
});
app.get("/get", (req, res) => {
    const sql = "SELECT * FROM users;";
    con.query(sql, (err, result) => {
        // console.log(result);
        res.send(result);
    });
});
app.put("/update", (req, res) => {
    const name = req.body.name;
    const city = req.body.city;
    const id = req.body.id;
    const sql = "UPDATE users SET name=?, city=? WHERE id=?;";
    con.query(sql, [name, city, id], (err, result) => {
        if (err) console.log(err);
        else if (result) console.log(result.message);
        res.send(result.message);
    });

    // console.log(name + city + id);
    // res.send("Updated");
});
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    // console.log(id);
    const sql = "DELETE FROM users WHERE id=?;";
    con.query(sql, [id], (err, result) => {
        if (err) console.log(err);
        else if (result) console.log(result.message);
        res.send(result.message);
    });
});

app.listen(3001, () => {
    console.log("Server Running");
});
