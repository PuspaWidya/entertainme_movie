const Movie = require('../models/Movie')

class MovieController{
    static getAll(req,res){
        Movie.find()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(console.log)
    }

    static getOne(req,res){
        Movie.findOne(req.params.id)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(console.log)
    }

    static async createMovie(req,res){
       
        try{

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
        const id = req.body.id
        try{
          const response = await Movie.delete(id)
          if(response.ressult.ok === 1){
                res.status(200).json({message:' Data is deleted'})
          }else{
              res.status(404).json({message:'Data not found'})
          }
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    }
}

module.exports = MovieController