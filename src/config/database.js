require('dotenv').config();

module.exports = {
  "development": {
    dialect:  'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    define: {
      timestamp: true,
    },
  },
  "staging": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres",
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres",
  },
};
  