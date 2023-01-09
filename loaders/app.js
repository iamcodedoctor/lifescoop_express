import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import errorHandler from '../utils/middlewares/errorHandler.js';
import AuthController from '../controllers/authController.js';
import authRouter from '../routes/authRoute.js';
import userRouter from '../routes/userRoute.js';

const authController = new AuthController();

// Configuratons

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// File Storage

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'public/assets');
    },
    filename: function (req, res, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

// Routes with files
app.post('/auth/register', upload.single('pitcure'), authController.register);

// Routes
app.use('/auth', authRouter);
app.use('/user', userRouter);

// Error handler middleware
app.use(errorHandler);
export default app;
