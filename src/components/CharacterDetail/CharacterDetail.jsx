import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import './CharacterDetail.css'; 

const CharacterDetail = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        axios.get(`https://rickandmortyapi.com/api/character/${id}`)
            .then(response => {
                const characterData = response.data;
                axios.get(characterData.episode[0])
                    .then(episodeResponse => {
                        setCharacter({
                            ...characterData,
                            firstEpisode: episodeResponse.data.name,
                        });
                    });
            })
            .catch(error => console.error("Ошибка загрузки данных:", error));
    }, [id]); 

    if (!character) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="character-detail">
            <img src={character.image} alt={character.name} />
            <h1>{character.name}</h1>
            <h2>Status: {character.status}</h2>
            <h2>Location: {character.location.name}</h2>
            <h2>First seen in: {character.firstEpisode}</h2>
            <h2>Species: {character.species}</h2>
            <h2>Gender: {character.gender}</h2>
            <h2>Origin: {character.origin.name}</h2>
        </div>
    );
};

export default CharacterDetail;
