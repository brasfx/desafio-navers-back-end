import { db } from '../models/index.js';
import { logger } from '../config/logger.js';
import moment from 'moment';
import { NaversModel } from '../models/NaversModel.js';

const ModelProjects = db.project;

//criar um projeto
const create = async (req, res) => {
  const { name, navers } = req.body;

  try {
    const devs = await ModelProjects.create({
      name,
      navers,
    });

    await NaversModel.updateOne(
      { navers: navers._id },
      { $push: { projects: [devs._id] } }
    );

    await devs.save();

    res.send(devs);

    logger.info(`POST /navers - ${JSON.stringify(devs)}`);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Ocorreu um erro ao salvar o projeto!',
    });
    logger.error(`POST /navers - ${JSON.stringify(error.message)}`);
  }
};

//buscar todos os projetos
const findAll = async (_, res) => {
  const allProjects = await ModelProjects.find({});
  try {
    const filter = allProjects.map((project) => {
      const { _id, name } = project;
      const projectFiltered = {
        _id,
        name,
      };
      return projectFiltered;
    });

    res.send(filter);

    logger.info(`GET /projects/index`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os navers' });
    logger.error(`GET /projects/index - ${JSON.stringify(error.message)}`);
  }
};

//buscar um unico projeto a partir do id
const findOne = async (req, res) => {
  const id = req.params.id;

  const data = await ModelProjects.find({ _id: id }).populate('navers');

  try {
    const filter = data.map((project) => {
      const { _id, name, navers } = project;

      const naversFiltered = navers.map(
        ({ _id, name, birthdate, admission_date, job_role }) => {
          return {
            _id,
            name,
            birthdate: moment(birthdate).format('YYYY-MM-DD'),
            admission_date: moment(admission_date).format('YYYY-MM-DD'),
            job_role,
          };
        }
      );

      const projectFiltered = {
        _id,
        name,
        navers: naversFiltered,
      };
      return projectFiltered;
    });

    res.send(filter);

    logger.info(`GET /projects/show - ${filter}`);
  } catch (error) {
    res.status(500).send({ message: `Erro ao buscar projeto de id: ${id}` });
    logger.error(`GET/projects/show - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne };
