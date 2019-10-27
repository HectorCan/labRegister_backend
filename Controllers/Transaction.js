const Sequelize = require('sequelize');
const moment = require('moment');
const Op = Sequelize.Op;

module.exports = (model, User, Lab) => {
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
    const { matricule, labId } = req.body;
    const now = moment();
    const copy = now.clone();

    let type = '*';
    let user;
    // Buscamos el usuario
    try {
      user = await User.findOne({
        where: {
          matricule: matricule
        }
      });
    } catch (e) {
      return res.status(422).send({ m: 'Ocurrio un error intente más tarde' });
    }

    if (user) {
      // Buscamos el laboratorio
      let lab;
      try {
        lab = await Lab.findOne({
          where: {
            id: labId
          }
        });
      } catch (e) {
        return res.status(422).send({ m: 'Ocurrio un error intente más tarde' });
      }

      if (lab) {
        // Buscamos la última transaction
        let lastTransaction;
        try {
          lastTransaction = await Model.findOne({
            where: {
              arrived_at: {
                [Op.gte]: copy.subtract(3, 'Hours')
              },
              userId: user.id,
              laboratoryId: lab.id
            },
            order: [['arrived_at', 'DESC']]
          });
        } catch (e) {
          return res.status(422).send({ m: 'No se pudo crear la transacción' });
        }

        if (lastTransaction) {
          type = (lastTransaction.type == type ? '#' : '*');
        }
        // Registramos la transacción
        const arrived_at = now.format('YYYY-MM-DD HH:mm:ss');
        try {
          const transaction = await Model.create({
            userId: user.id,
            laboratoryId: lab.id,
            arrived_at: arrived_at,
            type: type
          });

          return res.status(200).send(transaction);
        } catch (e) {
          return res.status(422).send({ m: 'Error no se pudo crear' });
        }
      }
    }
  }

  const UPDATE = async (req, res) => {
    return res.status(422).send({ m: 'No se pueden actualizar registros de transaction.'})
  }

  const DELETE = async (req, res) => {
    return res.status(422).send({ m: 'No se pueden eliminar registros de transaction.'})
  }

  return {
    GET,
    POST,
    UPDATE,
    DELETE
  };
};
