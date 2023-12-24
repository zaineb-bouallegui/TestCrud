const UserModel = require("../model/user");

// ADD
// const addUser = async (req, res) => {
//     try {
//         const newUser = new UserModel(req.body);
//         await newUser.save();
//         res.json("User added successfully !");
//     } catch (err) {
//         console.error(err);
//         res.status(400).json("Error: " + err.message);
//     }
// };

const addUser = async (req, res) => {
    try {
      const { nom, prenom } = req.body;
      console.log(nom, prenom);
      let user = new UserModel({ nom, prenom });
      await user.save();
      return res.status(200).json({ message: "User added successfully!" });
    } catch (error) {
        console.error(error);
      return res.status(500).json({ error });
    }
  };
  const updateUser = async (req, res) => {
    try {
      const { id } = req.params; // Récupérer l'ID de l'URL
      const { nom, prenom } = req.body; // Nouvelles données de l'utilisateur
  
      // Vérifier si l'ID est valide
      if (!id) {
        return res.status(400).json({ error: "ID utilisateur manquant dans la requête." });
      }
  
      // Vérifier si l'utilisateur existe
      const existingUser = await UserModel.findById(id);
  
      if (!existingUser) {
        return res.status(404).json({ error: "Utilisateur non trouvé." });
      }
  
      // Mettre à jour les données de l'utilisateur
      existingUser.nom = nom || existingUser.nom;
      existingUser.prenom = prenom || existingUser.prenom;
  
      // Enregistrer les modifications
      await existingUser.save();
  
      return res.status(200).json({ message: "Utilisateur mis à jour avec succès." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erreur serveur lors de la mise à jour de l'utilisateur." });
    }
  };
  
  const deleteUser = async(req,res,next)=>{
    try {
        await UserModel.findByIdAndDelete(req.params.id)
        res.status(200).json("user deleted !")
    } catch (error) {
        res.json(error)
    }
}
const list = async (req, res) => {
    try {
      
      const users = await UserModel.find();
    
       
        res.json(users)
      
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error applying doctor account",
        success: false,
        error,
      });
    }
  };


  
  
  // ...
  
  const getUserById = async (req, res) => {
      try {
          // Récupérez l'ID de l'utilisateur à récupérer
          const userId = req.params.id;
  
          // Recherchez l'utilisateur dans la base de données par ID
          const user = await UserModel.findById(userId);
  
          if (!user) {
              return res.status(404).json({ error: 'User not found' });
          }
  
          // Répondez avec l'utilisateur trouvé
          res.json(user);
      } catch (error) {
          console.error('Error fetching user by ID:', error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
  }



module.exports = { addUser,updateUser,deleteUser ,list,getUserById};
