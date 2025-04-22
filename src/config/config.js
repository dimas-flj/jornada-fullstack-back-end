const config = {
	data_base: {
		retry_writes: process.env.DATA_BASE_URL_RETRYWRITES,
		w: process.env.DATA_BASE_URL_W,
		app_name: process.env.DATA_BASE_URL_APPNAME,
		name: process.env.DATA_BASE_NAME,
		user: process.env.DATA_BASE_USER,
		pwd: process.env.DATA_BASE_PWD,
		collections: [process.env.DATA_BASE_COLLECTIONS.split(",")[0], process.env.DATA_BASE_COLLECTIONS.split(",")[1]],
		connect_timeout: process.env.DATA_BASE_CONNECT_TIMEOUT, // 30 seconds timeout
	},
};

export default config;
