module.exports = (router, controller) => {

  router.get('/', controller.GET);
  router.post('/', controller.POST);
  router.put('/', controller.UPDATE);
  router.delete('/', controller.DELETE);

  return router;
}
