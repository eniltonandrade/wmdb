// module.exports = {
//   username: 'IDumiIUHT2',
//   password: 'OnU6HITsA6',
//   database: 'IDumiIUHT2',
//   host: 'remotemysql.com',
//   dialect: 'mysql',
//   port: '3306',
//   timezone: 'America/Sao_Paulo',
// };

module.exports = {
  development: {
    username: 'S0wyjmKBMc',
    password: 'yY7J3BNgHd',
    database: 'S0wyjmKBMc',
    host: 'remotemysql.com',
    dialect: 'mysql',
    port: '3306',
    timezone: 'America/Sao_Paulo',
  },
  test: {
    username: 'S0wyjmKBMc',
    password: 'yY7J3BNgHd',
    database: 'S0wyjmKBMc',
    host: 'remotemysql.com',
    dialect: 'mysql',
    port: '3306',
    timezone: 'America/Sao_Paulo',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
  },
};
