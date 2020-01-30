"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.profilesTypeDefs = apollo_server_1.gql `
  scalar Date

  type Education {
    school: String!
    degree: String!
    fieldofstudy: String!
    from: String!
    to: String!
    current: Boolean!
    description: String!
  }

  type Experience {
    title: String!
    company: String!
    location: String!
    from: Date!
    to: Date!
    current: String!
    description: String!
  }

  type Social {
    instagram: String
    facebook: String
    linkedin: String
    twitter: String
    youtube: String
  }

  type Profile {
    id: ID!
    user: User
    company: String
    website: String
    location: String
    status: String!
    skills: [String!]!
    bio: String
    githubusername: String
    experience: [Experience]!
    education: [Education]!
    social: Social!
  }

  input CreateEducationInput {
    school: String!
    degree: String!
    fieldofstudy: String!
    from: Date!
    to: Date
    current: Boolean
    description: String!
  }

  input CreateExperienceInput {
    title: String!
    company: String!
    location: String
    from: Date!
    to: Date
    current: Boolean
    description: String
  }

  input UpdateAndCreateSocialInput {
    instagram: String
    facebook: String
    linkedin: String
    twitter: String
    youtube: String
  }

  input UpdateAndCreateProfileInput {
    company: String!
    website: String!
    location: String!
    status: String!
    skills: String!
    bio: String!
    githubusername: String!
    social: UpdateAndCreateSocialInput
  }

  extend type Query {
    profile: Profile!
    profiles: [Profile]!
  }

  extend type Mutation {
    updateAndCreateProfile(input: UpdateAndCreateProfileInput!): Profile!
    createEducation(input: CreateEducationInput!): Profile!
    createExperience(input: CreateExperienceInput): Profile!
  }
`;
//# sourceMappingURL=profile.typeDefs.js.map