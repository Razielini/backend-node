module.exports = {
  api: {
    port: process.env.API_PORT || 3000
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret'
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'remotemysql.com',
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || 'FkABqWSNX5',
    password: process.env.MYSQL_PASS || 's3faSlDk3o',
    database: process.env.MYSQL_DB || 'FkABqWSNX5'
  }
}