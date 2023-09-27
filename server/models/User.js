const {Schema, model} = require('mongoose')

const User = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}],
    group: {type: String, default: ""},
    variant: {type: String, default: ""},
    phone: {type: String, default: ""},
})

module.exports = model('User', User)