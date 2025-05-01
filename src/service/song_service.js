import database from "../db/mongodb_connection.js";
import config from "../config/config.js";
import { ObjectId } from "mongodb";

const collection_name = config.data_base.collections[1];
const collection = database.collection(collection_name);

// host/songs/
export const getAllSongs = async () => {
	return await collection.find({}).toArray();
};

// host/songs/song/id/:id
export const getSongById = async (song_id) => {
	return await collection.findOne({ _id: ObjectId.createFromHexString(song_id) });
};

// host/songs/song/name/:name
export const getSongByName = async (song_name) => {
	return await collection.findOne({ name: song_name });
};

// host/songs/artist/name/:name
export const getOnlySongsByArtistName = async (artist_name) => {
	return await collection.find({ artist: artist_name }).toArray();
};

// host/songs/artist
export const getSongsWithArtist = async () => {
	return await collection
		.aggregate([
			{
				$lookup: {
					from: "artists",
					localField: "artist",
					foreignField: "name",
					as: "artist",
				},
			},
		])
		.toArray();
};
