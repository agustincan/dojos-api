module.exports = {
   "name": "",
   "type": "postgres",
   "url": process.env.DATABASE_URL,
   "synchronize": false,
   "logging": false,
   "entities": [
      "src/entity/**/*.ts",
      "build/entity/**/*.js"
   ],
   "migrations": [
      "src/migration/**/*.ts",
      "build/migration/**/*.js"
   ],
   "subscribers": [
      "build/subscriber/**/*.js"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   },
   seeds: ['src/seeds/**/*{.js}'],
   factories: ['src/factories/**/*{.js}'],
}