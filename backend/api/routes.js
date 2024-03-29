const express = require("express");
const router = express.Router();
const { SalEns } = require("../database")

router.get('/enseignants', async (request, response) => {
    const enseignants = await SalEns.findAll();
    response.json(enseignants)
});

router.post('/edit-enseignant', async (request, response) => {
    const enseignants = await SalEns.findAll();
    response.json(enseignants)
});

router.post('/add-enseignant', async (request, response) => {
    const enseignants = await SalEns.findAll();
    response.json(enseignants)
});

router.delete('/remove-enseignant', async (request, response) => {
    const enseignants = await SalEns.findAll();
    response.json(enseignants)
});

module.exports = router;