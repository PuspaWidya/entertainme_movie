let TvShow = require('../models/series')
const Redis = require("ioredis");
const redis = new Redis();


class TvShowController{
    static async getAll(req,res){
       try{
           const cache = await redis.get('series:data')
           if(cache){
            res.status(200).json(cache)
           }else{
            const series = await TvShow.find()
            redis.set('series:data',series)
            res.status(200).json(series)
           }
        }
        catch(err){
            console.log(err)
        }
    }

    static async getOne(req,res){
        try{
            const cache = await redis.get('seri:data'+req.params.id)
            if(cache){
            res.status(200).json(cache)
            }else{
            const data = await TvShow.findOne(req.params.id)
            redis.set('seri:data'+req.params.id,data)
            res.status(200).json(data)
            }
          }
        catch(err){
            console.log(err)
    }}

    static async createTvShow(req,res){
        try{
            redis.del('series:data')
            redis.del('seri:data')
            let arr =[]
            let {title,overview,poster_path,popularity,tags} = req.body
            arr.push(tags)
            let obj = {title,overview,poster_path,popularity,tags:arr}
            const newTvShow =  await TvShow.create(obj)
            res.status(200).json(newTvShow)
        }
        catch(err) {
        console.log(err)
        res.status(500).json(err)
        }
    }

    static async editAll(req,res){
        try{
            redis.del('series:data')
            redis.del('seri:data')
            redis.del('seri:data'+req.params.id)
            let {title,overview,poster_path,popularity,tags} = req.body
            let arr = []
            arr.push(tags)
            let obj = {title,overview,poster_path,popularity : parseFloat(popularity),tags:arr}
            const newTvShow = await TvShow.update(req.params.id,obj)
            res.status(200).json(newTvShow.ops[0])
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    }
    static async destroy(req,res){
        const id = req.params.id
        try{
            redis.del('series:data')
            redis.del('seri:data')
            redis.del('seri:data'+req.params.id)
            const response = await TvShow.delete(id)
            res.status(200).json(response) 
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    }
}

module.exports = TvShowController