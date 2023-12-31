import { UserMsg} from '../cmps/UserMsg.jsx'

const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <img src="assets/img/unicorn.png" alt="" />
            <h1>Appsus</h1>
        </Link>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
        <UserMsg/>
    </header>
}
