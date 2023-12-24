// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import List from './components/List';
import AddUserForm from './components/AddUserForm';
import UpdateForm from './components/UpdateForm';
import { useParams } from 'react-router-dom';

const App: React.FC = () => {
  const handleUserAdded = () => {
    // Logique à exécuter après l'ajout d'un utilisateur (peut être vide pour le moment)
  };

  const handleUserUpdated = () => {
    // Logique à exécuter après la mise à jour d'un utilisateur (peut être vide pour le moment)
  };

  // Utilisez useParams pour extraire la valeur de userId de l'URL
  const { userId } = useParams<{ userId: string }>() || { userId: '' }; // Utilisez une chaîne vide comme valeur par défaut

  return (
    <Router>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/add-user" element={<AddUserForm onUserAdded={handleUserAdded} />} />
        {/* Utilisez `:userId` comme paramètre dans la route */}
        <Route
          path="/update-user/:userId"
          element={<UpdateForm userId={userId} onUserUpdated={handleUserUpdated} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
