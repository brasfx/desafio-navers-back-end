import express from 'express';
import controller from '../controllers/projectController.js';

const app = express();

app.post('/projects/store', controller.create);
app.get('/projects/index', controller.findAll);
app.get('/projects/show/:id', controller.findOne);

export { app as projectsRouter };
