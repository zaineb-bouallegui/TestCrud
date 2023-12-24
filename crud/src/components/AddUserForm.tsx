import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface AddUserFormProps {
  onUserAdded: () => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onUserAdded }) => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({ nom: '', prenom: '' });

  const handleAddUser = async () => {
    try {
      console.log('New User:', newUser);
      if (!newUser.nom || !newUser.prenom) {
        console.error('Veuillez remplir tous les champs.');
        return;
      }

      await axios.post('http://localhost:5000/users/add', newUser);

      setNewUser({ nom: '', prenom: '' });
      onUserAdded();

      navigate('/');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Formulaire d'ajout d'utilisateur</h2>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Nom:</label>
        <input
          type="text"
          value={newUser.nom}
          onChange={(e) => setNewUser({ ...newUser, nom: e.target.value })}
          style={{ ...inputStyle, width: '150px' }}  // Largeur réduite à 150px
        />
      </div>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Prénom:</label>
        <input
          type="text"
          value={newUser.prenom}
          onChange={(e) => setNewUser({ ...newUser, prenom: e.target.value })}
          style={{ ...inputStyle, width: '150px' }}  // Largeur réduite à 150px
        />
      </div>
      <button onClick={handleAddUser} style={buttonStyle}>
        Ajouter un utilisateur
      </button>
    </div>
  );
};


const containerStyle: React.CSSProperties = {
  textAlign: 'center',
  margin: '20px',
};

const headerStyle: React.CSSProperties = {
  fontSize: '24px',
  marginBottom: '20px',
};

const inputContainerStyle: React.CSSProperties = {
  marginBottom: '15px',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '5px',
};

const inputStyle: React.CSSProperties = {
  padding: '8px',
  fontSize: '16px',
  width: '100%',
  boxSizing: 'border-box',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px',
  fontSize: '18px',
  cursor: 'pointer',
};

export default AddUserForm;
