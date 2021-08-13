module State

open Domain
open Elmish
open Fable.I18Next

let init () = Model.init, Cmd.none

let private delay (msg:Msg) =
    async {
        do! Async.Sleep 2000
        return msg
    }

let update (msg : Msg) (currentModel : Model) : Model * Cmd<Msg> =
    match msg with
    | UrlChanged p -> { currentModel with CurrentPage = p }, Cmd.none
    | ChangeLanguage lang ->
        printfn "lang %A" lang
        let switchLangCmd = Cmd.OfPromise.either I18n.ChangeLanguage lang.Key (fun _ -> LanguageChanged lang) Error
        currentModel, switchLangCmd
    | LanguageChanged lang ->
        printfn "changed lang to %A" lang
        currentModel, Cmd.none
    | SentToast page -> currentModel, Cmd.none
    | ToggleLoader ->
        let cmd =
            if not currentModel.ShowLoader then Cmd.OfAsync.perform delay ToggleLoader id
            else Cmd.none
        { currentModel with ShowLoader = not currentModel.ShowLoader }, cmd
    | Error exn ->
        printfn "Error: %s" exn.Message
        currentModel, Cmd.none
