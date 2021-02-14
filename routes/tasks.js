const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Task = require('../model/task');
require('dotenv').config();


router.get('/', async (req, res) => {
    const data = await Task.find();
    res.render('index.ejs', { data: data });
});

router.post('/add', async (req, res) => {
    try{
        await new Task({ task: req.body.task }).save();
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
});


router.get('/edit/:id', async (req, res) => {
    const task = await Task.findOne({ _id: req.params.id });
    res.render('edit.ejs', { task: task });
});

router.post('/edit', async (req, res) => {
    try{
        await Task.updateOne({ _id: req.body.id }, { 
            task: req.body.task 
        });
    } catch (err) {
        console.log(err);
    }
    res.redirect('/');
});

router.get('/delete/:id', async (req, res) => {
    await Task.deleteOne({ _id: req.params.id });
    res.redirect('/');
});

module.exports = router;