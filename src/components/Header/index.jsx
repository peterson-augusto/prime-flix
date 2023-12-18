import { Link } from 'react-router-dom'
import './header.css'

export default function Header() {
    return (
        <header>
            <Link to='/' className='logo'>Prime Flix</Link>
            <Link to='/favoritos' className='favorites'>Meus filmes</Link>
        </header>
    )
}