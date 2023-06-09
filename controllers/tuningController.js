const Tuning = require('../models/tuningsModel');

const tuningController = {
    getTuning: async (req, res) => {
        try{
        const tunings =  await Tuning.find();
        res.status(200).json(tunings);
        }
        catch(error){
            console.log(`Error in get Tunings controller: ${error}`);
        }
    },
    postTuning: async (req, res) => {
        try{    
            console.log(req.body);
            const tuning = await Tuning.create({
                name: req.body.name,
                stringNumber: req.body.stringNumber,
                tunings: req.body.tunings
            });
            res.status(200).json(tuning);
        }
        catch(error){
            console.log(`Error in post Tunings controller: ${error}`);
        }
    },
    putTuning: async (req, res) => {
        // const {name, stringNumber, tunings} = req.body;
        console.log(req.body);
        console.log(req.params.id);
        try{
            const newTuning = await Tuning.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).send(newTuning);
        }
        catch(err){
            console.log(`Error in put tunings: ${err}`);
        }
    },
    deleteTuning: async (req, res) => {
        try{
            const deleteTuning = await Tuning.deleteOne({_id: req.params.id});
            res.status(200).send(deleteTuning);
        }
        catch(err){
            console.log(`Error in delete Tuning: ${err}`);
        }
    }
}

module.exports = tuningController;