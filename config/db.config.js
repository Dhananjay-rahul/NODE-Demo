
let mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/Employee';  // mongodb://localhost - will fail

(async function() {
  try {

  await mongoose.connect(uri,{ useCreateIndex: true,
    useNewUrlParser: true });
  
  } catch(e) {
    console.error(e)
  }

})() 
//################################################## Code for JWT Token #################################
module.exports = {

  'secret': 'ilovescotchyscotch'
 

};
