import { db } from '../models/index.js';
import { logger } from '../config/logger.js';
import moment from 'moment';
import { ProjectModel } from '../models/ProjectModel.js';

const ModelNavers = db.navers;

//criar um novo dev
const create = async (req, res) => {
  const { name, birthdate, admission_date, job_role, projects } = req.body;

  try {
    const dev = await ModelNavers.create({
      name,
      birthdate,
      admission_date,
      job_role,
      projects,
    });

    await ProjectModel.updateOne(
      { projects: projects._id },
      { $push: { navers: [dev._id] } }
    );

    await dev.save();

    res.send(dev);

    logger.info(`POST /navers - ${JSON.stringify(dev)}`);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Ocorreu um erro ao salvar o usuário!',
    });
    logger.error(`POST /navers - ${JSON.stringify(error.message)}`);
  }
};

//buscar todos os devs
const findAll = async (_, res) => {
  const allNavers = await ModelNavers.find({});
  try {
    const filter = allNavers.map((navers) => {
      const { _id, name, birthdate, admission_date, job_role } = navers;
      const naverFiltered = {
        _id,
        name,
        birthdate: moment(birthdate).format('YYYY-MM-DD'),
        admission_date: moment(admission_date).format('YYYY-MM-DD'),
        job_role,
      };
      return naverFiltered;
    });
    res.send(filter);

    logger.info(`GET /navers/index`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os navers' });
    logger.error(`GET /navers/index - ${JSON.stringify(error.message)}`);
  }
};

//buscar um único dev pelo seu id
const findOne = async (req, res) => {
  const id = req.params.id;
  const data = await ModelNavers.find({ _id: id }).populate('projects');
  try {
    const filter = data.map((navers) => {
      const {
        _id,
        name,
        birthdate,
        admission_date,
        job_role,
        projects,
      } = navers;

      const projectsFiltered = projects.map(({ _id, name }) => {
        return {
          _id,
          name,
        };
      });

      const naverFiltered = {
        _id,
        name,
        birthdate: moment(birthdate).format('DD-MM-YYYY'),
        admission_date: moment(admission_date).format('DD-MM-YYYY'),
        job_role,
        projects: projectsFiltered,
      };
      return naverFiltered;
    });

    res.send(filter);

    logger.info(`GET /navers/show - ${id}`);
  } catch (error) {
    res.status(500).send({ message: `Erro ao buscar o usuário: ${id}` });
    logger.error(`GET /navers/show - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne };
