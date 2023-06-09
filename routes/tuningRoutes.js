const express = require('express');
const router = express.Router();
const tuningController = require('../controllers/tuningController');

router.get('/', tuningController.getTuning);

router.post('/', tuningController.postTuning);

router.put('/:id', tuningController.putTuning);

router.delete('/:id', tuningController.deleteTuning);

module.exports = router;