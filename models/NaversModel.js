import mongoose from 'mongoose';

const NaversSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  admission_date: {
    type: Date,
    required: true,
  },
  job_role: {
    type: String,
    required: true,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'projects',
    },
  ],
});
const NaversModel = mongoose.model('navers', NaversSchema, 'navers');

export { NaversModel };
