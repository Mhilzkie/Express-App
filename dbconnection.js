const {Sequelize} = require("sequelize");

const sequelize =new Sequelize("todo","root","", {
    host:"localhost",
    dialect:"mysql",
    pool:{
            max: 10,
            acquire : 3000,
            min: 0,
            idle:10000
        }
    })

    try{
        sequelize.authenticate();
    }catch(e){
        console.log('Unable to Connect');
        console.log(e);
    }
exports.sequelize= sequelize;

// const mysql = require('mysql');
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'todo'
// });

// connection.connect();
 
// connection.query('SELECT * from tasks', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0]);
// });


// exports.connection = connection;