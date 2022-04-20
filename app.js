var express = require('express');
var app = express();

var mysql = require('mysql2');
var bodyParser= require('body-parser');
const { runInNewContext } = require('vm');
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+'/views'));

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'office',
    password:'blahblah'
});

app.listen(8080,function(){
    console.log("Listening to port 8080");
});

app.get('/',function(req,res){
    res.render('welcome');
})

app.get('/add',function(req,res){
    var q = 'SELECT COUNT(*) AS count FROM employee';
    connection.query(q,function(err,results){
        if(err) throw err;
        var count = results[0].count;

        // res.send("<h1><strong>USERS : </strong></h1>"+count);
        res.render("home",{data:count});
    });
});

app.post('/insert',function(req,res){
    var person ={
    ENO : req.body.ENO ,
    ENAME: req.body.Employee_Name,
    SALARY: req.body.salary,
    DNO:req.body.DNO ,
    MNGRNO:req.body.MNGRNO,
    DOJ:req.body.DOJ ,
    JOB:req.body.JOB ,
    ADDRESS:req.body.ADDRESS ,
    CITY:req.body.city ,
    PINCODE:req.body.PINCODE
    }
    connection.query("INSERT INTO employee SET?",person,function(err,results){
        if(err) throw err;
        console.log(results);
        res.redirect("/");
    })
});

app.get('/users',function(req,res,next){
    var q="SELECT * FROM employee";
    connection.query(q,function(err,data,fields){
        if(err) throw err;
        res.render('user_list',{userData:data});
    });
});

