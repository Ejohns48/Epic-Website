"use strict";

const { response } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const { REACT_APP_DB_PWD, REACT_APP_DB_USER, REACT_APP_DB_HOST, REACT_APP_DB_NAME } = process.env;

const db = mysql.createConnection({
  host: REACT_APP_DB_HOST,
  user: REACT_APP_DB_USER,
  password: REACT_APP_DB_PWD,
  database: REACT_APP_DB_NAME
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));



app.get("/loadcourses", function (req, res) {
  var sqlsel = "SELECT * FROM epiccourses";
  var sql = mysql.format(sqlsel);

  db.query(sql, function (err, data) {
    
    if (err) {
      console.error(err);
      process.exit(1);
    }
    
    res.send(JSON.stringify(data));
  });
});

app.get('/searchcourses', function (req, res) {
  console.log(req);
  var insLastName = req.query.instructorlastname;
  var cyear = req.query.courseyear;
  var csemester = req.query.coursesemester;
  var csection = req.query.coursesection;
  var cnum = req.query.coursenumber;  
  var cprefix = req.query.courseprefix;

  var sqlsel = "SELECT * FROM epiccourses WHERE instructorlastname LIKE ?" +
  "AND courseyear LIKE ? " +
  "AND coursesemester LIKE ? AND coursesection LIKE ? AND coursenumber LIKE ? " +
  "AND courseprefix LIKE ? ";

  var inserts = [
      '%' + insLastName + '%',
      '%' + cyear + '%',
      '%' + csemester + '%',
      '%' + csection + '%',
      '%' + cnum + '%',
      '%' + cprefix + '%'
  ];    
  var sql = mysql.format(sqlsel, inserts);
  db.query(sql, function(err, data) { 
      if(err) {
          console.error(err);
          process.exit(1);
      }
      console.log(data);
      res.send(JSON.stringify(data));
          
      
  });
});


app.listen(3001, () => {
    console.log('running on port 3001');
  })
  