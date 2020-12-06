const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const User = require('../models/user');

const router = express.Router()

// Task Endpoints
// Task Creation
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }

})

// Get all Task GET /tasks 
// Get task filtered task GET /tasks?progress=true
// Paginated tasks GET /tasks?limit=2&skip=0
// Sorting GET /tasks/?sortBy=createdAt_desc
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}
    if (req.query.progress) {
        match.progress = req.query.progress === 'true';
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split('_')
        sort[parts[0]] = sort.parts[1] == 'desc' ? -1 : 1
    }
    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        const tasks = req.user.tasks;
        res.send(tasks)
    } catch (e) {
        console.log(e);
        res.status(400).send(e)
    }
})

// Get task by id
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({
            _id,
            owner: req.user._id
        })
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

// Update Task
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpatdes = ['description', 'progress']
    const isAllowed = updates.every((update) => allowedUpatdes.includes(update))

    if (!isAllowed) {
        return res.status(404).send({
            error: "Invalid propert update"
        })
    }
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user._id
        })

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete a task
router.delete('/tasks', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router;