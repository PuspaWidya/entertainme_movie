const express = require('express')
const {connectDB, getDatabase} = require('./config/mongodb')
const app = express()
const port = 4002
const router =require('./routes/route')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB((connected)=>{
    if(connected) console.log('sukses')
    else console.log('error')
})

app.use('/series',router)


app.listen(port,()=>{
    console.log('Running at port', port)
})


