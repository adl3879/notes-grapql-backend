const express = require("express");
const { ApolloServer } = require('apollo-server-express');
const mongoose = require("mongoose");
const path = require("path");

const typeDefs = require('./schema');
const { getUser } = require("./utils");

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutations');
const User = require("./resolvers/User");

const app = express();

mongoose
  .connect(
    "mongodb+srv://adeleye:tkqln2dXSan319vM@cluster0-vm00c.mongodb.net/<dbname>?retryWrites=true&w=majority",
    { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => {
    console.log("Successfully connected to mongoDB Atlas");
  })
  .catch((_error) => {
    console.log("Unable to connect to mongoDB Atlas");
  });

const resolvers = {
  Query,
  Mutation,
  User
}

const server = new ApolloServer({ 
  typeDefs,
  resolvers,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
  context: async ({ req, connection }) => {
    if (connection) return {};

    const { headers } = req;

    let authError, userId;
    if (headers) {
      const { user, errorCode } = getUser(req);
      if (user) userId  = user.userId;
      authError = errorCode;
    }

    return { userId, authError };
  },
});

app.use('/images', express.static(path.join(__dirname, "../images")));
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
})