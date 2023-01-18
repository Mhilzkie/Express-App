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

/* GET tasks */
router.get('/tasks', function(req, res, next) {
  connection.query(`SELECT * FROM tasks`, (error, results, fields) => {
    if (error) throw error;
    res.send({results});    
  })
});

/* INSERT tasks */
router.post('/tasks', function(req, res, next) {
  connection.query(`INSERT INTO tasks (task) VALUES ('${req.body.todo}')`, (error, results, fields) => {
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

module.exports = router;