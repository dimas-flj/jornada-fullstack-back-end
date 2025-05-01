import express from "express";
import { getAllSongs, getOnlySongsByArtistName, getSongById, getSongByName, getSongsWithArtist } from "../service/song_service.js";
import { AppError } from "../handler/error/AppError.js";

const router = express.Router();

router.get("/", async (request, response, next) => {
	response.contentType("application/json");

	try {
		response.send(await getAllSongs());
	} catch (error) {
		next(new AppError(error.message, 500));
	}
});

router.get("/song/id/:id", async (request, response, next) => {
	response.contentType("application/json");

	const { id } = request.params;
	if (id === "undefined" || id === null) {
		next(new AppError("ID from song undefined.", 400));
	}

	try {
		const result = await getSongById(id);
		if (result === null) {
			next(new AppError(`Song not found with id: [${id}]`, 200));
		} else {
			response.send(result);
		}
	} catch (error) {
		next(new AppError(error.message, 500));
	}
});

router.get("/song/name/:name", async (request, response, next) => {
	response.contentType("application/json");

	const { name } = request.params;
	if (name === "undefined" || name === null) {
		next(new AppError("Name from song undefined.", 400));
	}

	try {
		const result = await getSongByName(decodeURI(name));
		if (result === null) {
			next(new AppError(`Song not found with name: [${name}]`, 200));
		} else {
			response.send(result);
		}
	} catch (error) {
		next(new AppError(error.message, 500));
	}
});

router.get("/artist/name/:name", async (request, response, next) => {
	response.contentType("application/json");

	const { name } = request.params;
	if (name === "undefined" || name === null) {
		next(new AppError("Name from artist undefined.", 400));
	}

	try {
		const result = await getOnlySongsByArtistName(decodeURI(name));

		if (result === null) {
			next(new AppError(`Songs not found with artist name: [${name}]`, 200));
		} else {
			response.send(result);
		}
	} catch (error) {
		next(new AppError(error.message, 500));
	}
});

router.get("/artist", async (request, response, next) => {
	response.contentType("application/json");

	try {
		response.send(await getSongsWithArtist());
	} catch (error) {
		next(new AppError(error.message, 500));
	}
});

export default router;
