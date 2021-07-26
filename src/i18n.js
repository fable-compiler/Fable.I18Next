import i18next from 'i18next';

let language = 'de';

const i18n = {
    init: (options, callback) => {
        i18next.init(options)
            .then(() => {
                i18n.changeLanguage(options.lng);
                callback();
            })
            .catch(err => callback(err));
    },

    changeLanguage: (lng) => {
        language = lng;

        return i18next.changeLanguage(lng);
    },

    getLanguage: () => language,

    t: (key, options) => i18next.t(key, options),
};

export default i18n;