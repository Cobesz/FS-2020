import express from "express";

const router = express.Router();

import db from '../db/db';

//create item
router.post('/', (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({
            success: 'false',
            message: 'title is required'
        });
    } else if (!req.body.description) {
        return res.status(400).send({
            success: 'false',
            message: 'description is required'
        });
    }
    const todo = {
        id: db.length + 1,
        title: req.body.title,
        description: req.body.description
    };

    db.push(todo);
    return res.status(201).send({
        success: 'true',
        message: 'todo added successfully',
        todo
    })
});

// get todo collection
router.get('/', (req, res) => {

    res.status(200).send({
        success: 'true',
        message: 'todos retrieved successfully',
        todos: db
    })
});

// get single item
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.map((todo) => {
        if (todo.id === id) {
            return res.status(200).send({
                success: 'true',
                message: 'todo retrieved successfully',
                todo,
            });
        }
    });
    return res.status(404).send({
        success: 'false',
        message: 'todo does not exist',
    });
});

// delete single item
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    db.map((todo, index) => {
        if (todo.id === id) {
            db.splice(index, 1);
            return res.status(200).send({
                success: 'true',
                message: 'Todo deleted successfuly',
            });
        }
    });

    return res.status(404).send({
        success: 'false',
        message: 'todo not found',
    });
});

// Update item
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    let todoFound;
    let itemIndex;
    db.map((todo, index) => {
        if (todo.id === id) {
            todoFound = todo;
            itemIndex = index;
        }
    });

    if (!todoFound) {
        return res.status(404).send({
            success: 'false',
            message: 'todo not found',
        });
    }

    if (!req.body.title) {
        return res.status(400).send({
            success: 'false',
            message: 'title is required',
        });
    } else if (!req.body.description) {
        return res.status(400).send({
            success: 'false',
            message: 'description is required',
        });
    }

    const updatedTodo = {
        id: todoFound.id,
        title: req.body.title || todoFound.title,
        description: req.body.description || todoFound.description,
    };

    db.splice(itemIndex, 1, updatedTodo);

    return res.status(201).send({
        success: 'true',
        message: 'todo added successfully',
        updatedTodo,
    });
});

module.exports = router;
