import React from 'react'
import { useQuery, gql ,useMutation} from '@apollo/client';


const GET_ALL = gql`
query movie{
    Movies{
        _id
        title
        overview
        poster_path
        popularity
        tags
    }
    series{
        _id
        title
        overview
        poster_path
        popularity
        tags
    }
}
`

export default function Home() {
    const { data,loading, error } = useQuery(GET_ALL);

if(loading){
    return <h1>loading</h1>
}

    return (
        <div>
            {/* <h3>{JSON.stringify(data.Movies)}</h3> */}
            
            <h1> MOVIE</h1>
            <div class="row row-cols-1 row-cols-md-3 g-4">

            {
                data.Movies.map(el=>{
                    return(
                        <div class="col">
                        <div class="card-group">
                        <div class="card">
                          <img src={el.poster_path} class="card-img-top" alt="..."/>
                          <div class="card-body">
                            <h5 class="card-title">{el.title}</h5>
                            <p class="card-text">{el.overview}</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                          </div>
                        </div>
                      </div>
                </div>
                    )
                })
            }
            </div>
            {/* <h3>{JSON.stringify(data.series)}</h3> */}
            <h1> TV Series</h1>
            <div class="row row-cols-1 row-cols-md-3 g-4">

            {
                data.series.map(el=>{
                    return(
                        <div class="col">
                        <div class="card-group">
                        <div class="card">
                          <img src={el.poster_path} class="card-img-top" alt="..."/>
                          <div class="card-body">
                            <h5 class="card-title">{el.title}</h5>
                            <p class="card-text">{el.overview}</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                          </div>
                        </div>
                      </div>
                </div>
                    )
                })
            }
            </div>
        </div>
    )
}