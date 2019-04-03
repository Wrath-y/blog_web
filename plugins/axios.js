/* eslint-disable */
export default function ({ $axios, redirect }) {
	$axios.onResponse(response => {
		if (response.data.status === 'success' || response.data.Message == 'Success') {
			return response.data;
		}

		return response;
	})

	$axios.onError(error => {
		if (error.response && error.response.status > 200) {
			return console.log(error.response);
		}
		return Promise.reject(error);
	})


}
