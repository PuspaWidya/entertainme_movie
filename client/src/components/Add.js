import React ,{useState}from 'react';
import { useQuery, gql ,useMutation} from '@apollo/client';

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
    
    const [addMovie, {data:newData,loading:newLoading,error:newError}
    ] = useMutation(ADD_MOVIE,
    //     {
    //     refetchQueries:[{
    //         query:GET_MOVIES
    //     }]
    // }

    )
    
    
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
    }

    
    return (
           <>
           <form>
            <input
            type="text"
            name="title"
            value={formMovie.title}
            placeholder="title"
            onChange={onChange}/>

             <input
            type="text"
            name="overview"
            value={formMovie.overview}
            placeholder="overview"
            onChange={onChange}/>

             <input
            type="text"
            name="poster_path"
            value={formMovie.poster_path}
            placeholder="poster_path"
            onChange={onChange}/>

             <input
            type="number"
            name="popularity"
            value={formMovie.popularity}
            placeholder="popularity"
            onChange={onChange}/>

             <input
            type="text"
            name="tags"
            value={formMovie.tags}
            placeholder="tags"
            onChange={onChange}/>
            <button onClick={(e)=> addNewMovie(e)}> input</button>
        </form>
           </>
        )
    
}
