import { useEffect, useState } from "react"
import api from '../../services/api'
import { Link } from "react-router-dom"
import './home.css'
import API_KEY from "../../services/api_key"

export default function Home() {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        async function loadMovies() {
            const res = await api.get('/movie/now_playing', {
                params: {
                    api_key: API_KEY,
                    language: 'pt-BR',
                    page: 1
                }
            })

            // console.log(res.data.results.slice(0, 10))
            setMovies(res.data.results.slice(0, 10))
            setLoading(false)
        }

        loadMovies()

    }, [])

    if (loading) {
        return (
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return (
        <div className="container">
            <h1 className="list-movies">
                {movies.map((movie) => {
                    return (
                        <article key={movie.id}>
                            <strong>{movie.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
                            <Link to={`/filme/${movie.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </h1>
        </div>
    )
}
