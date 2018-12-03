//########################################### Employee Schema ###########################################//
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EmployeeSchema = new Schema({
  emp_id: {
    type: String,
    required: true,
    unique: true
  },
  contact:{
      email:{
        type:String,
        required:true,
        unique:[true, 'User email should be unique']
      },
      mobile:{
        type:String,
        validate: {
          validator: function(v) {
            return /\d{3}-\d{3}-\d{4}/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
      },
      alt_mobile:{
          type:String,
          validate: {
            validator: function(v) {
              return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
          }
        }
    },
  emp_name: {
        emp_firstName: {
            type: String,
            required: true
        },
        emp_lastName: {
            type: String,
            required: true
         }
    },
  team: {
        type: String,
        default:'java'
    },
  image: {
        type: String,
        default: 'images/useravatar.png'
    },
  address: {
        lines: {
        type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zip: {
      type: Number
    }
  }
});
//########################################### Export Employee Schema ###########################################//
module.exports = mongoose.model('Employee', EmployeeSchema);
module.exports.get = function (callback, limit) {
  Employee.find(callback).limit(limit);
}