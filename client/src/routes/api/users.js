const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const pool = require("../../../../server/db");
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');
const config = require('config');


router.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    //Simple validaiton
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    //Check for existing user 
    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rowCount >= 1) return res.status(400).json({ msg: "User already exists" });

        //create salt and hash for new user's password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) throw err;

                const newUser = await pool.query(
                    "INSERT INTO users VALUES($1, $2, $3, $4, CURRENT_DATE) RETURNING *",
                    [uuid(), name, email, hash]
                );

                jwt.sign(
                    { id: newUser.rows[0].id },
                    config.get('jwtSecret'),
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) throw err;
                        return res.json({ token, user: newUser.rows[0] });
                    }
                )
            })
        });

    } catch (err) {
        console.log("WARNING: " + err.message);
    }
})

module.exports = router;