const {getDatabase} = require('../config/mongodb')
const {ObjectId} = require('mongodb')


class Movie{
    static find(){
        return getDatabase().collection('movie').find().toArray()
    }
    static findOne(id){
        return getDatabase().collection('movie').findOne({
            _id: ObjectId(id)
        })
    }

    static create(data){
        return getDatabase().collection('movie').insertOne(data)
    }

    static delete(id){
        return getDatabase().collection('movie').deleteOne({
            _id:ObjectId(id)
        })
    }

    static update(id,data){
        return getDatabase().collection('movie').replaceOne({
            _id:ObjectId(id),      
        },data)
    }
}

module.exports = Movie