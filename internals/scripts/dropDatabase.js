import mongoose from 'mongoose';

// Load the environment configuration.
require('dotenv-extended').config({
  path: '.env.local',
  defaults: '.env',
});

mongoose.connect(process.env.MONGODB_DATABASE, () => {
  mongoose.connection.db.dropDatabase(() => {
    console.log(`The database ${process.env.MONGODB_DATABASE} has been dropped.`);

    process.exit();
  });
});
