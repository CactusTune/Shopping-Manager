/*const db = require('mongoose');

const URI = process.env.MONG0_URI

const getConnection = () => {
    db.connect(URI, {
        useNewUrlParser : true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log('Successfully connected to the database')
        })
        .catch((err)=>{
            console.log(err)
            process.exit(1)
        })
}

module.exports = {
    getConnection,
}
*/

const mongoose = require('mongoose');

const connection = {};

async function dbConnect() {
    if (connection.isConnected) {
        return ;
    }

    const db = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;

    console.log('Successfully connected to database')
}

module.exports =  dbConnect;
