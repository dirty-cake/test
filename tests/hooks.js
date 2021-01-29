const db = require('./utils/db')

let commands

exports.mochaHooks = {
  async beforeAll() {
    commands = await db.create()
  },
  async afterAll() {
    await commands.drop()
  }
};