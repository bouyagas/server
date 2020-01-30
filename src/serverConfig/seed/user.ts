import * as faker from 'faker';

const users = [];
for (let i = 0; i <= 100; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const word = faker.random.word();
  const num = faker.random.number();
  const newUser = {
    avatar: faker.image.avatar(),
    email: faker.internet.email(firstName, lastName),
    password: `${word}${num}`,
    username: `@${firstName}${lastName}`,
  };
  users.push(newUser);
}

console.log(JSON.stringify(users));
