const { request } = require("express")

const db = {
  user: [
    { id: 1, name: 'Razielin333i' }
  ]
}

const list = async (tabla) => db[tabla] || []

const get = async (tabla, id) => {
  id = parseInt(id, 10)
  let col = await list(tabla)
  return col.filter(item => item.id === id)[0] || null
}

const upsert = async (tabla, data) => {
  console.log('db :: ', db)
  console.log('tabla :: ', tabla)
  console.log('data :: ', data)
  if (!db[tabla]) db[tabla] = []
  db[tabla].push(data)

  console.log('db :: ', db)
}

const remove = (tabla, id) => {
  return true
}

const query = async (tabla, q) => {
  let col = await list(tabla)
  let keys = Object.keys(q)
  let key = keys[0]

  return col.filter(item => item[key] === q[key])[0] || null
}

module.exports = {
  list,
  get,
  upsert,
  remove, 
  query
}