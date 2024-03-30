const express = require("express");
const router = express.Router();
const { SalEns } = require("../database")
const { body, validationResult } = require("express-validator")



router.get('/enseignants', async (request, response) => {
    const enseignants = await SalEns.findAll({ limit: 25, order: [ 'numEns' ] });
    response.json(enseignants);
});

router.get('/maxies', async (request, response) => {
    const enseignants = await SalEns.findAll({ limit: 25, order: [ 'numEns' ] });
    response.json(enseignants);
});


router.post('/edit-enseignant', [
    body("numEns").isInt().notEmpty(),
    body("nom").isString().notEmpty(),
    body("nbHeure").isFloat().notEmpty(),
    body("tauxHoraire").isFloat().notEmpty()
], async (request, response) => {
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty()) {
        return response.status(400).json({ erreurs: validationErrors.array() });
    }

    try {
        await SalEns.update({
            nom: request.body.nom,
            nbHeure: request.body.nbHeure,
            tauxHoraire: request.body.tauxHoraire
        }, {
            where: {
                numEns: request.body.numEns
            }
        });
        response.status(200).json({ message: "Enseignant modifié" });
    } catch (error) {
        return response.status(400).json({ erreurs: error })
    }
});


router.post('/add-enseignant', [
    body("nom").isString().notEmpty(),
    body("nbHeure").isFloat().notEmpty(),
    body("tauxHoraire").isFloat().notEmpty()
], async (request, response) => {
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty()) {
        return response.status(400).json({ erreurs: validationErrors.array() });
    }

    try {
        const enseignant = await SalEns.create({
            nom: request.body.nom,
            nbHeure: request.body.nbHeure,
            tauxHoraire: request.body.tauxHoraire
        });
        response.status(200).json({ message: "Enseignant " + enseignant.nom + " ajouté" });
    } catch (error) {
        return response.status(400).json({ erreurs: error })
    }
});


router.delete('/remove-enseignant', [
    body("numEns").isInt().notEmpty(),
], async (request, response) => {
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty()) {
        return response.status(400).json({ erreurs: validationErrors.array() });
    }

    try {
        await SalEns.destroy({
            where: {
                numEns: request.body.numEns
            }
        });
        response.status(200).json({ message: "Enseignant supprimé" });
    } catch (error) {
        return response.status(400).json({ erreurs: error })
    }
});

module.exports = router;