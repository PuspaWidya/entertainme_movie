import React ,{useState}from 'react';
import { useQuery, gql ,useMutation} from '@apollo/client';
import { useHistory } from "react-router-dom";
import {favMovieVar} from '../config/vars'

const GET_MOVIES = gql`
    query movie{
    Movies{
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`


const DELETE_MOVIE = gql`
mutation deleteMovie($id:ID){
    deleteMovie(_id:$id){
        ok
    }
}
`

export default function Homepage() {
let history = useHistory();
const [deleteMovie,setDelete] = useState(null)

const [DeleteData,{data:deleteData,loading:deleteLoading,error:deleteError}]
= useMutation(DELETE_MOVIE,{
    refetchQueries:[{
        query:GET_MOVIES
    }]
})

function deleteOne(id){
    DeleteData({
        variables :{
            id:id
        }
    })
}



const { data,loading, error } = useQuery(GET_MOVIES);
const [movieId,setMovieId]= useState(null)



function showOne (id){
    history.push(`/movie/${id}`);
}

function addToFav(movie){
    const existingFav = favMovieVar()
    // const data = existingFav.concat(movie)
    // favMovieVar(data)
    favMovieVar([movie,...existingFav])
}


if(loading){
    return(
        <h1>LOADING</h1>
    )
}

    return (
        <>
        <div>
            {data.Movies.map(movie =>{
                return(
                    <>
                    <li key={movie._id}>
                    {movie.title}</li>
                    <button
                    onClick={()=>showOne(movie._id)}>click</button> 
                    <button
                    onClick={()=>deleteOne(movie._id)}>Delete</button>
                     <button
                    onClick={()=>addToFav(movie)}>Favorite</button>
                    </>
                    
                )
            })}
        </div>
        {/* <Page movieId={movieId}/> */}
        </>
    )
}
