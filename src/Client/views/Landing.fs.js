import { Interop_reactApi } from "../.fable/Feliz.1.50.0/Interop.fs.js";
import { I18n_Translate_Z1A8FAE6B } from "../../Fable.I18Next/Fable.I18Next.fs.js";
import { createElement } from "react";
import { singleton, ofArray } from "../.fable/fable-library.3.2.10/List.js";
import { createObj } from "../.fable/fable-library.3.2.10/Util.js";
import { Helpers_combineClasses } from "../.fable/Feliz.Bulma.2.17.0/ElementBuilders.fs.js";

export function view(model, dispatch) {
    let elms, props_2, value_4;
    const props_5 = ofArray([["style", {
        overflow: "auto",
    }], ["children", Interop_reactApi.Children.toArray([(elms = singleton((props_2 = ofArray([["className", "has-background-link"], ["className", "has-text-danger"], ["children", Interop_reactApi.Children.toArray([(value_4 = I18n_Translate_Z1A8FAE6B("SectionOne"), createElement("h2", {
        children: [value_4],
    })), createElement("p", {
        children: ["Write something meaningful"],
    })])]]), createElement("div", createObj(Helpers_combineClasses("container", props_2))))), createElement("section", {
        className: "section",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    }))])]]);
    return createElement("div", createObj(Helpers_combineClasses("content", props_5)));
}

