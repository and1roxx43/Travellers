const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect( 
    process.env.MONGODB_URI || "mongodb+srv://" + process.env.DB_PASS + "@cluster0.j5j1s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
}).
then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("Failed to connect to MongeDB", err));

module.exports = mongoose.connection;