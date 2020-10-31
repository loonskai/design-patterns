import mongoose from 'mongoose';

mongoose.connect('mongodb://mongo:randomdatabase', {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
})
