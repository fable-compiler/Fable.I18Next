import { createAtom } from "../Client/.fable/fable-library.3.2.10/Util.js";
import i18next from "i18next";
import { class_type } from "../Client/.fable/fable-library.3.2.10/Reflection.js";
import { PromiseBuilder__Delay_62FBFDE1, PromiseBuilder__Run_212F1D4B } from "../Client/.fable/Fable.Promise.2.2.2/Promise.fs.js";
import { promise } from "../Client/.fable/Fable.Promise.2.2.2/PromiseImpl.fs.js";
import { printf, toFail } from "../Client/.fable/fable-library.3.2.10/String.js";

export let Helpers_currentLanguage = createAtom("");

export const Helpers_i18n = i18next;

export class I18n {
    constructor() {
    }
}

export function I18n$reflection() {
    return class_type("Fable.I18Next.I18n", void 0, I18n);
}

export function I18n_Translate_Z1A8FAE6B(message, keys) {
    return Helpers_i18n.t(message, keys);
}

export function I18n_Init_Z6861C5C0(resources, language) {
    return PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
        const options = {
            resources: resources,
            lng: language,
        };
        Helpers_currentLanguage(language, true);
        return Helpers_i18n.init(options);
    }));
}

export function I18n_Init_Z384F8060(fileName, language) {
    return toFail(printf("This overload does not work on Fable"));
}

export function I18n_SetLanguage_Z721C83C5(newLanguage) {
    return toFail(printf("This overload does not work on Fable"));
}

export function I18n_ChangeLanguage_Z721C83C5(newLanguage) {
    return PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => (PromiseBuilder__Delay_62FBFDE1(promise, () => {
        Helpers_currentLanguage(newLanguage, true);
        return Helpers_i18n.changeLanguage(newLanguage).then((() => (Promise.resolve(undefined))));
    }).catch(((_arg2) => {
        throw (new Error("Error switching language"));
        return Promise.resolve();
    })))));
}

export function I18n_GetLanguage() {
    return Helpers_currentLanguage();
}

