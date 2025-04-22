export const errorHandler = (err, req, res, next) => {
	console.error(err);

	// Determine the status code
	const status = err.status || 500;

	// Determine the error message
	const message = err.message || "Internal Server Error";

	// Send the error response
	res.status(status).json({
		error: {
			message: message,
			status: status,
		},
	});
};
