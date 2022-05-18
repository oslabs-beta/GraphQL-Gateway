const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('User', userSchema, 'users');
