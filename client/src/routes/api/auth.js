const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const pool = require("../../../../server/db");
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth')

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    //Simple validaiton 
    if (!email || !password) {
        return res.status(400).json({ Msg: 'Please enter all fields' });
    }

    //Check for existing user 
    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rowCount == 0) return res.status(400).json({ msg: "User does not exist" });

        //Validate password
        bcrypt.compare(password, user.rows[0].password)
            .then(isMatch => {
                if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

                jwt.sign(
                    { id: user.rows[0].id },
                    config.get('jwtSecret'),
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) throw err;
                        return res.json({ token, user: user.rows[0] });
                    }
                )
            })

    } catch (err) {
        console.log("WARNING: " + err.message);
    }
})

router.get('/user', auth, async (req, res) => {
    const user = await pool.query("SELECT name, email FROM users WHERE id = $1", [req.payload.id]);
    return res.json(user.rows[0]);
});

module.exports = router;