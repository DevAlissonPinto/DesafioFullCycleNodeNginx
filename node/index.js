const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'fullcycle-nodedb'
};

const connection = mysql.createConnection(config)

const sql1 = `INSERT INTO people(name) VALUES('Alisson'); `
const sql2 = `INSERT INTO people(name) VALUES('Shirley'); `
const sql3 = `INSERT INTO people(name) VALUES('Nicolas'); `
const sql4 = `INSERT INTO people(name) VALUES('Omaley'); `
const sql5 = `INSERT INTO people(name) VALUES('Guilherme'); `

connection.query(sql1)
connection.query(sql2)
connection.query(sql3)
connection.query(sql4)
connection.query(sql5)
connection.end()

app.get('/', (req, res) => { getPeople(res) });

app.listen(port, () => {
    console.log('Rodando na porta: ' + port)
})

function getPeople(res) {
    const conn = mysql.createConnection(config)
    const QUERY_SELECT = 'SELECT name FROM people'

    conn.query(QUERY_SELECT, function (err, result, fileds) {
        var html = `<h1>Full Cycle Rocks!</h1>
                <br><br>
                <ul>`;

        result.forEach(element => {
            html += `<li>${element.name}</li>`;
        });

        html += '</ul>';

        res.send(html);
    });
    conn.end()
}