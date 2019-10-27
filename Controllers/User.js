module.exports = (model) => {
  const Model = model;

  const GET = async (req, res) => {
    try {
      const data = await Model.findAll();
      return res.status(200).send(data);
    } catch (e) {
      return res.status(422).send(e);
    }
  }

  const POST = async (req, res) => {
    const { matricule, name } = req.body;
    try {
      const user = await Model.create({
          matricule,
          name
      });

      return res.status(200).send(user);
    } catch (e) {
      return res.status(422).send({ m: 'No se pudo crear el Usuario, intente más tarde.'});
    }
  }

  const UPDATE = async (req, res) => {
    const { id, matricule, name } = req.body;

    try {
      const arows = await Model.update({
        matricule,
        name,
      }, {
        where: {
          id: id,
        },
      });

      return res.status(200).send({m: 'Se han actualizado ' + arows[0] + ' registro.'});
    } catch (e) {
      return res.status(422).send({ m: 'No se pudo actualizar el Usuario, intente más tarde.'});
    }
  }

  const DELETE = async (req, res) => {
    const { id } = req.body;
    try {
      const drows = await Model.destroy({
        where: {
          id: id,
        },
      });
      if (drows) {
        return res.status(200).send('Se han eliminado ' + drows + ' registros.');
      } else {
        return res.status(404).send('No hay nada que eliminar con ese ID.');
      }
    } catch (e) {
      return res.status(422).send({ m: 'No se pudo eliminar el usuario, intente más tarde.'});
    }
  }

  return {
    GET,
    POST,
    UPDATE,
    DELETE
  };
};
