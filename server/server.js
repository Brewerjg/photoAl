const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const cookieParser = require('cookie-parser');


require('./config/mongoose.config'); 
require('dotenv').config();
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json({limit: '30mb'}));                          
app.use(express.urlencoded({limit: '30mb', extended: true }));   

require('./routes/image.routes')(app);


app.listen(port, () => console.log(`Listening on port: ${port}`) );
