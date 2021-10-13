import {AnyError, Db, MongoClient} from "mongodb";

const uri = process.env.DB_URI;
const client = new MongoClient(uri);

let _db: Db;

export function connectToServer(callback: (err: AnyError) => void) {
    client.connect(function (err, db) {
        // Verify we got a good "db" object
        if (db)
        {
            _db = db.db("iogamedb");
            console.log("Successfully connected to MongoDB.");
        }
        return callback(err);
    });
}

export function getDb(): Db {
    return _db;
}