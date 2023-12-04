import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../controllers/users.js';


const authmiddleware = (req, res, next)=>{
    try{
        let token = req.header('Authorization');
        if(token){
            token = token.split(" ")[1];
            const decoded = jwt.verify(token, SECRET_KEY);
            req.user = decoded.user;
            // req.userId = user.id
           
        }
        else{
            res.status(500).json({message: "Unauthorized user"});
        }
        next();
        
        
    }
    catch(error) {
            console.log(error);
            res.status(500).json({message: "unauthorized User"})
        }
    }

 export default authmiddleware;

//  import jwt from 'jsonwebtoken';
// import { SECRET_KEY } from '../controllers/users.js';


// const authmiddleware = (req, res, next) => {
//     const token = req.header('Authorization');
  
//     if (!token) {
//       return res.status(401).json({ message: 'No token, authorization denied' });
//     }
  
//     try {
//       const decoded = jwt.verify(token,SECRET_KEY );
//       req.user = decoded.user;
//       next();
//     } catch (error) {
//       return res.status(401).json({ message: 'Token is not valid' });
//     }
//   };
  

//  export default authmiddleware;