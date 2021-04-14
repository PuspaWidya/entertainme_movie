const Movie = require('../models/Movie')
const Redis = require("ioredis");
const redis = new Redis();


class MovieController{
    static async getAll(req,res){
    try{
        const cache = await redis.get('movies:data')
        if(cache){
        res.status(200).json(cache)
        }else{
        const data = await Movie.find()
        redis.set('movies:data',data)    
        res.status(200).json(data)
    }}
    catch(err){
        console.log(err)
    }}

    static async getOne(req,res){
       try{
            const data = await Movie.findOne(req.params.id)
                res.status(200).json(data)
       }
        catch(err){
        console.log(err)
        res.status(500).json(err)
    } 
    }

    static async createMovie(req,res){
       
        try{
            redis.del('movie:data')
            redis.del('movies:data')
            let arr =[]
            let {title,overview,poster_path,popularity,tags} = req.body
            arr.push(tags)
            let obj = {title,overview,poster_path,popularity,tags:arr}
            const newMovie =  await Movie.create(obj)
            res.status(200).json(newMovie)
        }
        catch(err) {
        console.log(err)
        res.status(500).json(err)
        }
    }

    static async editAll(req,res){
        try{
            redis.del('movie:data')
            redis.del('movies:data')
            let {title,overview,poster_path,popularity,tags} = req.body
            let arr = []
            arr.push(tags)
            let obj = {title,overview,poster_path,popularity : parseFloat(popularity),tags:arr}
            const newMovie = await Movie.update(req.params.id,obj)
            res.status(200).json(newMovie.ops[0])
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    }
    static async destroy(req,res){
        try{
            const id = req.params.id
            redis.del('movie:data')
            redis.del('movies:data')
            const response = await Movie.delete(id)
            res.status(200).json(response)
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    }
}

module.exports = MovieController