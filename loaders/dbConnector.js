import mongoose from "mongoose";

mongoose.set("strictQuery", "true");

const dbConnector = async (uri) => {
  try {
    const connect = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to mongoDb at ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default dbConnector;