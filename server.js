// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');

// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

const express = require('express');

const bodyParser = require('body-parser');

var mysql = require('mysql')

const app = express();
var path = require('path')


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'to-do database'

});

connection.connect(function (err) {

  if (err) throw err;

  console.log(' connection online..');
})



app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug')


app.get('/', (req, res) => {
  res.sendFile('Dashboard.html', { root: "F:\\TO-DO App" });
});

app.get('/index.html', (req, res) => {
  res.sendFile('Dashboard.html', { root: "F:\\TO-DO App" });
});





app.post('/submit', function (req, res) {
  console.log(req.body);

  var sql = "insert into userdata values('"+ req.body.user + "'," + req.body.date + ",'"+ req.body.message +"')";
  connection.query(sql, function(err, rows, fields){


    if (err) throw err;

    res.render('index', { title: 'data saved', message: 'Your Response has been taken . Thank You!.' })

    //console.log('user data list %s',sql);
   
  })

  connection.end();

})


//for feedback from
/*app.post('/feed', function (req, res) {
  console.log(req.body);

  var sql1 = "insert into feedback values('"+ req.body.fullname + "'," + req.body.number +",'"+ req.body.message +"')";
  connection.query(sql1, function(err, rows, fields){


    if (err) throw err;

    res.render('index', { title: 'data saved', message: ' Your Response has been taken . Thank You!..' })


  })

    connection.end();

}) */



app.listen(3000)