// UpdateForm.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface UpdateFormProps {
  userId: string | undefined; // Utilisez l'union de types pour indiquer que userId peut être undefined
  onUserUpdated: () => void;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ userId, onUserUpdated }) => {
    const [updatedUser, setUpdatedUser] = useState({ nom: '', prenom: '' });
  
    const fetchUserDetails = async () => {
      try {
        if (userId) {
          console.log('Fetching user details for userId:', userId);
          const response = await axios.get(`http://localhost:5000/users/get/${userId}`);
          const user = response.data;
          console.log('Fetched user details:', user);
          // Utilisez une fonction de rappel avec setUpdatedUser pour garantir la mise à jour asynchrone
          setUpdatedUser((prevUser) => ({ ...prevUser, nom: user.nom, prenom: user.prenom }));
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
  
    const handleUpdateUser = async () => {
      try {
        if (userId) {
          console.log('Updating user for userId:', userId);
          console.log('Updated user data:', updatedUser);
          await axios.put(`http://localhost:5000/users/edit/${userId}`, updatedUser);
          onUserUpdated();
        }
      } catch (error) {
        console.error('Error updating user:', error);
      }
    };
  
    useEffect(() => {
      console.log('userId in useEffect:', userId);
      fetchUserDetails();
    }, [userId]);
  
    console.log('updatedUser in useEffect:', updatedUser);
  
    return (
      <div>
        <h2>Formulaire de mise à jour d'utilisateur</h2>
        <div>
          <label>Nom:</label>
          <input
            type="text"
            value={updatedUser.nom}
            onChange={(e) => setUpdatedUser({ ...updatedUser, nom: e.target.value })}
          />
        </div>
        <div>
          <label>Prénom:</label>
          <input
            type="text"
            value={updatedUser.prenom}
            onChange={(e) => setUpdatedUser({ ...updatedUser, prenom: e.target.value })}
          />
        </div>
        <button onClick={handleUpdateUser}>Mettre à jour l'utilisateur</button>
      </div>
    );
  };

export default UpdateForm;
