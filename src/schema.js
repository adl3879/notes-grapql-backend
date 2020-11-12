const { gql } = require("apollo-server");

const typeDefs = gql`
  type Note {
    _id: ID!
    userId: String!
    imageUrl: String
    title: String
    content: String!
    color: String
    pinned: Boolean!
    archive: Boolean
    trash: Boolean
  }

  type User {
    _id: ID!
    email: String!
    password: String!
    notes: [Note]!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
    note(id: ID!): Note
    notes: [Note]!
    archive: [Note]!
    trash: [Note]!
    user(id: ID!): User
    users: [User]!
    uploads: [File]
  }
  
  type Mutation {
    signup(email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    addNote(title: String, image: Upload!, content: String, color: String, pinned: Boolean!): Note
    updateNote(id: ID!, title: String, content: String, color: String, pinned: Boolean!): Note
    archiveNote(id: ID!): Note
    undoArchive(id: ID!): Note
    trashNote(id: ID!): Note
    undoTrash(id: ID!): Note
    deleteNote(id: ID!): Note
    imageUpload(file: Upload!): File!
  }
`;

module.exports = typeDefs;