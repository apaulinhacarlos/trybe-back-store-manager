const createModel = require('./create');

module.exports = (collection) => {
  return {
    create: async (document) => createModel(collection, document),
  };
};
