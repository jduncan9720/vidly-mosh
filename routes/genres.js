const express = require('express');
const router = express.Router();
const Joi = require('joi');

const genres = [
    { id: 1, name: "Horror" },
    { id: 2, name: "Action" },
    { id: 3, name: "Drama" }
];

router.get('/', (req, res) => {
    res.send(genres)
})

router.get('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("No genre with that id")
    res.send(genre)
})

router.post('/', (req, res) => {

    const { error } = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const newGenre = {
        id: genres.length +1,
        name: req.body.name
    };
    genres.push(newGenre)
    res.send(newGenre)

})

router.put('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("No genre with that id")

    const { error } = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    genre.name = req.body.name
    res.send(genre);

})

router.delete('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("No genre with that id")

    const index = genres.indexOf(genre)
    genres.splice(index, 1)

    res.send(genre);

})

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(genre)
}

module.exports = router