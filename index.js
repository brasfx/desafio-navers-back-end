import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import { naversRouter } from './routes/naversRouter.js';
import { projectsRouter } from './routes/projectsRouter.js';
import { logger } from './config/logger.js';
import { db } from './models/index.js';

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Conectado ao banco de dados');
  } catch (error) {
    logger.error(`Erro ao conectar no banco de dados! ${error}`);

    process.exit();
  }
})();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(naversRouter);
app.use(projectsRouter);

app.get('/', (_, res) => {
  res.send('Navers API em execução!');
});

app.listen(process.env.PORT || 8081, () => {
  console.log(`Servidor em execucao na porta ${process.env.PORT}`);
});
