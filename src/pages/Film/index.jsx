import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './film-info.css'
import api from '../../services/api'
import { toast } from 'react-toastify'
import API_KEY from '../../services/api_key'

export default function Film() {

    const { id } = useParams();
    const navigate = useNavigate()

    const [movie, setMovie] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        async function loadMovie() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: API_KEY,
                    language: 'pt-BR',
                }
            })
                .then((res) => {
                    setMovie(res.data)
                    setLoading(false)
                })
                .catch(() => {
                    console.log('FILME NÃO ENCONTRADO')
                    navigate('/', { replace: true })
                    return;
                })
        }

        loadMovie()

        return () => {
            console.log('COMPONENTE FOI DESMONTADO')
        }

    }, [navigate, id])

    function saveMovie() {
        const myList = localStorage.getItem('@primeflix'); // criar um storage para armzenar os movies

        let saveMovies = JSON.parse(myList) || [];

        const hasMovie = saveMovies.some((movieSave) => movieSave.id === movie.id)

        if (hasMovie) {
            toast.warn("Este filme já está na sua lista!")
            return;
        }

        saveMovies.push(movie)
        localStorage.setItem('@primeflix', JSON.stringify(saveMovies))
        toast.success('Filme salvo com sucesso!')

    }

    if (loading) {
        return (
            <div className='movie-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return (
        <div className='movie-info'>
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
            <h3>Sinopse</h3>
            <span>{movie.overview}</span>
            <strong>Avaliação: {movie.vote_average} / 10</strong>

            <div className='area-buttons'>
                <button onClick={saveMovie}>Salvar</button>
                <button>
                    <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${movie.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>

        </div>
    )
}