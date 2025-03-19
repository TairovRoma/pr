import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './Card.css'

const Card = () => {
    const [character, setCharacter] = useState([])

    useEffect(() =>{
        const ids = [1, 2, 3]
        ids.forEach((id) =>{
            axios(`https://rickandmortyapi.com/api/character/${id}`)
        .then(({ data }) => {
            axios(data.episode[0])
            .then(({ data: episodeData }) => {
              setCharacter((ind) => [...ind, {...data, firstEpisode: episodeData.name }]);
            });
          });
        });
      }, [])
    return (
        <div className='container' >
            {
                character.map((item) =>(
                    <div className='card' key={item.id} >
                        <img className='card-img' src={item.image} alt="" />
                        <div className='card-data'>
                            <h1 style={{
                                color: 'white'
                            }}>{item.name}</h1>

                            <h1 style={{
                                color: 'white',
                            }} >{item.status}</h1>

                            <h2>Last known location:</h2>

                            <h2 style={{
                                color: 'white'
                            }} >{item.location.name}</h2>

                            <h2>First seen in:</h2>
                            <h1>{item.episode.name}</h1>
                            
                            <h2 style={{
                                color: 'white'
                            }} >{item.firstEpisode}</h2>
                            </div>
                    </div>
                ))
            }
            
        </div>
    );
}

export default Card;
