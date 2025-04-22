import database from "../db/mongodb_connection.js";
import config from "../config/config.js";
import { ObjectId } from "mongodb";

const collection_name = config.data_base.collections[0];
const collection = database.collection(collection_name);

// host/artists/
export const getAllArtists = async () => {
	return await collection.find({}).toArray();
};

// host/artists/artist/id/:id
export const getArtistById = async (artist_id) => {
	return await collection.findOne({ _id: ObjectId.createFromHexString(artist_id) });
};

// host/artists/artist/name/:name
export const getArtistByName = async (artist_name) => {
	return await collection.findOne({ name: artist_name });
};

// host/artists/songs/artist/id/:id
export const getSongsByArtistId = async (artist_id) => {
	return await collection
		.aggregate([
			{
				$match: {
					_id: ObjectId.createFromHexString(artist_id),
				},
			},
			{
				$lookup: {
					from: "songs",
					localField: "name",
					foreignField: "artist",
					as: "songs",
				},
			},
			{
				$match: {
					songs: {
						$ne: [],
					},
				},
			},
		])
		.toArray();
};

// host/artists/songs/artist/name/:name
export const getSongsByArtistName = async (artist_name) => {
	return await collection
		.aggregate([
			{
				$match: {
					name: artist_name,
				},
			},
			{
				$lookup: {
					from: "songs",
					localField: "name",
					foreignField: "artist",
					as: "songs",
				},
			},
			{
				$match: {
					songs: {
						$ne: [],
					},
				},
			},
		])
		.toArray();
};

// host/artists/song/artist/song/id/:id
export const getArtistSongBySongId = async (song_id) => {
	return await collection
		.aggregate([
			{
				$lookup: {
					from: "songs",
					localField: "name",
					foreignField: "artist",
					as: "song",
				},
			},
			{
				$match: {
					song: {
						$ne: [],
					},
				},
			},
			{
				$unwind: "$song",
			},
			{
				$match: {
					"song._id": ObjectId.createFromHexString(song_id),
				},
			},
		])
		.toArray();
};
