const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	rest: {
		type: Number,
		default: 10  // este es el valor de conversiones (OCR) iniciales.
	}
});

module.exports = User = mongoose.model("users", UserSchema);
