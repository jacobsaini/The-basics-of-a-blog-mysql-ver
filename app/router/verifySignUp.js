const db = require('../models/');

checkDuplicateUserNameOrEmail = (req, res, next) => {
  // -> Check Username is already in use
  db.user.findOne({
    where: {
      username: req.body.username
    } 
  }).then(user => {
    if(user){
      res.status(400).send("Fail -> Username is already taken!");
      return;
    }
    
    // -> Check Email is already in use
    db.user.findOne({ 
      where: {
        email: req.body.email
      } 
    }).then(user => {
      if(user){
        res.status(400).send("Fail -> Email is already in use!");
        return;
      }
        
      next();
    });
  });
}
 
 
const signUpVerify = {};
signUpVerify.checkDuplicateUserNameOrEmail = checkDuplicateUserNameOrEmail;

 
module.exports = signUpVerify;