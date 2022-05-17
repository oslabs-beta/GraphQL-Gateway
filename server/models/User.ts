const Schema = mongoose.Schema;

const userSchema = new Schema({
  handle: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  bio: {type: String, required: false},
  listings: {type: Number, required: false}

});

module.exports = mongoose.model('User', userSchema, 'users');