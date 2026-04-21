import { MongoClient, Db } from 'mongodb';

let client: MongoClient | null = null;

export async function getDb(): Promise<Db> {
  if (!client) {
    const uri = process.env['MONGO_URI'];
    if (!uri) throw new Error('MONGO_URI environment variable is not set');
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db('Manav_Personal_Port');
}
