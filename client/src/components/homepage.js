import React ,{useState}from 'react';
import { useQuery, gql ,useMutation} from '@apollo/client';
import { useHistory } from "react-router-dom";
import {favMovieVar} from '../config/vars'
import swal from 'sweetalert';
import loadingGif from '../assets/loading.gif'

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

    const { data,loading, error } = useQuery(GET_MOVIES);

    const [DeleteData,{data:deleteData,loading:deleteLoading,error:deleteError}]
    = useMutation(DELETE_MOVIE,{
        refetchQueries:[{
            query:GET_MOVIES
        }]
    })

    function deleteOne(id){
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                DeleteData({
                    variables :{
                        id:id
                    }
                })
              swal("Your movie has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your Movie is safe!");
            }
          });

    }

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
            <div style={{position:'center', textAlign:'center', padding:'0'}}>
            <img src={loadingGif} alt="Empty" style={{width:"100%",height:"100%"}}/>  
            <h1>Loading</h1>
            </div>
        )
    }

    return (
        <>
        <div className="homepage">
            <div className="rowHomepage row row-cols-1 row-cols-md-2 g-4">
            {data.Movies.map(movie =>{
                return(
                    <>
                    <div>
                    <div class="col">
                        <div class="card">
                        <img src={movie.poster_path}class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">{movie.title}</h5>
                            <p class="card-text">{movie.overview}</p>
                    <div className="btnMovie">
                    <button
                    className="btn btn-outline-primary"
                    onClick={()=>showOne(movie._id)}>See more..</button> 
                    <button
                    class="btn btn-outline-danger"
                    onClick={()=>deleteOne(movie._id)}>Delete</button>
                     <button
                     className="btnfav pe-5"
                    onClick={()=>addToFav(movie)}>Favorite</button>
                    </div>
                    </div>
                        </div>
                        </div>
                    </div>

                    </>
                    
                    )
                })}
                </div>
        </div>
        </>
    )
}
