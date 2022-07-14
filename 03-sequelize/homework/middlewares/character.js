const { Router } = require('express');
const { Op, Character, Role , } = require('../db');
const router = Router();

module.exports = router;

router.post('/', async (req, res) => {
    const { code, name, age, race, hp, mana, date_added } = req.body;
    if(!code || !name || !hp || !mana ) {
      return  res.status(404).send("Falta enviar datos obligatorios")
    }
    try {
      res.status(201).json(await Character.create({code, name, age, race, hp, mana, date_added}))
    } catch (error) {
       return res.status(404).send("Error en alguno de los datos provistos" )
    }
});

router.get('/',async (req, res) => {
    const { race } = req.query
    const condition = race
    ? {where: {race}}
    : {}
 res.json(await Character.findAll(condition))
});

router.get('/:code', async (req, res) => {
    const {code} = req.params
   const char = await Character.findByPk(code);
   if(char) {
    return res.json(char)
   } else {
    return res.status(404).send(`El código ${code} no corresponde a un personaje existente`)
   }

})



