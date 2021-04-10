const Redis = require("ioredis");
const redis = new Redis()
const axios = require('axios');


class TvShowController{
    static async getAll(req,res){
        try{
            const seriesRedis = await redis.get("series:data")
            if(!seriesRedis){
                // console.log('test')
                const {data} = await axios.get("http://localhost:4002/series")
                await redis.set("series:data",JSON.stringify(data))
                res.status(200).json(data)
            }else{
                // console.log('redis')
                res.status(200).json(JSON.parse(seriesRedis));
            }
        }
        catch(err){
            console.log(err,'>>>>>>>>>>>>>')
            res.status(500).json(err)
        }
     
    }

    static async getOne(req,res){
        try{
            const readOneRedis = await redis.get("series:one")
            if(readOneRedis){
                console.log('masuk redis')
                res.status(200).json(JSON.parse(readOneRedis))
            }else{
                console.log('tesst')
                const {data} = await axios.get(`http://localhost:4002/series/${req.params.id}`)
                await redis.set("series:one",JSON.stringify(data))
                res.status(200).json(data)
            }
        }
        catch(err){
            res.status(500).json(err)
            console.log(err)
        }


    }

    static async createTvShow(req,res){
       
        try{
            await redis.del("series:data")
            await redis.del("entertainme:data")
            let arr =[]
            let {title,overview,poster_path,popularity,tags} = req.body
            arr.push(tags)
            let obj = {title,overview,poster_path,popularity,tags:arr}
            const {data} =  await axios({
                method:"POST",
                url:"http://localhost:4002/series",
                data:{obj}})
            if(data.ok === 1){
                res.status(200).json({message:'new series added'})
            }
        }
        catch(err) {
        console.log(err)
        res.status(500).json(err)
        }
    }

    static async editAll(req,res){
        try{
            await redis.del("series:data")
            await redis.del("entertainme:data")
            let {title,overview,poster_path,popularity,tags} = req.body
            let arr = []
            arr.push(tags)
            let obj = {title,overview,poster_path,popularity,tags:arr}
            console.log(obj)
            const {data} =  await axios({
                method:"PUT",
                url:`http://localhost:4002/series/${req.params.id}`,
                data:obj})
            res.status(200).json(data)
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    }
    static async destroy(req,res){
        try{
            await redis.del("series:data")
            await redis.del("entertainme:data")
            let id = req.params.id
            await axios.delete(`http://localhost:4002/series/${id}`)
            res.status(200).json({message:'data deleted'})
        }
        catch(err){
            console.log(err)
        }
    }
}

module.exports = TvShowController



