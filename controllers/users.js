import User from '../model/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const SECRET_KEY = 'NOTESAPI';

export const createUser = async (req, res) => {
  const { firstName, lastName, email, mobile, password, age } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      mobile,
      password: hashedPassword,
      age,
    });

    const token = jwt.sign({ email: newUser.email, id: newUser._id } ,SECRET_KEY,{
      expiresIn: '1h'
    });

    newUser.token = token;
    newUser.tokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);

    const savedData = await newUser.save();

    res.status(201).json({ user: savedData, });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(422).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(422).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY,{expiresIn: '1h',});
    existingUser.token = token;

    existingUser.tokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000)

    await existingUser.save();

    res.status(200).json({ user: existingUser});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getUsers = async (req, res) => {
  try {
    
    const page = parseInt(req.query.currentPage) || 1;
    const limit = parseInt(req.query.itemsPerPage) || 10;
    const skip = (page - 1) * limit;



    // let query = {}; 
    // if (req.query.searchTerm) {
     
    //   query = {
    //     $or: [
    //       { firstName: { $regex: req.query.searchTerm, $options: 'i' } }, 
    //       { lastName: { $regex: req.query.searchTerm, $options: 'i' } },
    //       { email: { $regex: req.query.searchTerm, $options: 'i' } },
    //       {mobile: { $regex: req.query.searchTerm, $options: 'i'}},
    //       {age: { $regex: req.query.searchTerm, $options: 'i'}},

    //     ],
        
    //   };
     
    //   }
    let query = {}
    if (req.query.searchTerm) {
      if(req.query.firstName) {
        query.firstName = {$regex: req.query.searchTerm, $option: 'i'};
      }
      if (req.query.lastName) {
        query.lastName = {$regex : req.query.searchTerm, $option: 'i'}
      }
      if (req.query.email) {
        query.email = {$regex: req.query.searchTerm, $option: 'i'}
      }
      if (req.query.mobile) {
        query.mobile = {$regex: req.query.searchTerm,$option: 'i'}
      }
      if (req.query.age) {
        query.age = {$regex : req.query.searchTerm,$option: 'i'}
      }
    }


      let sort = {};
    if (req.query.sortColumn && req.query.sortOrder) {
      sort[req.query.sortColumn] = req.query.sortOrder === 'desc' ? -1 : 1;

      if (req.query.sortColumn === 'firstName') {
        query = {
          firstName: { $regex: req.query.searchTerm, $options: 'i' },
        };
      }
      if (req.query.sortColumn === 'lastName') {
        query = {
          lastName: { $regex: req.query.searchTerm, $options: 'i' },
        };
      }
      if (req.query.sortColumn === 'email') {
        query = {
          email: { $regex: req.query.searchTerm, $options: 'i' },
        };
      }
      if (req.query.sortColumn === 'mobile') {
        query = {
          mobile: { $regex: req.query.searchTerm, $options: 'i' },
        };
      }
      if (req.query.sortColumn === 'age') {
        query = {
          age: { $regex: req.query.searchTerm, $options: 'i' },
        };
      }
    }


    const totalCount = await User.find(query).countDocuments();

    const Users = await User.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit);

    if (!res.headersSent) {
    res.json({
      data: Users,
      msg: 'Success',
      total: totalCount.length,
    });
  }
  } catch (err) {
    console.error(err)
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};


export const getUserById = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findOne({ _id: userId });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
  
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  
  
  
  
export const deleteUser = async (req, res) => { 
    try {
        const id = req.params.id;
        const user = await User.findOne({ _id: id });
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        const deletedUser = await User.deleteOne({ _id: id });
    
        if (deletedUser.deletedCount > 0) {
          return res.status(200).json({ message: 'User deleted successfully' });
        } else {
          return res.status(500).json({ message: 'Failed to delete user' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
   
};

export const updateUser =  async (req,res) => {
    try{
        const id = req.params.id;
         const getUser = await User.findOne({_id:id});
         if(!getUser)
         {
        return res.status(404).json({ message: 'Data  not found'});
         }
         const getData = req.body;
         const updateUser = await User.updateOne({_id:id},getData);
         if(updateUser.acknowledged)
         {
            return res.status(200).json({message:'Update Successfully'})
         }
         else{
            return res.status(200).json({message:'Update not Successfully'})
         }
        
    } catch (error) {
        return res.status(500).json({message:'server error'})
    }
    
};

