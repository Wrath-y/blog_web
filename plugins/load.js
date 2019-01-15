import loadjs from 'loadjs';

export default (urls, key, options = {}) => {
    return new Promise((resolve, reject) => {
        if (loadjs.isDefined(key)) return resolve();
        loadjs(urls, key, {
            success: resolve,
            error: reject,
            ...options,
        });
    });
};
