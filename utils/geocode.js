const request = require('request');

const getLatLongForGivenLocation = (addressString, callback) => {
	// Find Geolocation to get latitude and longitude
	const geolocationURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		addressString
	)}.json?access_token=pk.eyJ1IjoiZ29rdWxyZyIsImEiOiJjazg4djVhZGowMGVjM25wY2ZhNDV5N2x5In0.38lseRcmwoBd2hUoHiHZHA&limit=1`;

	request(geolocationURL, { json: true }, (error, response) => {
		if (error) {
			callback({ errors: [ 'Unable to fetch location information' ], results: null });
			return;
		}

		if (response.body.features.length === 0) {
			callback({ errors: [ 'Location Information Not Found' ], results: null });
			return;
		}

		callback({
			results: { placeName: response.body.features[0].place_name ,latitude: response.body.features[0].center[1], longitude: response.body.features[0].center[0] },
			errors: null
		});
	});
};

module.exports = getLatLongForGivenLocation;
