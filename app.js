const path = require('path');

const debug = require('debug')("wesice");
const fileUpload = require('express-fileupload');
const express = require('express');
const mongoose = require('mongoose');




const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const expressLayout = require('express-ejs-layouts');
const dotEnv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const winston = require('./config/winston');



dotEnv.config({ path: "./config/config.env" });

connectDB();
debug("Connected To Database");

require('./config/passport');

const app = express();




if (process.env.NODE_ENV === "development") {
    debug("Morgan Enabled")
    app.use(morgan("combined", { stream: winston.stream }))
}



app.use(express.static(path.join(__dirname, "public")));


app.use(expressLayout);
app.set("view engine", "ejs");
app.set("layout", "./layouts/MainLayout");
app.set("views", "views")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(fileUpload());

app.use(session({
    secret: process.env.SERIAL_SESSION,
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize())
app.use(passport.session())

app.use(flash());

app.use("/", require('./routes/blog'))
app.use("/admin", require('./routes/admin'))
app.use("/dashboard", require('./routes/dashboard'))
app.use("/users", require('./routes/users'))
app.use("/upload", require('./routes/upload'))


app.use((require('./controllers/errorsController').get404))

PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`start to ${process.env.NODE_ENV} port ${PORT}`))