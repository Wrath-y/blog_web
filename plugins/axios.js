/* eslint-disable */
import ErrorHandle from '~/api/ErrorHandle';

export default function ({ $axios, redirect }) {
	$axios.onResponse(response => {
		if (response.data.status === 'success') {
			return response.data;
		}
		if (response.data.code) {
			new ErrorHandle(response.data);
			return Promise.reject(response.data);
		}
		if (response.data.msg) {
			$ele.$message.error(response.data.msg);
			return Promise.reject(response.data);
		}
	})

	$axios.onError(error => {
		if (error.response && error.response.status > 200) {
			return httpErrorHandle({ error, redirect });
		}
		$ele.$message.error(error.message);
		return Promise.reject(error);
	})


}
