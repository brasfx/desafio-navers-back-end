import express from 'express';
import controller from '../controllers/naversController.js';

const app = express();

app.post('/navers/store', controller.create);
app.get('/navers/index', controller.findAll);
app.get('/navers/show/:id', controller.findOne);

export { app as naversRouter };
