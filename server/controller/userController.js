const User = require('../model/User')


// create/post user api
const createUser = async (req,res) => {
try {
    const {name,email,phone} = req.body 
    const newUser = await User.create({name,email,phone})
    res.status(201).json(newUser)
}catch (err) {
    console.log(err)
    res.status(500).json({message: 'internal server error'})
}
    
}


// get users api
const getUsers = async(req,res) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'internal server error'})
    }
}

//get user by id;
const getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

//delete user
const deleteUser = async (req,res) => {
    try {
        const{id} =req.params 
        await User.destroy({where: {id}})
        res.status(204).end()
     }catch (err) {
        console.log(err)
        res.status(500).json({message: 'internal server error'})
    }
}

// edit user 

const editUser = async (req,res) => {
    try {
        const { id } = req.params;
        const { name, email, phone } = req.body;
    
        const user = await User.findOne({ where: { id } });
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        user.name = name;
        user.email = email;
        user.phone = phone;
        await user.save();
    
        res.status(200).json(user);
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
      }
}

module.exports = {
    createUser,
    getUsers,
    deleteUser,
    editUser,
    getUserById,
}