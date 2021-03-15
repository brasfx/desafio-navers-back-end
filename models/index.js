import mongoose from 'mongoose';
import { NaversModel } from './NaversModel.js';
import { ProjectModel } from './ProjectModel.js';
import dotenv from 'dotenv';
dotenv.config();

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB_CONECTION;
db.navers = NaversModel;
db.project = ProjectModel;

export { db };
