const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

require('dotenv').config();

const userRoutes = require("./routes/users.Routes");
const rolesRoutes = require("./routes/roles.Routes");
const jobCategory = require("./routes/jobCategory.Routes");
const hiringApplications = require("./routes/hiringApplications.Routes");
const state = require("./routes/state.Routes");
const ratingAndComments = require("./routes/ratingsAndComments.Routes");

const corsOptions = {
    origin: "*"
};


app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use("/hiringApplication", hiringApplications);
app.use("/state", state);
app.use("/ratingaAndComment", ratingAndComments);
app.use("/user", userRoutes);
app.use("/roles", rolesRoutes);
app.use("/jobCategory", jobCategory);

const port = 3000;

app.listen(port,()=>{
    console.log(`funcionando en el puerto ${port}`);
});
