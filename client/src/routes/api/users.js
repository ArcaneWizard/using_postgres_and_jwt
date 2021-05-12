const express = require('express');
const router = express.Router();
const pool = require("../../../../server/db");

router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    //Simple validaiton
    if (!name || !email || !password) {
        return res.status(400).json({ Msg: 'Please enter all fields' });
    }

    //Check for existing user 
    try {
        pool.query(
            "SELECT * FROM users WHERE email = $1", [email]
        ).then(results => res.json(results.rows));
    } catch (err) {
        console.log(err.message);
    }

    return res.status(400).json({ Hey: "sup" })

})

module.exports = router;