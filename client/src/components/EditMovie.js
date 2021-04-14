import React,{useState} from 'react'
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
mutation EditMovie($editData:editMovie){
    editMovieById(data: $editData){
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
    // get data
    let params = useParams();
    const {id} = params
    const { data,loading, error } = useQuery(GET_MOVIE,{
        variables:{
            id:id
        }
    });

    // console.log(data,'<<<<<<<<<<<<<<<<<<<<<<<<<<')
    const [addMovie, {data:newData,loading:newLoading,error:newError}
    ] = useMutation(UPDATE_MOVIE)
    

    const [formMovie,setFormMovie] = useState({
        title:'',
        overview:'',
        poster_path:'',
        popularity:0,
        tags:''
    })
    
    const [title, setTitle] = useState('');
    const [overview, setOverview] = useState('');
    const [poster_path, setPosterpath] = useState('');
    const [popularity, setPopularity] = useState(0);
    const [tags, setTags] = useState('');
    
    //data yang di ambil di masukan
    
    
    

    //new value
    const onChange = (e)=>{
        let {name,value} = e.target
        const newMovie = {...formMovie,[name]:value}
        // const newMovie2 = {...data.movie,[name]:value}
        console.log(newMovie)
        setFormMovie(newMovie)
    }
    
    const editMovie = (e) =>{
        e.preventDefault();
        // const obj = {
            //     title:formMovie.title,
            //     overview:formMovie.overview,
            //     poster_path:formMovie.poster_path,
            //     popularity: +formMovie.popularity,
            //     tags: formMovie.tags
            // }
            // addMovie({
                //     variables :{
                    //          editMovie:obj
                    //     }
                    // })
                }
                
    
                if(loading){
                    return <h1>Loading</h1>
                }
                
                
                
                return (
                    <div>
            <h1>{JSON.stringify(data)}</h1>
            <h1>{title}</h1>
            <form>
            <input
            type="text"
            name="title"
            value={data.movie.title}
            placeholder="title"
            onChange={(e)=>{setTitle(e.target.value)}}/>
            {/* // onChange={()=>onChange}/> */}


             <input
            type="text"
            name="overview"
            value={data.movie.overview}
            placeholder="overview"
            onChange={(e)=>{setOverview(e.target.value)}}/>
            {/* onChange={onChange}/> */}


             <input
            type="text"
            name="poster_path"
            value={data.movie.poster_path}
            placeholder="poster_path"
            onChange={(e)=>{setPosterpath(e.target.value)}}/>
            {/* onChange={onChange}/> */}


             <input
            type="number"
            name="popularity"
            value={data.movie.popularity}
            placeholder="popularity"
            onChange={(e)=>{setPopularity(e.target.value)}}/>
            {/* // onChange={onChange}/> */}


             <input
            type="text"
            name="tags"
            value={data.movie.tags}
            placeholder="tags"
            onChange={(e)=>{setTags(e.target.value)}}/>
            {/* onChange={onChange}/> */}
            <button onClick={(e)=> editMovie(e)}> input</button>
        </form>
        </div>
    )
}
