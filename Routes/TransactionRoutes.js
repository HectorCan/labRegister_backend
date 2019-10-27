const express = require('express');

module.exports = (controller) => {
  let router = express.Router();

  router.get('/', controller.GET);
  router.post('/', controller.POST);
  router.put('/', controller.UPDATE);
  router.delete('/', controller.DELETE);

  return router;
}
