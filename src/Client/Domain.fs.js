import { Union, Record } from "./.fable/fable-library.3.2.10/Types.js";
import { defaultPage, Page$reflection } from "./Router.fs.js";
import { class_type, string_type, union_type, record_type, bool_type } from "./.fable/fable-library.3.2.10/Reflection.js";

export class Model extends Record {
    constructor(CurrentPage, ShowQuickView, ShowLoader) {
        super();
        this.CurrentPage = CurrentPage;
        this.ShowQuickView = ShowQuickView;
        this.ShowLoader = ShowLoader;
    }
}

export function Model$reflection() {
    return record_type("Domain.Model", [], Model, () => [["CurrentPage", Page$reflection()], ["ShowQuickView", bool_type], ["ShowLoader", bool_type]]);
}

export const ModelModule_init = new Model(defaultPage, false, false);

export class Languages extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["EN", "DE"];
    }
}

export function Languages$reflection() {
    return union_type("Domain.Languages", [], Languages, () => [[], []]);
}

export function Languages__get_Key(this$) {
    if (this$.tag === 1) {
        return "de";
    }
    else {
        return "en";
    }
}

export function Languages__get_GetLogo(this$) {
    if (this$.tag === 1) {
        return "png/flag-de.png";
    }
    else {
        return "png/flag-en.png";
    }
}

export class Msg extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["UrlChanged", "ToggleLoader", "SentToast", "ChangeLanguage", "LanguageChanged", "Error"];
    }
}

export function Msg$reflection() {
    return union_type("Domain.Msg", [], Msg, () => [[["Item", Page$reflection()]], [], [["Item", string_type]], [["Item", Languages$reflection()]], [["Item", Languages$reflection()]], [["Item", class_type("System.Exception")]]]);
}

