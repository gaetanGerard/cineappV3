import React, { useReducer } from 'react';
import FavoriteContext from './favoriteContext';
import FavoriteReducer from './favoriteReducer';
import {
    ADD_FAVORITE,
    DELETE_FAVORITE
} from '../types';

const FavoriteState = props => {
    const initialState = {
        favorite: [
            {
                id: 299534,
                genres: [
                    {
                        id: 12,
                        name: "Adventure"
                    },
                    {
                        id: 878,
                        name: "Science Fiction"
                    },
                    {
                        id: 28,
                        name: "Action"
                    }
                ],
                production_companies: [
                    {
                        id: 420,
                        logo_path: "/hUzeosd33nzE5MCNsZxCGEKTXaQ.png",
                        name: "Marvel Studio",
                        origin_country: "US"
                    }
                ],
                production_countries: [
                    {
                        iso_3166_1: "US",
                        name: "United State of America"
                    }
                ],
                spoken_languages: [
                    {
                        iso_639_1:"en",
                        name:"English"
                    },
                    {
                        iso_639_1:"ja",
                        name:"日本語"
                    }
                ],
                list_favorite:"favoris",
                adult: false,
                backdrop_path: "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
                belong_to_collection: {
                    id: 86311,
                    name: "The Avengers Collection",
                    poster_path: "/yFSIUVTCvgYrpalUktulvk3Gi5Y.jpg",
                    backdrop_path:"/zuW6fOiusv4X9nnW3paHGfXcSll.jpg"
                },
                budget: 356000000,
                imdb_id: "tt4154796",
                original_language: "en",
                original_title: "Avengers: Endgame",
                overview: "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",
                popularity: 167.786,
                poster_path: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
                release_date: "2019-04-24",
                runtime: 181,
                status: "Released",
                tagline: "Part of the journey is the end.",
                title: "Avengers: Endgame",
                video: false,
                vote_average: 8.4,
                vote_count: 8000
            },
            {
                id: 399579,
                genres: [
                    {
                        id: 28,
                        name: "Action"
                    },
                    {
                        id: 878,
                        name: "Science Fiction"
                    },
                    {
                        id: 53,
                        name: "Thriller"
                    },
                    {
                        id: 12,
                        name: "Adventure"
                    }
                ],
                production_companies: [
                    {
                        id: 10807,
                        logo_path: "/j0BcMaJKIiDDYHq9lriTcM0Npka.png",
                        name: "Troublemaker Studios",
                        origin_country: "US"
                    },
                    {
                        id: 574,
                        logo_path: "/iB6GjNVHs5hOqcEYt2rcjBqIjki.png",
                        name: "Lightstorm Entertainment",
                        origin_country: "US"
                    },
                    {
                        id: 25,
                        logo_path: "/qZCc1lty5FzX30aOCVRBLzaVmcp.png",
                        name: "20th Century Fox",
                        origin_country: "US"
                    },
                    {
                        id: 22213,
                        logo_path: "/qx9K6bFWJupwde0xQDwOvXkOaL8.png",
                        name: "TSG Entertainment",
                        origin_country: "US"
                    },
                    {
                        id: 120655,
                        logo_path: null,
                        name: "Caffeination",
                        origin_country: ""
                    }
                ],
                production_countries: [
                    {
                        iso_3166_1: "US",
                        name: "United State of America"
                    }
                ],
                spoken_languages: [
                    {
                        iso_639_1:"en",
                        name:"English"
                    },
                    {
                        iso_639_1:"es",
                        name:"Español"
                    }
                ],
                list_favorite:"favoris",
                adult: false,
                backdrop_path: "/8yjqnpOfuFQg3qLRl9Ca1NgIBB5.jpg",
                belong_to_collection: null,
                budget: 170000000,
                imdb_id: "tt0437086",
                original_language: "en",
                original_title: "Alita: Battle Angel",
                overview: "When Alita awakens with no memory of who she is in a future world she does not recognize, she is taken in by Ido, a compassionate doctor who realizes that somewhere in this abandoned cyborg shell is the heart and soul of a young woman with an extraordinary past.",
                popularity: 161.453,
                poster_path: "/xRWht48C2V8XNfzvPehyClOvDni.jpg",
                release_date: "2019-01-31",
                revenue: 404852543,
                runtime: 122,
                status: "Released",
                tagline: "An angel falls. A warrior rises.",
                title: "Alita: Battle Angel",
                video: false,
                vote_average: 6.8,
                vote_count: 2789
            },
            {
                id: 447404,
                genres: [
                    {
                        id: 28,
                        name: "Action"
                    },
                    {
                        id: 12,
                        name: "Adventure"
                    },
                    {
                        id: 14,
                        name: "Fantasy"
                    }
                ],
                production_companies: [
                    {
                        id: 923,
                        logo_path: "/5UQsZrfbfG2dYJbx8DxfoTr2Bvu.png",
                        name: "Legendary Entertainment",
                        origin_country: "US"
                    },
                    {
                        id: 12288,
                        logo_path: "/e4dQAqZD374H5EuM0W1ljEBWTKy.png",
                        name: "Nintendo",
                        origin_country: "JP"
                    },
                    {
                        id: 12654,
                        logo_path: "/3sHXKnICfbRBtC9PN82MQ6cdlLV.png",
                        name: "The Pokemon Company",
                        origin_country: "JP"
                    },
                    {
                        id: 882,
                        logo_path: "/fRSWWjquvzcHjACbtF53utZFIll.png",
                        name: "Toho Company, Ltd.",
                        origin_country: "JP"
                    },
                    {
                        id: 174,
                        logo_path: "/ky0xOc5OrhzkZ1N6KyUxacfQsCk.png",
                        name: "Warner Bros. Pictures",
                        origin_country: "US"
                    }
                ],
                production_countries: [
                    {
                        iso_3166_1: "JP",
                        name: "Japan"
                    },
                    {
                        iso_3166_1: "US",
                        name: "United State of America"
                    }
                ],
                spoken_languages: [
                    {
                        iso_639_1:"en",
                        name:"English"
                    }
                ],
                list_favorite:"favoris",
                adult: false,
                backdrop_path: "/nDP33LmQwNsnPv29GQazz59HjJI.jpg",
                belong_to_collection: null,
                budget: 150000000,
                imdb_id: "tt5884052",
                original_language: "en",
                original_title: "Pokémon Detective Pikachu",
                overview: "In a world where people collect pocket-size monsters (Pokémon) to do battle, a boy comes across an intelligent monster who seeks to be a detective.",
                popularity: 132.226,
                poster_path: "/wgQ7APnFpf1TuviKHXeEe3KnsTV.jpg",
                release_date: "2019-05-03",
                revenue: 427492041,
                runtime: 105,
                status: "Released",
                tagline: "Partner Up!",
                title: "Pokémon Detective Pikachu",
                video: false,
                vote_average: 7,
                vote_count: 1789
            }
        ]
    };

    const [state, dispatch] = useReducer(FavoriteReducer, initialState);

    /* Add Favorite */
    const addFavorite = favorite => dispatch({type: ADD_FAVORITE, payload: favorite });

    /* Delete Favorite */
    const deleteFavorite = id => dispatch({ type: DELETE_FAVORITE, payload: id });

    return (
        <FavoriteContext.Provider
        value={{
            favorite: state.favorite,
            addFavorite,
            deleteFavorite
        }}>
            { props.children}
        </FavoriteContext.Provider>
    );
};

export default FavoriteState;