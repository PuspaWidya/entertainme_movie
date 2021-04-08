const Redis = require("ioredis");
const redis = new Redis()
const axios = require('axios');

class EntertainMeCont{
        static async readAll(req,res){
            try{
                const entertain = await redis.get('entertainme:data')
                if(entertain){
                    // console.log('ini dari redis')
                    res.status(200).json(JSON.parse(entertain))
                } 
                else{
                    const movie = await axios.get("http://localhost:4001/movies")
                    let movieData = movie.data
                    const series = await axios.get("http://localhost:4002/series")
                    let seriesData = series.data
                    if(movie && series){
                        Promise.all(movieData,seriesData).
                        then(data=>{
                            redis.set('entertainme:data',JSON.stringify(data))
                            res.status(200).json(data)
                        })
                    }
                }
                
            }
            catch(err){
                console.log(err,'<<')
                res.status(500).json(err)
            }
        }
}

module.exports = EntertainMeCont