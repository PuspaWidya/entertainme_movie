const {getDatabase} = require('../config/mongodb')
const {ObjectId} = require('mongodb')


class TvShow{
    static find(){
        return getDatabase().collection('tvshow').find().toArray()
    }
    static findOne(id){
        return getDatabase().collection('tvshow').findOne({
            _id: ObjectId(id)
        })
    }

    static create(data){
        return getDatabase().collection('tvshow').insertOne(data)
    }

    static delete(id){
        return getDatabase().collection('tvshow').deleteOne({
            _id:ObjectId(id)
        })
    }

    static update(id,data){
        return getDatabase().collection('tvshow').replaceOne({
            _id:ObjectId(id),      
        },data)
    }
}

module.exports = TvShow