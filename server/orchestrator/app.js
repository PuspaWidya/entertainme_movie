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
    movie:[Movie]
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

  type Mutation{
    addSeries(data:seriesInputData):TvSeries
    addMovies(data:movieInputData):Movie
  }
`

const tvSeriesUrl = 'http://localhost:4002/series'
const movieUrl = 'http://localhost:4001/movies'

const resolvers = {
    Query: {
      series:()=>{
          return axios({
              url:tvSeriesUrl,
              method:'get'
          })
          .then(({data})=>{
              console.log(data)
                return data
          })
          .catch(console.log)
      },
      movie: async()=>{
      try{
        const movie = await axios({
          url:movieUrl,
          method:'get'
        })
        // console.log(movie.data)
        return movie.data
      }
      catch(err){
        console.log(err)
      }
      }
    },
    Mutation:{
      addSeries: async (parent,args)=>{
        // console.log(args)
        const {title,overview,poster_path,popularity,tags} = args.data
        const data ={title,overview,poster_path,popularity,tags}
        try{
          const newSeries = await axios({
            url:tvSeriesUrl,
            method:'post',
            data: data
          })
          console.log(newSeries.data.ops[0])
          return newSeries.data.ops[0]
        }
        catch(err){
          console.log(err)
        }
      },
      addMovies : async (_,args)=>{
        // console.log(args)
        const {title,overview,poster_path,popularity,tags} = args.data
        const data ={title,overview,poster_path,popularity,tags}
        try{
          const newMovie = await axios({
            url:movieUrl,
            method:'post',
            data: data
          })
          console.log(newMovie)
          return newMovie.data.ops[0]
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