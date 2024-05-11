
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://labourhub-d8a9c-default-rtdb.firebaseio.com",
    storageBucket: 'gs://labourhub-d8a9c.appspot.com'
});
const bucket = admin.storage().bucket()
const uploadimage = async (path) => {
    const FilePath = '/images/labourers'
    await bucket.upload(path, {
        destination: FilePath,
        metadata: {
            contentType: 'image/jpeg'
        }
    })
    const options = {
        action: 'read',
        expires: Date.now() + 24 * 60 * 60 * 1000
    }

}
module.exports=uploadimage

