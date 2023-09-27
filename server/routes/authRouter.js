const express = require('express')
const {check, validationResult, body} = require("express-validator")

const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router();

router.post('/registration', check('email', "Error email").isEmail(), check('password', "Error password").isLength({min:3, max:50}) , async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json({message: "Введено неправильну адресу ел.пошти чи пароль", errors})
        }

        const {email, password} = req.body
        const candidate = await User.findOne({email})

        if (candidate) {
            return res.status(400).json({message: `Користувач з такою ел. адресою ${email} всже існує!`})
        }

        const hashPassword = bcrypt.hashSync(password, 7);
        const userRole = await Role.findOne({value: "USER"})

        const user = new User({email, password: hashPassword, roles: [userRole.value]})
        await user.save()
        return res.json({message: "Користувача було створено"})

    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.post('/login',check('email', "Error email").isEmail(), check('password', "Error password").isLength({min:3, max:50}), async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json({message: "Введено неправильну адресу ел.пошти чи пароль", errors})
        }

        const {email, password} = req.body
        const user = await User.findOne({email})

        if (!user) {
            return res.status(404).json({message: "Такого користувача не існує!"})
        }

        const isPassValid = bcrypt.compareSync(password, user.password);
        if (!isPassValid) {
            return res.status(400).json({message: "Невірний пароль"})
        }

        const token = jwt.sign({id: user.id, roles: user.roles}, process.env.SECRET_KEY, {expiresIn: "1h"})
        res.json({
            token,
            user:{
                id: user.id,
                email: user.email,
                roles: user.roles,
            }
        })

    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})
            const token = jwt.sign({id: user.id, roles: user.roles}, process.env.SECRET_KEY, {expiresIn: "1h"})
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    roles: user.roles,
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

module.exports = router