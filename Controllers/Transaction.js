const Sequelize = require('sequelize');
const moment = require('moment');
const Op = Sequelize.Op;

module.exports = (model, User, Lab, io) => {
  const Model = model;

  const GET = async (req, res) => {
    const { filter, sorted } = req.body.params;
    const whereTransaction = {};
    const whereUser = {};
    const whereLab = {};

    filter.forEach((v) => {
      if (v.id.includes("user")) {
        v.id = v.id.replace('user.', '');
        whereUser[v.id] = {
          [Op.like]: `%${v.value}%`
        };
      } else if (v.id.includes("laboratory")) {
        v.id = v.id.replace('laboratory.', '');
        whereLab[v.id] = {
          [Op.like]: `%${v.value}%`
        };
      } else {
        if (v.id.includes("type")) {
            whereTransaction[v.id] = v.value;
        } else if (v.id.includes("arrived_at")) {
          whereTransaction[v.id] = v.value;
        }else {
          whereTransaction[v.id] = {
            [Op.like]: `%${v.value}%`
          };
        }
      }
    });

    try {
      const data = await Model.findAll({
        include: [{
          model: User, as: 'user',
          where: whereUser,
        }, {
          model: Lab, as: 'laboratory',
          where: whereLab,
        }],
        where: whereTransaction,
      });

      return res.status(200).send(data);
    } catch (e) {
      console.log(e);
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

          transaction.dataValues.user = user;
          transaction.dataValues.laboratory = lab;

          io.emit('FromAPI', transaction);

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
