import React from 'react'
import { useReactiveVar } from '@apollo/client';
import {favMovieVar} from '../config/vars'

export default function Favorite() {

    const favorite = useReactiveVar(favMovieVar)

    return (
        <div>
            <h1>Favorite</h1>
            <h1>{JSON.stringify(favorite)}</h1>
        </div>
    )
}
