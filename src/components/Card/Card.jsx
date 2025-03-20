import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Card.css';

const Card = () => {
    const [characters, setCharacters] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const ids = [1, 2, 3, 4, 5, 6];

        Promise.all(ids.map(id => axios.get(`https://rickandmortyapi.com/api/character/${id}`)))
            .then(responses => {
                const characterData = responses.map(response => response.data);

                return Promise.all(
                    characterData.map(character =>
                        axios.get(character.episode[0])
                            .then(episodeResponse => ({
                                ...character,
                                firstEpisode: episodeResponse.data.name
                            }))
                    )
                );
            })
            .then(dataWithEpisodes => {
                setCharacters(dataWithEpisodes);
            })
            .catch(error => console.error("Ошибка загрузки данных:", error));
    }, []);

    const handleClick = (id) => {
        navigate(`/character/${id}`);
    };

    return (
        <div className='container'>
            {characters.map(item => (
                <div className='card' key={item.id}>
                    <img className='card-img' src={item.image} alt={item.name} />
                    <div className='card-data'>
                        <h1 onClick={() => handleClick(item.id)} style={{cursor: 'pointer', color: '#00bcd4'}}>
                            {item.name}
                        </h1>
                        <h2>Status: {item.status}</h2>
                        <h2>Last known location:</h2>
                        <h2>{item.location.name}</h2>
                        <h2>First seen in:</h2>
                        <h2>{item.firstEpisode}</h2>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Card;
