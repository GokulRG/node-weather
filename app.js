const getLatLongForGivenLocation = require('./utils/geocode');
const getWeatherInformationForAGivenLatLong = require('./utils/weather');

const getTemperatureForAGivenLocation = (locationName) => {

    if (!locationName) {
        console.log('Please provide a valid location name as an argument');
        return;
    }
    
	getLatLongForGivenLocation(locationName, (response) => {
		if (response.errors != null) {
			console.log(response.errors[0]);
			return;
		}

		const { placeName, latitude, longitude } = response.results;

		getWeatherInformationForAGivenLatLong(latitude, longitude, (response) => {
			if (response.errors != null) {
				console.log(response.errors[0]);
				return;
			}

			const { summary, temperature, precipProbability } = response.results;

            console.log(placeName);
			console.log(
				summary,
				`The temperature right now is ${temperature}°C and there is ${precipProbability}% chance of rain in ${locationName}`
			);
		});
	});
};

getTemperatureForAGivenLocation(process.argv[2]);