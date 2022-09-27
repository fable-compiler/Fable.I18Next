module View

open Domain
open Feliz
open Feliz.Bulma
open Router

let contentPart model dispatch =
    match model.CurrentPage with
    | Landing -> Views.Landing.view model dispatch

let view (model: Model) (dispatch: Msg -> unit) =
    let render =
        Bulma.content [ prop.children [ contentPart model dispatch ] ]

    React.router [ router.onUrlChanged (parseUrl >> UrlChanged >> dispatch)
                   router.children [ render ] ]
