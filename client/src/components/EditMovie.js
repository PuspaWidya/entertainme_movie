import React,{useState,useEffect } from 'react'
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


const UPDATE_MOVIE = gql`
mutation EditMovie($editDataMovie:editMovie){
    editMovie(data:$editDataMovie){
        _id
        title
        overview
        poster_path
        popularity
        tags
    }
}
`
export default function EditMovie() {
    
    const history = useHistory()
    // get data
    let params = useParams();
    const {id} = params
    const { data,loading, error } = useQuery(GET_MOVIE,{
        variables:{
            id:id
        }
    });

    useEffect(() => {
        console.log(data,'INI DARI USE EFFECT')
        if(data){
            setFormMovie(data.movie)
        }
    }, [data])


    const [editMovieData, {data:editData,loading:editLoading,error:editError}
    ] = useMutation(UPDATE_MOVIE)
    

    const [formMovie,setFormMovie] = useState({
        title:'',
        overview:'',
        poster_path:'',
        popularity:0,
        tags:''
    })
    

    
    

    //new value
    const onChange = (e)=>{
        let {name,value} = e.target
        const newMovie = {...formMovie,[name]:value}
        // console.log(newMovie,'<<<<<<<<<<<<<<<<<<<<<<<')
        setFormMovie(newMovie)
    }
    
    
    const editMovie = (e) =>{
        e.preventDefault();
        // console.log('masuk edit')
        const obj = {
                _id: formMovie._id,
                title:formMovie.title,
                overview:formMovie.overview,
                poster_path:formMovie.poster_path,
                popularity: +formMovie.popularity,
                tags: formMovie.tags
            }
            // console.log(obj)
            editMovieData({
                variables :{
                    editDataMovie:obj
                    }
                })
            history.push('/')
            }
                

    
            if(loading){
                return <h1>Loading</h1>
            }
                
                
                
            return (
            <div className="mx-5 my-5" style={{ textAlign: "center"}}>
            <form>

            <div class="mb-3 ">
            <h2>Title</h2>
            <input
            class="form-control"
            type="text"
            name="title"
            value={formMovie.title}
            placeholder="title"
            onChange={onChange}/>
            </div>


            <div class="mb-3">
           <h2>Overview</h2>
             <input
             class="form-control"
            type="text"
            name="overview"
            value={formMovie.overview}
            placeholder="overview"
            onChange={onChange}/> 
            </div>
            
            <div class="mb-3">
            <h2>Poster Url</h2>
             <input
             class="form-control"
            type="text"
            name="poster_path"
            value={formMovie.poster_path}
            placeholder="poster_path"
            onChange={onChange}/> 
            </div>
            

            <div class="mb-3">
            <h2>Popularity</h2>
             <input
             class="form-control"
            type="number"
            name="popularity"
            value={formMovie.popularity}
            placeholder="popularity"
            onChange={onChange}/>
             </div>

             <div class="mb-3">
            <h2>Tags</h2>
             <input
            class="form-control"
            type="text"
            name="tags"
            value={formMovie.tags}
            placeholder="tags"
            onChange={onChange}/>
            <button onClick={(e)=> editMovie(e)}> Edit</button>
            </div>
        </form>
        </div>
    )
}
