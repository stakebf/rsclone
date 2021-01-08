const bcrypt = require('bcrypt');

const createHash = async password => {
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
};

module.exports = createHash;
