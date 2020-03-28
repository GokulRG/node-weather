const request = require('request');

const getWeatherInformationForAGivenLatLong = (latitude, longitude, callback) => {
	const url = `https://api.darksky.net/forecast/aff8899e754ded694777c24ab2f114f8/${latitude},${longitude}?units=si`;

	request(url, { json: true }, (error, response) => {
		if (error) {
			callback({ errors: [ 'Unable to fetch weather information' ], results: null });
			return;
		}

		if (response.body.error) {
			callback({ errors: [ `${response.body.error}` ], results: null });
			return;
		}

		callback({
			results: {
				summary: response.body.daily.data[0].summary,
				temperature: response.body.currently.temperature,
				precipProbability: response.body.currently.precipProbability
			},
			errors: null
		});
	});
};

module.exports = getWeatherInformationForAGivenLatLong;
