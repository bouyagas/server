import { AuthenticationError } from 'apollo-server';
import { checkAuth } from '../../utils/auth';
import { Profile } from './profile.model';

export const profilesResolvers = {
  Query: {
    profile: async (_: any, __: any, context: any): Promise<any> => {
      try {
        const user: any = checkAuth(context);
        const profile: any = await Profile.findOne({ user: user.id }).populate('user', [
          'username',
          'avatar',
          'email',
        ]);
        if (!profile) {
          throw new AuthenticationError('There is no profile for this user');
        }
        return profile;
      } catch (err) {
        console.error(err.message);
        throw new AuthenticationError(err.message);
      }
    },

    profiles: async (_: any, __: any, ___: any): Promise<any> => {
      try {
        const profiles: any[] = await Profile.find({})
          .populate('user', ['username', 'avatar', 'email'])
          .sort({ createdA: -1 });
        return profiles;
      } catch (err) {
        console.error(err.message);
        throw new AuthenticationError(err.message);
      }
    },
  },

  Mutation: {
    updateAndCreateProfile: async (
      _: any,
      {
        input: {
          company,
          website,
          location,
          bio,
          status,
          githubusername,
          skills,
          youtube,
          facebook,
          twitter,
          instagram,
          linkedin,
        },
      }: any,
      context: any
    ): Promise<any> => {
      const user: any = checkAuth(context);
      const profileFields: any = {};
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
        profileFields.skills = skills.split(',').map((skill: any) => skill.trim());
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
        let profile: any = await Profile.findOne({ user: user.id });
        if (profile) {
          profile = await Profile.findOneAndUpdate(
            { user: user.id },
            { $set: profileFields },
            { new: true }
          );

          return profile;
        }
        profile = Profile.create(profileFields);
        await profile;
      } catch (err) {
        console.error(err.message);
        throw new AuthenticationError(err.message);
      }
    },

    createEducation: async (
      _: any,
      { input: { current, degree, description, fieldofstudy, from, school, to } }: any,
      context: any
    ): Promise<any> => {
      const user: any = checkAuth(context);
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
        const profile: any = await Profile.findOne({ user: user.id });
        profile.education.unshift(newEdu);
        const edu = await profile.save();
        return edu;
      } catch (err) {
        console.error(err.message);
        throw new AuthenticationError(err.message);
      }
    },

    createExperience: async (
      _: any,
      { input: { company, current, description, from, location, title, to } }: any,
      context: any
    ): Promise<any> => {
      const user: any = checkAuth(context);
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
        const profile: any = await Profile.findOne({ user: user.id });
        profile.experience.unshift(newExp);
        const exp = await profile.save();
        return exp;
      } catch (err) {
        console.error(err.message);
        throw new AuthenticationError(err.message);
      }
    },
  },
};
