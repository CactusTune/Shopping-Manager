//Find admin in db
//If does not exist create one
//make sure the password is hashed
//if exists, log message 

const User = require('../User/User.modal')
const bcrypt = require('../Lib/Bcrypt.Lib');
const { Admin } = require('mongodb');

let AdminUser = null;

(async()=>{
    AdminUser = await User.findOne({ username: process.env.ADMIN_USERNAME}).exec()
})()

if (AdminUser) {
    console.log('Admin account already exists, Skipping "Create Admin Account" process' )
}else {
    bcrypt.hashPassword(process.env.ADMIN_PASSWORD)
        .then(async (hasdhedPassword)=>{
            const newAdminUser = new User({
                username: process.env.ADMIN_USERNAME,
                password: hasdhedPassword,
        })
        newAdminUser.save()
            .then(()=>{
                console.log('Successfully created admin account')
            })
            .catch((error)=>{
                console.log(error)
                process.exit(1);
            })
    })
    .catch((hashErr)=>{
        console.log(hashErr);
        process.exit(1)
    })
}