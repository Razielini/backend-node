const bcrypt = require('bcrypt')
const auth = require('../../../auth')
const TABLA = 'auth'

module.exports = (injectedStore) => {
  let store = injectedStore

  if (!store) store = require('../../../store/dummy')

  const upsert = async (data) => {
    const authData = {
      id: data.id
    }

    if (data.username) authData.username = data.username

    if (data.password) authData.password = await bcrypt.hash(data.password, 8)

    return store.upsert(TABLA, authData)
  }

  const login = async (username, password) => {
    const data = await store.query(TABLA, { username: username })

    return await bcrypt.compare(password, data.password)
    .then(areEquals => {
      if (areEquals === true) return auth.sign(data)
    })
    .catch(err => {
      throw new Error('Información Invalida')
    })

    return data
  }

  return {
    upsert,
    login
  }
}