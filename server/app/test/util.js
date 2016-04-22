import mongoose from 'mongoose';

beforeEach(function setUp(done) {
  function clearDb() {
    for (let i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(() => {});
    }

    return done();
  }

  return clearDb();
});
