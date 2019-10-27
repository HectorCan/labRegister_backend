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

  }

  const UPDATE = async (req, res) => {

  }

  const DELETE = async (req, res) => {

  }

  return {
    GET,
    POST,
    UPDATE,
    DELETE
  };
};
