const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fName: { type: String, require: true, minLength: 3, maxLength: 30 },
  lName: { type: String, require: true, minLength: 3, maxLength: 30 },
  email: { type: String, unique: true, match: /.+@.+\..+/ },
  birthDate: Date,
});
// call it on the new instance
// userSchema.methods.getUserFullName = function () {
//   return this.fName + " " + this.lName;
// }
// userSchema.statics.getUserByFullName = function (fullName,cb){
//   const [fName,lName] = fullName.split(' ');
//   UserModel.find({fName,lName},cb)
// }
const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
