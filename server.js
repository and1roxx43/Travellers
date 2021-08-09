const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { PubSub } = require("apollo-server");
const mongoose = require("mongoose");
// const { MONGODB } = require("./config");
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

server.applyMiddleware({ app })
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
})


mongoose.connect(process.env.MONGODB || "mongodb://localhost/myFirstDatabase", { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,

}).then(() => {
    return app.listen(`${PORT}`)
}).then((res) => {
    console.log(`Server running at ${res.url}`);
    console.log(`GraphQL server lidstening on http://localhost:${PORT}${server.graphqlPath}`);
})
.catch(err => {
    console.log(err)
})