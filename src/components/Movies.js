import { useState, useEffect } from "react"
import { Movie } from "./Movie"



export function Movies() {
    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState('');

    const key = '8bfe76115558d68932f7ef81b2373bd5'
    const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${key}&page=1`
    const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=${key}&query=`


    useEffect(() => {
        fetch(FEATURED_API)
            .then((res) => res.json())
            .then((res) => setMovies(res.results));

    }, [FEATURED_API])

    function handleChange(e) {
        setSearchTerm(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch(SEARCH_API + searchTerm)
            .then((res) => res.json())
            .then((res) => setMovies(res.results));
        setSearchTerm('')

    }

    return (
        <div className="container">
            <header>
                <form onSubmit={handleSubmit}>
                    <input onChange={handleChange}
                        className="search"
                        type="search"
                        placeholder="Search..."
                        value={searchTerm}
                    />
                </form>
            </header>

            <div className="movie-container">
                {movies.map((movie) => (
                    <Movie key={movie.id} {...movie} />
                ))}
            </div>
        </div >
    )
}
