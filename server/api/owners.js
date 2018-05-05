const db = require('../db');
const Owner = db.model('owner');
const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    const owners = await Owner.findAll();
    res.json(owners);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
