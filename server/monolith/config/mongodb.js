const {MongoClient} = require('mongodb')

let database = null

function connectDB(cb){

    const uri = 'mongodb://localhost:27017'   
    const client = new MongoClient(uri,
        { useNewUrlParser: true,
        useUnifiedTopology: true,})

    client.connect()
        .then(_=>{
            cb(true)
            console.log('connect to mongoDB')
            database = client.db('EntertainMe')
            
        })
        .catch(err=>{
            cb(false)
            console.log('error')
            console.log(err)
        })

}

function getDatabase(){
    return database
}
module.exports = {
    connectDB,
    getDatabase
}