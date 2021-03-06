import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import voucherRoutes from './routes/vouchers.js';
import brandRoutes from './routes/brands.js';
import userRoutes from './routes/users.js';
import adminRoutes from './routes/admins.js';
import historyRoutes from './routes/history.js'
import codeRoutes from './routes/codes.js'
import linkRoutes from './routes/links.js'
import dotenv from 'dotenv';
import path from 'path'

const app = express();
var __dirname = path.resolve();
dotenv.config();


//body parser
app.use(bodyParser.urlencoded({  limit: "30mb" ,extended: true }));
app.use(bodyParser.json({  limit: "30mb" ,extended: true }));

//user Cors
app.use(cors());

// Serve Static Access If In Production
if(process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('../client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../client/build'));
    })
  }

//All Routes
app.use('/api/vouchers', voucherRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes)
app.use('/api/histories', historyRoutes)
app.use('/api/codes', codeRoutes)
app.use('/api/links', linkRoutes)

//Database connection
const CONNECTION_URL = process.env.CONNECTION_URL_HOST;
// const CONNECTION_URL = `mongodb://localhost:27017`;

const PORT = process.env.PORT || 5000;
mongoose
    .connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() =>
        app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
    )
    .catch((err) => console.log(err.message));
mongoose.set('useFindAndModify', false);
