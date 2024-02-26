const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  username: { type: String },
  userid: { type: Number, required: true, unique: true },
  min: { type: Number },
  max: { type: Number },
  ismin: { type: Boolean },
  ismax: { type: Boolean },
});

const User = model("RandomUser", UserSchema);
module.exports = User;
