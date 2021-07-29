const express = require("express");
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const {MONGODB} = require("./config/connection");

const PORT = process.env.PORT || 5000;
const app = express();

const typeDefs = require("./schemas/typeDefs");
const resolvers = require("./schemas/resolvers")

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


mongoose.connect(MONGODB, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,

}).then(() => {
    return server.listen(`${PORT}`)
}).then((res) => {
    console.log(`Server running at ${res.url}`);
});