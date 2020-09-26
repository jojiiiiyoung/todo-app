/* eslint-disable no-console */
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export default () => {
  const connect = async () => {
    const mongoServer = new MongoMemoryServer();

    mongoose.Promise = Promise;
    mongoServer.getUri().then((mongoUri) => {
      const mongooseOpts = {
        // options for mongoose 4.11.3 and above
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
      };

      mongoose.connect(mongoUri, mongooseOpts);
      mongoose
        .connect(mongoUri)
        .then(() => {
          return console.log(`Successfully connected to ${mongoUri}`);
        })
        .catch((error) => {
          console.log('Error connecting to database: ', error);
          return process.exit(1);
        });
    });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
