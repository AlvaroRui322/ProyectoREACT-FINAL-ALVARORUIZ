import {Link} from "react-router-dom"
const UserProfile = () => {
    return (
        <div>UserProfile
        <ul>
            <li><Link to="/profile/teams">My teams</Link></li>
            <li><Link to="/profile/favorites">Favorites</Link></li>
        </ul>
        </div>
    )
}

export default UserProfile;