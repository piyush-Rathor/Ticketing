import mongoose, { Collection } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from "../app"
let mongoServer: MongoMemoryServer | null = null;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
})

beforeEach(async () => {
    const collections = await mongoose.connection.db?.collections()
    if (collections)
        for (let Collection of collections) {
            await Collection.deleteMany({})
        }
})

afterAll(async () => {
    if (mongoServer)
        await mongoServer.stop()
    await mongoose.connection.close()
})
