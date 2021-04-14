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
    
    return (
        <div>
            <>
            <h2>{JSON.stringify(data.movie)}</h2>
            <button
            onClick={()=>editOne(data.movie._id)}>Edit</button>
            </>
        </div>
    )
}
