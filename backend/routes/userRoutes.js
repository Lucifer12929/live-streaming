const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')

// http://localhost:5000/user/register not http://localhost:5000/signin cuz of rout in server.js
 
/*Next, we go for the POST request. We create a 
new user in the database and then return the 
created user as a response.  */

router.post('/register', userCtrl.register)

router.post('/login', userCtrl.login)
router.post('/refresh_token', userCtrl.getAccessToken)

// login as normal user  -> refresh_token -> grtUserInfo

// login as admin -> refresh_token -> grtAllUsersInfo

router.get('/logout', userCtrl.logout)
// login as normal user   -> refresh_token -> update


module.exports = router
