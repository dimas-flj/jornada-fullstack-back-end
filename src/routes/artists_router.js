import express from "express";

import { AppError } from "../handler/error/AppError.js";

const router = express.Router();

import {
	getAllArtists,
	getArtistById,
	getArtistByName,
	getArtistSongBySongId,
	getArtistsWithSongs,
	getSongsByArtistId,
	getSongsByArtistName,
} from "../service/artist_service.js";

router.get("/", async (request, response, next) => {
	response.contentType("application/json");

	try {
		response.send(await getAllArtists());
	} catch (error) {
		next(new AppError(error.message, 500));
	}
});

router.get("/artist/id/:id", async (request, response, next) => {
	response.contentType("application/json");

	const { id } = request.params;
	if (id === "undefined" || id === null) {
		next(new AppError("ID from artist undefined.", 400));
	}

	try {
		const result = await getArtistById(id);
		if (result === null) {
			next(new AppError(`Artist not found with id: [${id}]`, 200));
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
		const result = await getArtistByName(decodeURI(name));

		if (result === null) {
			next(new AppError(`Artist not found with name: [${name}]`, 200));
		} else {
			response.send(result);
		}
	} catch (error) {
		next(new AppError(error.message, 500));
	}
});

router.get("/songs/artist/id/:id", async (request, response, next) => {
	response.contentType("application/json");

	const { id } = request.params;
	if (id === "undefined" || id === null) {
		next(new AppError("ID from artist undefined.", 400));
	}

	try {
		const result = await getSongsByArtistId(id);
		if (result === null) {
			next(new AppError(`Artist not found with id: [${id}]`, 200));
		} else {
			response.send(result);
		}
	} catch (error) {
		next(new AppError(error.message, 500));
	}
});

router.get("/songs/artist/name/:name", async (request, response, next) => {
	response.contentType("application/json");

	const { name } = request.params;
	if (name === "undefined" || name === null) {
		next(new AppError("Name from artist undefined.", 400));
	}

	try {
		const result = await getSongsByArtistName(decodeURI(name));
		if (result === null) {
			next(new AppError(`Artist not found with name: [${name}]`, 200));
		} else {
			response.send(result);
		}
	} catch (error) {
		next(new AppError(error.message, 500));
	}
});

router.get("/song/artist/song/id/:id", async (request, response, next) => {
	response.contentType("application/json");

	const { id } = request.params;
	if (id === "undefined" || id === null) {
		next(new AppError("ID from song undefined.", 400));
	}

	try {
		const result = await getArtistSongBySongId(id);
		if (result === null) {
			next(new AppError(`Artist/Song not found with song id: [${id}]`, 200));
		} else {
			response.send(result);
		}
	} catch (error) {
		next(new AppError(error.message, 500));
	}
});

router.get("/songs/", async (request, response, next) => {
	response.contentType("application/json");

	try {
		const result = await getArtistsWithSongs();
		if (result === null) {
			next(new AppError("Artist/Songs not found.", 200));
		} else {
			response.send(result);
		}
	} catch (error) {
		next(new AppError(error.message, 500));
	}
});

export default router;
