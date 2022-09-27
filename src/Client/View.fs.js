import { view as view_1 } from "./views/Landing.fs.js";
import { Interop_reactApi } from "./.fable/Feliz.1.50.0/Interop.fs.js";
import { singleton } from "./.fable/fable-library.3.2.10/List.js";
import { createElement } from "react";
import * as react from "react";
import { createObj } from "./.fable/fable-library.3.2.10/Util.js";
import { Helpers_combineClasses } from "./.fable/Feliz.Bulma.2.17.0/ElementBuilders.fs.js";
import { RouterModule_router } from "./.fable/Feliz.Router.3.8.0/Router.fs.js";
import { parseUrl } from "./Router.fs.js";
import { Msg } from "./Domain.fs.js";

export function contentPart(model, dispatch) {
    return view_1(model, dispatch);
}

export function view(model, dispatch) {
    let render;
    const props = singleton(["children", Interop_reactApi.Children.toArray([contentPart(model, dispatch)])]);
    render = createElement("div", createObj(Helpers_combineClasses("content", props)));
    return RouterModule_router({
        onUrlChanged: (arg_1) => {
            dispatch(new Msg(0, parseUrl(arg_1)));
        },
        application: react.createElement(react.Fragment, {}, render),
    });
}

