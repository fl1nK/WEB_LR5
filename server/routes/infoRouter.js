const express = require('express')

const User = require('../models/User')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

const router = express.Router();

router.get('/info',authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})

            return res.json({
                user: {
                    email: user.email,
                    group: user.group,
                    variant: user.variant,
                    phone: user.phone,
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

router.post('/editing',authMiddleware,
    async (req, res) => {
        try {
            const data = req.body
            console.log(req.body)
            console.log(req.user.id)
            await User.findByIdAndUpdate({_id: req.user.id},{group: `${data.group}`,variant: `${data.variant}`, phone: `${data.phone}` })

            return res.json({
                message: "Профіль змінено",
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

router.get('/delete',authMiddleware,
    async (req, res) => {
        try {
            console.log(req.user)
            await User.findByIdAndDelete(req.user.id)

            return res.json({
                message: "Профіль видалено",
            })

        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

router.get('/admin',authMiddleware, roleMiddleware(["ADMIN"]),
    async (req, res) => {
        try {
            const users = await User.find()
            return res.json(users)

        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

router.post('/updateAdmin',authMiddleware,
    async (req, res) => {
        try {
            const data = req.body
            await User.findByIdAndUpdate({_id: data.id},{group: `${data.group}`,variant: `${data.variant}`, phone: `${data.phone}` })

            return res.json({
                message: "Профіль змінено",
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

router.post('/deleteAdmin',authMiddleware,
    async (req, res) => {
        try {
            console.log(req.body)
            await User.findByIdAndDelete(req.body.id)

            return res.json({
                message: "Профіль видалено адміном",
            })

        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

module.exports = router