const mysql = require('mysql')

const config = require('../config')

const dbconfig = {
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
}

let connection;

const handleCon = () => {
  connection = mysql.createConnection(dbconfig)
  connection.connect(err => {
    if (err) {
      console.error('[DB ERROR]', err)
      setTimeout(handleCon, 2000)
    } else {
      console.log('[DB Connected]')
    }
  })

  connection.on('error', err => {
    console.error('[DB ERROR]', err)
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleCon()
    } else {
      throw err
    }
  })
}

handleCon()

const list = (table) => {
  return new Promise ((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) return reject (err)
      resolve (data)
    })
  })
}

const get = (table, id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id='${id}'`, (err, data) => {
      if (err) return reject (err)
      resolve (data)
    })
  })
}

const insert = (table, data) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, data) => {
      if (err) return reject (err)
      resolve (data)
    })
  })
}

const upsert = (table, data) => {
  if (data && data.id) {
    console.log('STORE :: update :: ', table)
    console.log('STORE :: update :: ', data)
    return update(table, data)
  } else {
    console.log('STORE :: insert :: ', table)
    console.log('STORE :: insert :: ', data)
    return insert(table, data)
  }
}

const update = (table, data) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [data, data], (err, data) => {
      if (err) return reject (err)
      resolve (data)
    })
  })
}

const query = (table, query) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, res) => {
      if (err) return reject (err)
      resolve(res[0] || null)
    })
  })
}

module.exports = {
  list,
  get,
  upsert,
  query
}