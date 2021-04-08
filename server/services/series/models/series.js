const {getDatabase} = require('../config/mongodb')
const {ObjectId} = require('mongodb')


class TvShow{
    static find(){
        return getDatabase().collection('series').find().toArray()
    }
    static findOne(id){
        return getDatabase().collection('series').findOne({
            _id: ObjectId(id)
        })
    }

    static create(data){
        return getDatabase().collection('series').insertOne(data)
    }

    static delete(id){
        return getDatabase().collection('series').deleteOne({
            _id:ObjectId(id)
        })
    }

    static update(id,data){
        return getDatabase().collection('series').replaceOne({
            _id:ObjectId(id),      
        },data)
    }
}

module.exports = TvShow