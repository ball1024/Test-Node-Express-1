const User = require('../Models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { token } = require('morgan')



exports.register = async (req, res) => {
    try {
        // code
        //1.Check User
        //console.log(req.body)
        const { name, password } = req.body
        var user = await User.findOne({ name })
        if (user) {
            return res.send('User Already Exists!!!!').status(400)
        }
        //2.Encrypt
        const salt = await bcrypt.genSalt(10)
        user = new User({
            name,
            password
        })
        user.password = await bcrypt.hash(password, salt)
        //3..Save
        await user.save()
        res.send('User Register Succes')


    } catch (err) {
        // code
        console.log(err);
        res.status(500).send('Server Error 500 Nakub')
    }
}

exports.login = async (req, res) => {
    try {
        //code
        //1.Check User
        const { name, password } = req.body
        var user = await User.findOneAndUpdate({ name }, { new: true })
        console.log(user)

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).send('Password Invalid!')
            }
            //2. Payload
            var payload = {
                user: {
                    name: user.name
                }
            }
            //3.Generate
            jwt.sign(payload, 'jwtsecret', { expiresIn: 20 }, (err, token) => {
                if (err) throw err;
                res.json({ token, payload })
            })

        } else {
            return res.status(400).send('User not Found!!')
        }


    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error 500 Naaa')
    }
}