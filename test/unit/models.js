const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');
const productModel = require('../../models/productModel');

describe('Models de produtos', () => {
  let connectionMock; 
  const DBServer = new MongoMemoryServer();

  before(async () => {
    const URLMock = await DBServer.getUri();

    const client = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })

    connectionMock = client.db('StoreManager');
    
    sinon.stub(mongoConnection, 'connection').resolves(connectionMock);
  });

  after(() => {
    mongoConnection.connection.restore();
  });

  describe('Cria produtos', () => {
    const expectedProduct = {
      name: 'product_name',
      quantity: 2,
    }

    // before(async () => {
    //   await connectionMock.collection('products').insertOne({ ...expectedProduct });
    // }); 

    afterEach(async () => {
      await connectionMock.collection('products').drop();
    });
    
    it('retorna um objeto', async () => {
      const response = await productModel.create(expectedProduct);
      expect(response).to.be.an('object')
    });
  });
});