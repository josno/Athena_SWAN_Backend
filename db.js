const firebase = require('firebase')
const config = require('./config')

// Set up connection to the Firebase project using
// the firebaseConfig object from the config file
const db = firebase.initializeApp(config.firebaseConfig)

module.exports = db
