import { Link } from 'react-router-dom';
import usersData from '../data/users.json';

function UserList() {
    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Business Cards</h1>
            <div className="space-y-4">
                {usersData.userList.map(user => (
                    <Link
                        key={user.id}
                        to={`/users/${user.id}`}
                        className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                        <h2 className="font-semibold">{user.name}</h2>
                        <p className="text-gray-600">{user.title}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default UserList; 