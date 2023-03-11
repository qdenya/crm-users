import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import {
  deleteUsers,
  reset,
  setSearchTerm,
  setSelectedUser,
  setUsers,
  User,
} from '../../features/users/usersSlice';

const UserList = () => {
  const dispatch = useDispatch();
  //const count = useAppSelector(selectCount);
  const { filteredUsers, searchTerm, deletedUserIds } = useSelector(
    (state: RootState) => state.usersStore,
  );

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      );
      dispatch(setUsers(response.data));
    };
    fetchUsers();
  }, [dispatch]);

  const handleDeleteUser = (userId: number) => {
    dispatch(deleteUsers([userId]));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handleReset = () => {
    dispatch(reset());
  };
 
  const handleUserClick = (user: User) => {
    dispatch(setSelectedUser(user));
  };
 
  return (
    <div>
      <h1>User List</h1>
      <div>
        <input type="text" value={searchTerm} onChange={handleSearch} />
        <button onClick={handleReset}>Reset</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr
              key={user.id}
              style={{ textDecoration: deletedUserIds.includes(user.id) ? 'line-through' : 'none' }}
            >
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                <button onClick={() => handleUserClick(user)}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
