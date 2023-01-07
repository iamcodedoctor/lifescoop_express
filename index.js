import app from "./loaders/app.js"
import dbConnector from "./loaders/dbConnector.js";
import { baseConfig } from './configs/baseConfig.js'

const port = baseConfig.port || 6010;

dbConnector(baseConfig.mongoUri);
app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`)
);
