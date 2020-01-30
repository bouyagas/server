"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const auth_1 = require("../../utils/auth");
const profile_model_1 = require("./profile.model");
exports.profilesResolvers = {
    Query: {
        profile: (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = auth_1.checkAuth(context);
                const profile = yield profile_model_1.Profile.findOne({ user: user.id }).populate('user', [
                    'username',
                    'avatar',
                    'email',
                ]);
                if (!profile) {
                    throw new apollo_server_1.AuthenticationError('There is no profile for this user');
                }
                return profile;
            }
            catch (err) {
                console.error(err.message);
                throw new apollo_server_1.AuthenticationError(err.message);
            }
        }),
        profiles: (_, __, ___) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const profiles = yield profile_model_1.Profile.find({})
                    .populate('user', ['username', 'avatar', 'email'])
                    .sort({ createdA: -1 });
                return profiles;
            }
            catch (err) {
                console.error(err.message);
                throw new apollo_server_1.AuthenticationError(err.message);
            }
        }),
    },
    Mutation: {
        updateAndCreateProfile: (_, { input: { company, website, location, bio, status, githubusername, skills, youtube, facebook, twitter, instagram, linkedin, }, }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const user = auth_1.checkAuth(context);
            const profileFields = {};
            profileFields.user = user.id;
            if (company) {
                profileFields.company = company;
            }
            if (website) {
                profileFields.website = website;
            }
            if (location) {
                profileFields.location = location;
            }
            if (bio) {
                profileFields.bio = bio;
            }
            if (status) {
                profileFields.status = status;
            }
            if (githubusername) {
                profileFields.githubusername = githubusername;
            }
            if (skills) {
                profileFields.skills = skills.split(',').map((skill) => skill.trim());
            }
            profileFields.social = {};
            if (youtube) {
                profileFields.social.youtube = youtube;
            }
            if (twitter) {
                profileFields.social.twitter = twitter;
            }
            if (facebook) {
                profileFields.social.facebook = facebook;
            }
            if (linkedin) {
                profileFields.social.linkedin = linkedin;
            }
            if (instagram) {
                profileFields.social.instagram = instagram;
            }
            try {
                let profile = yield profile_model_1.Profile.findOne({ user: user.id });
                if (profile) {
                    profile = yield profile_model_1.Profile.findOneAndUpdate({ user: user.id }, { $set: profileFields }, { new: true });
                    return profile;
                }
                profile = profile_model_1.Profile.create(profileFields);
                yield profile;
            }
            catch (err) {
                console.error(err.message);
                throw new apollo_server_1.AuthenticationError(err.message);
            }
        }),
        createEducation: (_, { input: { current, degree, description, fieldofstudy, from, school, to } }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const user = auth_1.checkAuth(context);
            const newEdu = {
                current,
                degree,
                description,
                fieldofstudy,
                from,
                school,
                to,
            };
            try {
                const profile = yield profile_model_1.Profile.findOne({ user: user.id });
                profile.education.unshift(newEdu);
                const edu = yield profile.save();
                return edu;
            }
            catch (err) {
                console.error(err.message);
                throw new apollo_server_1.AuthenticationError(err.message);
            }
        }),
        createExperience: (_, { input: { company, current, description, from, location, title, to } }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const user = auth_1.checkAuth(context);
            const newExp = {
                company,
                current,
                description,
                from,
                location,
                title,
                to,
            };
            try {
                const profile = yield profile_model_1.Profile.findOne({ user: user.id });
                profile.experience.unshift(newExp);
                const exp = yield profile.save();
                return exp;
            }
            catch (err) {
                console.error(err.message);
                throw new apollo_server_1.AuthenticationError(err.message);
            }
        }),
    },
};
//# sourceMappingURL=profile.resolvers.js.map