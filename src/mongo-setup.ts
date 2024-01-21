// import mongoose, { Mongoose } from 'mongoose';
// import { DB_URI } from './config';

// export default class Mongo {
//   private mongooseInstance: Mongoose;

//   public static init() {
//     mongoose.connect(DB_URI);

//     const mongoConnection = mongoose.connection;
//     mongoConnection.on('error', console.error.bind(console, 'connection error: '));
//     mongoConnection.once('open', function () {
//       console.info('Connected successfully');
//     });

//     this.mongooseInstance = mongoose;
//   }

//   public static mongooseInstance() {
//     if (this.mongooseInstance) {
//       return this.mongooseInstance;
//     } else {
//       this.init();
//       return this.mongooseInstance;
//     }
//   }
// }
