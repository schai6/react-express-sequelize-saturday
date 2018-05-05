const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost/puppybook')

/**
 * Define your models here, or organize them into separate modules.
 */

module.exports = db
