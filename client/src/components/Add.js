import React ,{useState}from 'react';
import { useQuery, gql ,useMutation} from '@apollo/client';
import { useHistory, useParams } from "react-router-dom";

const ADD_MOVIE = gql`
mutation addMovie($newMovieAdd : movieInputData){
    addMovies(data: $newMovieAdd){
        _id
        title
        overview
        poster_path
        popularity
        tags
    }
}
`



export default function Add() {
    let history = useHistory();

    const [addMovie, {data:newData,loading:newLoading,error:newError}
    ] = useMutation(ADD_MOVIE)
    
    
    const [formMovie,setFormMovie] = useState({
        title:"",
        overview:"",
        poster_path:"",
        popularity:0,
        tags:""
    })
    
    const onChange=(e)=>{
        let {name,value} = e.target
        const newMovie = {...formMovie,[name]:value}
        setFormMovie(newMovie)
    }
    
    
    function addNewMovie (e){
        e.preventDefault();
        const obj = {
            title:formMovie.title,
            overview:formMovie.overview,
            poster_path:formMovie.poster_path,
            popularity: +formMovie.popularity,
            tags: formMovie.tags
        }
        addMovie({
            variables :{
                newMovieAdd:obj
            }
        })

        history.push('/movie')
    }

    
    return (
           <>
           <div className="mx-5 my-5" style={{ textAlign: "center"}}>
           <form>
           <div class="mb-3 ">
            <h2>Title</h2>
            <input
            class="form-control"
            type="text"
            name="title"
            value={formMovie.title}
            placeholder="Put your new Movie's title here"
            onChange={onChange}/>
           </div>

           <div class="mb-3">
           <h2>Overview</h2>
             <input
             class="form-control"
            type="text"
            name="overview"
            value={formMovie.overview}
            placeholder="Put your new Movie's overview here"
            onChange={onChange}/>
             </div>

            <div class="mb-3">
            <h2>Poster Url</h2>
             <input
             class="form-control"
            type="text"
            name="poster_path"
            value={formMovie.poster_path}
            placeholder="Put your new Movie's pictures here"
            onChange={onChange}/>
             </div>

            <div class="mb-3">
            <h2>Popularity</h2>
             <input
             class="form-control"
            type="number"
            name="popularity"
            value={formMovie.popularity}
            placeholder="Put your new Movie's ranking here"
            onChange={onChange}/>
             </div>

            <div class="mb-3">
            <h2>Tags</h2>
             <input
             class="form-control"
            type="text"
            name="tags"
            value={formMovie.tags}
            placeholder="Put your new Movie's tags here"
            onChange={onChange}/>
             </div>

            <button
            className="btn btn-primary"
            onClick={(e)=> addNewMovie(e)}> input</button>
        </form>
           </div>
           </>
        )
    
}
