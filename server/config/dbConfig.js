const mongoose = require('mongoose')

//connection logic (connect to mongoDb database)
mongoose.connect(process.env.CONN_STRING);

//connection State
const db = mongoose.connection;
db.on('connected',()=>{
    console.log('DB Connection Successfull')
})

db.on('err',()=>{
    console.log('DB Connection Failed')
})

module.exports = db;