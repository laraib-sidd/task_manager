const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');
const {
    sendWelcomeEmail,
    sendCancellationEmail
} = require('../emails/accounts');


const updload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            cb(new Error('Please upload a profile picture of valid type'))
        }
        cb(undefined, true)
    }

})

const router = express.Router()

// User Endpoints
// Create User
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        sendWelcomeEmail(user.name, user.email)
        const token = await user.generateAuthToken();
        res.status(201).send({
            user,
            token
        })
    } catch (e) {
        res.status(400).send(e)
    }
})

// uploading user avatar
router.post('/users/me/avatar', auth, updload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({
        width: 250,
        height: 250
    }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send('Profile Picture Uploaded')
}, (error, req, res, next) => {
    res.status(400).send({
        error: error.message
    })
})

// deleting user avatar
router.delete('/users/me/avatar', auth, async (req, res) => {
    if (!req.user.avatar) {
        return res.status(400).send('No avatar present')
    }
    req.user.avatar = undefined;
    await req.user.save()
    res.send('Profile Picture Deleted')
})

// fetching user avatar
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            console.log('e');
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)

    } catch (e) {
        res.status(404).send()
    }
})


// User login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken();
        res.send({
            user,
            token
        })
    } catch (e) {
        res.status(400).send()
    }
})

// User Logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// Get user profile
router.get('/users/me', auth, (req, res) => {
    res.send(req.user)
})

// Update user
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpatdes = ['name', 'age', 'password', 'email']
    const isAllowed = updates.every((update) => allowedUpatdes.includes(update))

    if (!isAllowed) {
        return res.status(404).send({
            error: "Inavlid property update!!"
        })
    }
    try {
        const user = req.user
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }

})

// Delete a user
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        sendCancellationEmail(req.user.name, req.user.email)
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router;