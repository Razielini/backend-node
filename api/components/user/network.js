const express = require('express')

const secureAuth = require('./secure')
const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

const list = (req, res, next) => {
  controller.list()
    .then(lista => {
      response.success(req, res, lista, 200)
    })
    .catch(next)
}

const get = (req, res, next) => {
  controller.get(req.params.id)
    .then(user => {
      response.success(req, res, user, 200)
    })
    .catch(next)
}

const upsert = (req, res, next) => {
  controller.upsert(req.body)
    .then(user => {
      response.success(req, res, user, 201)
    })
    .catch(next)
}

const follow = (req, res, next) => {
  controller.follow(req.user.id, req.params.id)
    .then(data => {
      response.success(req, res, data, 201)
    })
    .catch(next)
}

router.get('/', list)
router.post('/follow/:id', secureAuth('follow'), follow)
router.get('/:id', get)
router.post('/', upsert)
router.put('/', secureAuth('update'), upsert)

module.exports = router