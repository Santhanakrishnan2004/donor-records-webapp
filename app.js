const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
PORT =3000

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
const adminRoutes = require('./routes/admin');
const hospitalRoutes = require('./routes/hospital');
const authRoutes = require('./routes/auth');
app.use(authRoutes);

app.use('/admin', adminRoutes);
app.use('/hospital', hospitalRoutes);
app.get('/', (req, res) => {
    res.render('index'); // Render the welcome page
  });
  
app.listen( 3000, () => {
  console.log('Server started on port 3000');
});
