/* eslint-disable */
export default class {
	constructor(data) {
		this.error = data;
		for (let error of this.errors()) {
			if (error.code !== data.code) {
				continue;
			}
			if (error.message) {
				continue;
			}
			if (typeof error.method === 'function') {
				error.method();
			}
			break;
		}
	}

	errors() {
		return [
		];
	}
}
