// List.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../redux/userSlice';
import { RootState } from '../redux/store';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

interface User {
  _id: string;
  nom: string;
  prenom: string;
}

const List: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users/get');
      dispatch(setUsers(response.data));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      // Naviguer vers la page d'ajout d'utilisateur
      navigate('/add-user');
    } catch (error) {
      console.error('Error navigating to AddUserForm:', error);
    }
  };

  const handleUpdateUser = async (userId: string) => {
    try {
      // Naviguer vers la page de mise à jour de l'utilisateur avec le paramètre userId
      navigate(`/update-user/${userId}`);
    } catch (error) {
      console.error('Error navigating to UpdateUserForm:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const shouldDelete = window.confirm('Are you sure you want to delete this user?');
      if (!shouldDelete) {
        return;
      }
  
      await axios.delete(`http://localhost:5000/users/delete/${userId}`);
      await fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); // Run once when the component mounts

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>User List</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Nom</th>
            <th style={tableHeaderStyle}>Prénom</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td style={tableCellStyle}>{user.nom}</td>
              <td style={tableCellStyle}>{user.prenom}</td>
              <td style={tableCellStyle}>
                {/* Utilisez le composant Link pour naviguer vers la page de mise à jour de l'utilisateur */}
                <Link to={`/update-user/${user._id}`} style={buttonLinkStyle}>
                  <button style={actionButtonStyle}>Update</button>
                </Link>
                <button onClick={() => handleDeleteUser(user._id)} style={actionButtonStyle}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="/add-user">
          <button style={actionButtonStyle}>Add User</button>
        </Link>
      </div>
    </div>
  );
};

const tableHeaderStyle: React.CSSProperties = {
  background: '#f2f2f2',
  padding: '10px',
  textAlign: 'left',
};

const tableCellStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: '10px',
  textAlign: 'left',
};

const buttonLinkStyle: React.CSSProperties = {
  textDecoration: 'none',
};

const actionButtonStyle: React.CSSProperties = {
  margin: '0 5px',
  padding: '8px 12px',
  fontSize: '14px',
  cursor: 'pointer',
};

export default List;
