module Router

open Feliz.Router

type Page =
    | Landing

let defaultPage = Landing

let parseUrl = function
    | [ "" ] -> Landing
    | _ -> defaultPage

let getHref = function
    | Landing-> Router.format("")
