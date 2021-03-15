import mongoose from 'mongoose';

const ProjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  navers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'navers',
      required: true,
    },
  ],
});
const ProjectModel = mongoose.model('projects', ProjectSchema, 'projects');

export { ProjectModel };
