//Traversy Media tutorial routes/api/items.js

const express = require('express');
const router = express.Router();

//Item model - need this to make queries
const Item = require('../../models/Item');

// @route GET api/items
// @desc Get all items
// @access Public
router.get('/', (req, res) => {
    //res.json({name: 'abc'});
    Item.find()
    .sort({date: -1})
    .then(items => res.json(items));
});
//The -1 in the date field means sort ascending by date

// @route POST api/items
// @desc Create an item
// @access Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name //This makes use of body parser
    });

    newItem.save() 
        .then(item => res.json(item)); //save to db
});

// @route DELETE api/items/:id
// @desc Delete an item
// @access Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove())
    .then(() => res.json({success: true}))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;