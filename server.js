const express = require("express");
const { ApolloServer, PubSub} = require("apollo-server");
const mongoose = require("mongoose");
const { MONGODB } = require("./config");
// const { PORT } = require("./config");
const path = require("path");

const typeDefs = require("./schemas/typeDefs");
const resolvers = require("./schemas/resolvers");

const app = express();

const pubsub = new PubSub();

const PORT = process.env.PORT || 8008;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub })
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
})


mongoose.connect(MONGODB, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,

}).then(() => {
    return server.listen(`${PORT}`)
}).then((res) => {
    console.log(`Server running at ${res.url}`);
    console.log(`GraphQL server lidstening on http://localhost:${PORT}${server.graphqlPath}`);
})
.catch(err => {
    console.log(err)
})