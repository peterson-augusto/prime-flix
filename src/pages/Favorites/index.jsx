// useEffect -> Para quando componente for montado, ele ir buscar os itens salvos no localStorage
// useState -> Colocar os itens salvos para poder manipular dentro de um estado

import { useEffect, useState } from 'react'
import './favorites.css'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Favorites() {
    const [movies, setMovies] = useState([])

    useEffect(() => {

        const myList = localStorage.getItem('@primeflix');
        setMovies(JSON.parse(myList) || [])

    }, [])

    function deleteMovie(id) {
        let filterMovies = movies.filter((item) => {
            return (item.id !== id)
        })

        setMovies(filterMovies)
        localStorage.setItem('@primeflix', JSON.stringify(filterMovies))
        toast.success('Filme removido com sucesso!')
    }

    return (
        <div className='my-movies'>
            <h1>Meus filmes</h1>

            {movies.length === 0 && <span>Você não possuem nenhum filme salvo :(</span>}

            <ul>
                {movies.map((item) => {
                    return (
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button onClick={() => deleteMovie(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>

        </div>
    )
}

