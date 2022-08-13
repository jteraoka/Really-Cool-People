const db = require('../config/connection');
const { User, Answers } = require('../models');
const userSeeds = require('./userSeeds.json');
const { ROLES, VALUES, IDENTITIES } = require("../../client/src/utils/surveyChoices")

const generateRandomAnswers = async (user) => {
  const userDocument = await User.findOne({ username: user.username })

  await Answers.create({
    user: userDocument._id,
    q1: ROLES[Math.floor(Math.random() * ROLES.length)],
    q2: VALUES[Math.floor(Math.random() * VALUES.length)],
    q3: IDENTITIES[Math.floor(Math.random() * IDENTITIES.length)]
  })
}

db.once('open', async () => {
  await User.deleteMany({});
  await Answers.deleteMany({});
  await User.create(userSeeds);

  await Promise.all(userSeeds.map(user => generateRandomAnswers(user)))

  console.log('all done!');
  process.exit(0);
});
