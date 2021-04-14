const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis()





const typeDefs = gql`
 
  type TvSeries {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Query {
    series: [TvSeries]
    Movies:[Movie]
    movie(_id:ID):Movie
    seri(_id:ID):TvSeries
  }

  input seriesInputData{
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: String
  }

  input movieInputData{
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: String
  }

  input editMovie{
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: String
  }

  input editSeries{
    _id: ID!
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: String
  }

  type Mutation{
    addSeries(data:seriesInputData):TvSeries
    addMovies(data:movieInputData):Movie
    deleteSeries(_id:ID):DeleteResponse
    deleteMovie(_id:ID):DeleteResponse
    editMovie(data:editMovie):Movie
    editSeries(data:editSeries):Status
  }

  type Status {
    message: String
  }
  type DeleteResponse{
    ok:Boolean
  }
`

const tvSeriesUrl = 'http://localhost:4002/series'
const movieUrl = 'http://localhost:4001/movies'

const resolvers = {
    Query: {
      series:async()=>{
        try{
          const cache = await redis.get('series:data')
          if(cache){
            // console.log(cache)
            return JSON.parse(cache);
          }
          const {data} = await  axios({
                url:tvSeriesUrl,
                method:'get'
            })
              redis.set('series:data',JSON.stringify(data))
              console.log('dari server')
              return data
        }
        catch(err){console.log(err)}
      },
      Movies: async()=>{
      try{
        const cache = await redis.get('movies:data')
        if(cache){
          // console.log(cache,'<<<<<<<<<')
          // console.log('MASUK CACHE')
          return JSON.parse(cache)
        }
        const movie = await axios({
          url:movieUrl,
          method:'get'
        })
        redis.set('movies:data',JSON.stringify(movie.data))
        // console.log('test')
        return movie.data
      }
      catch(err){
        console.log(err)
      }
      },
      movie: async(parent,args)=>{
        try{
          const id = args._id
          // redis.del('movie:data'+id)
          const cache = await redis.get('movie:data$'+id)
          // console.log(cache)
          if(cache){
            // console.log(JSON.parse(cache))
            console.log('masuk cache')
            return JSON.parse(cache)
          }
          const {data} = await axios({
            url:`http://localhost:4001/movies/${id}`,
            method:'get'
          })
          console.log('MOVIE')
          redis.set('movie:data'+id,JSON.stringify(data))
          return data
        }
        catch(err){
          console.log(err)
        }
      },
      seri: async(parent,args)=>{
        try{
          const id = args._id
          const cache = await redis.get('seri:data'+id)
          if(cache){
            console.log('cache')
            return JSON.parse(cache)
          }
          const {data} = await axios({
            url:`http://localhost:4002/series/${id}`,
            method:'get'
          })
          redis.set('seri:data'+id,JSON.stringify(data))
          // console.log(data,'<<<')
          return data
        }
        catch(err){
          console.log(err)
        }
      }
    },
    Mutation:{
      addSeries: async (parent,args)=>{
        const {title,overview,poster_path,popularity,tags} = args.data
        const data ={title,overview,poster_path,popularity,tags}
        try{
          redis.del('series:data')
          redis.del('seri:data')
          const newSeries = await axios({
            url:tvSeriesUrl,
            method:'post',
            data: data
          })
          return newSeries.data.ops[0]
        }
        catch(err){
          console.log(err)
        }
      },
      addMovies : async (_,args)=>{
        const {title,overview,poster_path,popularity,tags} = args.data
        const data ={title,overview,poster_path,popularity,tags}
        try{
          // await redis.del('movie:data')
          await redis.del('movies:data')
          const newMovie = await axios({
            url:movieUrl,
            method:'post',
            data: data
          })
          // console.log(newMovie)
          return newMovie.data.ops[0]
        }
        catch(err){
          console.log(err)
        }
    },
    deleteSeries : async (parent,args)=>{ 
      const id = args._id
      // console.log(id,'MASUK ID')
      try{
         redis.del('series:data')
         redis.del('seri:data'+id)
        const {data} = await axios({
          url:tvSeriesUrl+'/'+id,
          method:'delete',
        })
        return data
      }
      catch(err){
        console.log(err)
      }
    },
    deleteMovie: async(parent,args)=>{
      try{
        const id = args._id
        console.log(id,'MASUK ID<<<<<<<<<<<<<<<<<')
        redis.del('movie:data'+id)
        redis.del('movies:data')
        const {data} = await axios({
          url:`http://localhost:4001/movies/${id}`,
          method:'delete',
        })
        console.log(data)
         return data
      }
      catch(err){
        console.log(err)
      }
    },
    
    editMovie: async(_,args)=>{

      console.log(args,'ARGS')
      let {_id,title,overview,poster_path,popularity,tags} = args.data
      let dataMovie = {title,overview,poster_path,popularity,tags}
      console.log(_id)
      redis.del('movie:data'+_id)
      redis.del('movies:data')
      // console.log(dataMovie)
     try{
       let {data} = await axios({
         url:movieUrl+'/'+_id,
         method:'PUT',
         data: dataMovie
       })
       console.log('sudah terupdate')
      //  console.log(data)
      //  return  {message:`data dengan id ${_id} sudah terupdate`}
       return data
     }
     catch(err){
       console.log(err)
     }
    },
    editSeries: async(_,args)=>{
      let {_id,title,overview,poster_path,popularity,tags} = args.data
       redis.del('series:data')
       redis.del('seri:data'+_id)
      const dataSeries = {title,overview,poster_path,popularity,tags}
     try{
       let {data} = await axios({
         url:tvSeriesUrl+'/'+_id,
         method:'PUT',
         data: dataSeries
       })
       return  {message:`data dengan id ${_id} sudah terupdate`}
     }
     catch(err){
       console.log(err)
     }
    }
  }
}

  const server = new ApolloServer({ typeDefs, resolvers });
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });