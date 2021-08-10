const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { PubSub } = require("apollo-server");

const db = require("./config");
const path = require("path");

const typeDefs = require("./schemas/typeDefs");
const resolvers = require("./schemas/resolvers");

const app = express();

const pubsub = new PubSub();


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub })
});

server.applyMiddleware({ app })
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, './client/build')));
  }

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
  });

db.once("open", () => {
    app.listen(process.env.PORT, () => {
        console.log(`API server running on port ${process.env.PORT}!`);
        console.log(`Use GraphQL at http://localhost:${process.env.PORT}${server.graphqlPath}`);
    })
});
