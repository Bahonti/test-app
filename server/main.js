import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ContentCollection } from '../imports/api/content';

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  if (ContentCollection.find().count() === 0) {
    ContentCollection.insert({
      content: '',
      updatedAt: new Date()
    })
  }
});
