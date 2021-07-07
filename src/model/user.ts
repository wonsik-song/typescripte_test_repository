const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const crypto = require('crypto')
// const config = require('../config')
// const uuid = require('uuid');

const User = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    id: {type: String, required: true},
    imageUri: {type: String},
    email: {type: String, required: true},
    address: {type: String},
    maritalStatus: {type: String},
    nationality: {type: String},
    nationalityUriId: {type: Number},
    gender: {type: String},
    age: {type: Number},
    birthday: {type: String},
    userType: {type: String}
})


// crypto.createHmac('sha1', 'secret')
//              .update('mypasswssord')
//              .digest('base64')


User.statics.create = function(req:any) {
    // const encrypted = crypto.createHmac('sha1', config.secret)
    //                   .update(req.body.password)
    //                   .digest('base64')
    const user = new this({
        username: req.body.username,
        // password: encrypted,
        // id: uuid.v1(),
        userType: "RED1",
        imageUri: req.body.imageUri,
        email: req.body.email,
        address: req.body.address,
        maritalStatus: req.body.maritalStatus,
        nationality: req.body.nationality,
        nationalityUriId: req.body.nationalityUriId,
        gender: req.body.gender,
        age: req.body.age,
        birthday: req.body.birthday
    })
    return user.save()
}

User.statics.findOneByEmail = function(email:any) {

    console.log("findOneByEmail"+email)

    return this.findOne({
        email
    }).exec()
}

User.methods.verify = function(password:string) {
    // const encrypted = crypto.createHmac('sha1', config.secret)
    //                   .update(password)
    //                   .digest('base64')
    // console.log(this.password === encrypted)

    // return this.password === encrypted
    return true
}

User.methods.assignAdmin = function() {
    this.admin = true
    return this.save()
}

User.statics.delete = function(req:any) {
    return this.findOneAndRemove({id:req.decoded.id}).exec()
}

module.exports = mongoose.model('User', User)