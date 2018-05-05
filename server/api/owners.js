const db = require('../db');
const Owner = db.model('owner');
const router = require('express').Router();

router.get('/api/owners', (req, res, next) => {
  try {
    const owners = Owner.findAll();
    res.json(owners);
  } catch (err) { next(err); }
});

module.exports = router;
