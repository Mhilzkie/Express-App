const task = require('../models/task').model;
const express = require('express');
const router = express.Router();
const app = require('../app');

/* GET tasks */
router.get('/tasks/:id', async (req, res, next) => {
  try{
    const tasks = await task.findAll({
      where:{
        id: req.query.id
      }
    });
    res.send({result:tasks});

  }catch(error){
    res.send(error);
  }
  });
router.get('/tasks', async(req, res) => {
  try{
    const tasks = await task.findAll();
    res.send({result:tasks});

  }catch(error){
    res.send(error);
  }
  });

/* INSERT tasks */
router.post('/tasks', async(req, res) => {
  try{
    const task = await task.create({
      task: req.body.todo,
      userId: req.body.user
    });
  res.send({result:task});
}catch(error){
  res.status(500).send(error);
  console.log("Im the Error");
}
});

// DELETE Task
router.delete('/tasks/:id', async (req, res, next) => {
  try{
    await task.destroy({
      where:{
        id:req.params.id
      }
    });
    res.send({message:'Task Deleted'});
  }catch(error){
    res.send(error);
  }
})

module.exports = router;

// router.put('/tasks/:id', function (req, res, next) {
//   connection.query(`UPDATE tasks SET task = ('${req.body.task}') WHERE id = ('${req.params.id}')`, (error,results, fields)=> {
//     if (error) {
//       throw(error);
//     } 
//     res.send({results});
//   },
// )
// })

// router.post('/login',function (req, res, next){
//   connection.query(`SELECT * FROM users WHERE username = ('${req.body.username}') AND password=('${req.body.password}')`,(error,results, fields) =>{
//     if (error) {
//       throw(error);
//     } 
//     res.send(results);
//   },
//   )
// })

// router.post('/register', function(req, res, next) {
//   connection.query(`INSERT INTO users (username,password) VALUES ('${req.body.username}','${req.body.password}')`, (error, results, fields) => {
//     if (error) throw error;
//     res.send({results});    
//   })
// });

// router.post('/loginsuccess',function (req, res, next){
//   connection.query(`SELECT * FROM users WHERE username = ('${req.body.username}') AND password=('${req.body.password}')`,(error,results, fields) =>{
//     if (error) {
//       throw(error);
//     } 
//     res.send(results);
//   },
//   )
// })
// module.exports = router;