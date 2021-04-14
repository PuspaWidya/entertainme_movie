import React ,{useState}from 'react'
import { useQuery, gql ,useMutation} from '@apollo/client';
import { useHistory, useParams } from "react-router-dom";

const GET_MOVIE = gql`
query movie($id:ID){
    movie(_id:$id){
    _id
    title
    overview
    poster_path
    popularity
    tags
    }
}`



export default function Page() {
    let params = useParams();
    const {id} = params


    const history = useHistory();
    const { data,loading, error } = useQuery(GET_MOVIE,{
        variables:{
            id:id
        }
    });
    
    if(loading){
        return(
            <h1>LOADING</h1>
        )
    }
    
    const editOne = (id) =>{
        console.log(id)
        history.push(`/edit/${id}`)
        
    }

    const img = data.movie.poster_path
    
    return (
        <div>
            <>
            <div className="hero-image" style={{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url(${data.movie.poster_path})`}}>
                <div className="hero-text">
                <h1>{data.movie.title}</h1>
                <p>{data.movie.overview}</p>
                <button
                type="button" className="btn btn-outline-light btn-lg"
                onClick={()=>editOne(data.movie._id)}>Edit Movie</button>
                </div>
            </div>
            </>
        </div>
    )
}
