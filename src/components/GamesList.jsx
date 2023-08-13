import React, { useState, useEffect } from 'react';
import '../GamesList.css';
import GamesService from '../services/games-service';
import GamesFilter from './Gamesfilter';


const gamesService = new GamesService("http://localhost:3000");


function GamesList() {
    const [games, setGames] = useState([]);
    const [allGames, setAllGames] = useState([]);
    const [genres, setGenres] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);


    useEffect(() => {

        gamesService.getGame()
            .then(gamesJsonData => {
                setGames(gamesJsonData);
                setAllGames(gamesJsonData);
                setGenres(getUniqueGenresList(gamesJsonData));
                setPublishers(getUniquePublishersList(gamesJsonData))
                setErrorMessage(null);
            })
            .catch(error => {
                console.log(error)
                setErrorMessage("Unable to connect to server. Please try again later!")
            })
    },
        []);

    const getUniqueGenresList = function (games) {
        const allGenresList = games.map(game => game.genre);
        const uniqueGenresList = [...new Set(allGenresList)];
        return uniqueGenresList;
    }

    const getUniquePublishersList = function (games) {
        const allPublishersList = games.map(game => game.publisher);
        const uniquePublishersList = [...new Set(allPublishersList)];
        return uniquePublishersList;
    }
    

    const applyFilters = function (title, genre, publisher) {
        let filteredGames = allGames.filter(game =>
            game.title.toLowerCase().includes(title.toLowerCase()) &&
            (genre === "" || game.genre.includes(genre)) &&
            (publisher === "" || game.publisher === publisher)
        );
        setGames(filteredGames);
    }
    


    const showAllGames = function () {
        setGames(allGames);
    }



    const gameCardTemplate = (game) => (
        <div key={game.id} className="game-card card grow mb-3 shadow h-md-250 video-card">
            <div className="card-body">
                <div className="row">
                    <div className="col-3 align-self-center mt-n2">
                        <div className="card">
                            <div className="image-wrapper">
                                <img className="card-img-top" src={game.thumbnail} alt={game.title} />
                            </div>
                        </div>
                    </div>
                    <div className="col-7 col-sm-6 col-lg-7 align-self-center justify-content-center position-static">
                        <a href={game.game_url} className="stretched-link no-underline">
                            <h4 className="card-title text-truncate mt-n2 mb-1">{game.title}</h4>
                        </a>
                        <div className="text-truncate text-muted mb-1">{game.short_description}</div>
                        <span className="badge badge-secondary text-dark mr-2">{game.genre}</span>
                    </div>
                    <div className="col-1 align-self-center text-center text-muted justify-content-center d-none d-sm-block">
                        <h5><i className="fab fa-windows">Windows</i></h5>
                    </div>
                    <div className="col-1 justify-content-center text-center align-self-center">
                        <span className="badge badge-ftg py-2 px-2 mb-2">FREE</span>
                    </div>
                </div>
            </div>
        </div>
    );


    return (
        <div className='centered-container'>
            {errorMessage && <h1>{errorMessage}</h1>}
            {!errorMessage && <GamesFilter
                genres = {genres}
                publishers={publishers}
                onFilterChange={applyFilters}
                >
            </GamesFilter>}
            {games.length === 0 ? (
                <p>No games found.</p>
            ) : (
                <div className="game-list">
                    {games.map(game => gameCardTemplate(game))}
                </div>
            )}
        </div>
    );
}

export default GamesList;
