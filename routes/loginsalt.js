const password = require('s-salt-pepper');
 
// configure once
password.iterations(75000); // optionally set number of pbkdf2 iterations
password.pepper('your random string goes here');
 
// hash a string and save returned salt and hash to (fake) user
const user = {
  password: {
    hash: null,
    salt: null
  }
};
 
async () => {
  // set the user's password to { hash: String, salt: String }
  user.password = await password.hash('foo');
 
  // ...later, verify that a given string matches the user's password data
  await password.compare('bar', user.password); // false
  await password.compare('foo', user.password); // true
}