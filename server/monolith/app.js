const express = require('express')
const {connectDB, getDatabase} = require('./config/mongodb')
const app = express()
const port = 3000

connectDB((connected)=>{
    if(connected) console.log('sukses')
    else console.log('error')
})



// app.get('/',(req,res)=>{
//     res.send('test')
// })


app.get('/movies',(req,res)=>{
    getDatabase().collection('movie').find().toArray()
    .then(data=>{
        res.status(200).json(data)
    })
})


app.listen(port,()=>{
    console.log('is running at port', port)
})


