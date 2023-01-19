var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo'
});

connection.connect();

/* 
  JWT
  Permissions Setup - React 
  Authorization Header
  Hashing and Salting
  Tokens for Auth
*/

const checkUser = (req, res, next) => {
  connection.query(`SELECT * FROM users WHERE id = ${req.query.id || req.body.user}`, (error, results, fields) => {
    if (results[0].role === 1){
      req.body.permissionLevel = 1;
    }
    if (results.length > 0){
      next();
    }else{
      res.send('Not a valid user');
    }
  })
}

/* GET tasks */
router.get('/tasks', checkUser, (req, res, next) => {
  if (req.body.permissionLevel === 1){
    connection.query(`SELECT * FROM tasks WHERE userId = ('${req.query.id}')`, (error, results, fields) => {
      if (error) throw error;
      res.send({results});    
    })
  }else{
    res.send('Not valid permissions');
  }
});

/* INSERT tasks */
router.post('/tasks', checkUser, function(req, res, next) {
  connection.query(`INSERT INTO tasks (task,userId) VALUES ('${req.body.todo}','${req.body.user}')`, (error, results, fields) => {
    if (error) throw error;
    res.send({results});    
  })
});

router.delete('/tasks/:id', function (req, res, next) {
  var idtask = { id: req.params.id }
  console.log(req.params.id);
  
  // connection.query(`DELETE FROM tasks WHERE id = ('${req.params.id}')`, (error,results, fields)=> {
    connection.query(`UPDATE tasks SET deletedAt = '${new Date().toISOString()}' WHERE id=${req.params.id}`,(error,results, fields)=> {  
    if (error) {
      throw(error);
    } 
    res.send({results});
    
  },
)
})

router.put('/tasks/:id', function (req, res, next) {
  connection.query(`UPDATE tasks SET task = ('${req.body.task}') WHERE id = ('${req.params.id}')`, (error,results, fields)=> {
    if (error) {
      throw(error);
    } 
    res.send({results});
  },
)
})

router.post('/login',function (req, res, next){
  connection.query(`SELECT * FROM users WHERE username = ('${req.body.username}') AND password=('${req.body.password}')`,(error,results, fields) =>{
    if (error) {
      throw(error);
    } 
    res.send(results);
  },
  )
})

module.exports = router;