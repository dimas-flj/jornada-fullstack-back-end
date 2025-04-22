import { MongoClient } from "mongodb";
import config from "../config/config.js";

const user = config.data_base.user;
const pwd = config.data_base.pwd;
const name = config.data_base.name;
const writes = config.data_base.retry_writes;
const w = config.data_base.w;
const app_name = config.data_base.app_name;
const connect_timeout = config.data_base.connect_timeout;

const URI = `mongodb+srv://${user}:${pwd}@cluster0.zdmqd.mongodb.net/?retryWrites=${writes}&w=${w}&appName=${app_name}`;

const client = new MongoClient(URI, {
	connectTimeoutMS: connect_timeout,
});

const database = client.db(name);

export default database;
