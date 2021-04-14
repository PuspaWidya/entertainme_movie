import React from 'react'
import { useReactiveVar } from '@apollo/client';
import {favMovieVar} from '../config/vars'
import empty from '../assets/empty.gif'


export default function Favorite() {

    const favorite = useReactiveVar(favMovieVar)

    if(favorite.length < 1){
        return(
            <>
            <div style={{position:'center', textAlign:'center', padding:'2em'}}>
            <img src={empty} alt="Empty" style={{width:"48em",height:"48em"}}/>  
            <h1> Your Favorite it's empty</h1>
            </div>
            </>
        )
    }


    return (
        <div>
            <h1>Favorite</h1>
               <div className="homepage">
            <div className="rowHomepage row row-cols-1 row-cols-md-2 g-4">
            {favorite?.map(movie =>{
                return(
                    <>
                    <div>
                    <div class="col">
                        <div class="card">
                        <img src={movie.poster_path}class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">{movie.title}</h5>
                            <p class="card-text">{movie.overview}</p>
                    </div>
                        </div>
                        </div>
                    </div>

                    </>
                    
                    )
                })}
                </div>
        </div>
        </div>
    )
}
