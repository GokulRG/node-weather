const getLatLongForGivenLocation = require('./utils/geocode');
const getWeatherInformationForAGivenLatLong = require('./utils/weather');

const getTemperatureForAGivenLocation = (locationName) => {

    if (!locationName) {
        console.log('Please provide a valid location name as an argument');
        return;
    }

	getLatLongForGivenLocation(locationName, ({error:latLongErrors, results:latLongResults}) => {
		if (latLongErrors != null) {
			console.log(latLongErrors[0]);
			return;
		}

		const { placeName, latitude, longitude } = latLongResults;

		getWeatherInformationForAGivenLatLong(latitude, longitude, ({error:weatherErrors, results:weatherResults}) => {
			if (weatherErrors != null) {
				console.log(weatherErrors[0]);
				return;
			}

			const { summary, temperature, precipProbability } = weatherResults;

            console.log(placeName);
			console.log(
				summary,
				`The temperature right now is ${temperature}°C and there is ${precipProbability}% chance of rain in ${locationName}`
			);
		});
	});
};

getTemperatureForAGivenLocation(process.argv[2]);