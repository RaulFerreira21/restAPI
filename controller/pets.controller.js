const Pet = require('../MODELS/pet-model');

module.exports = app =>{
    app.post('/pet', (req, res)=>{
        const pet = req.body;
        
        Pet.adicionar(pet, res);
    })
}