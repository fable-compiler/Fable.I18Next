module Domain

type Model = {
    CurrentPage : Router.Page
    ShowQuickView : bool
    ShowLoader : bool
}

module Model =
    let init = {
        CurrentPage = Router.defaultPage
        ShowQuickView = false
        ShowLoader = false
    }

type Languages =
    | EN
    | DE
    member this.Key =
        match this with
        | EN -> "en"
        | DE -> "de"

    member this.GetLogo =
        match this with
        | EN -> "png/flag-en.png"
        | DE -> "png/flag-de.png"

type Msg =
    | UrlChanged of Router.Page
    | ToggleLoader
    | SentToast of string
    | ChangeLanguage of Languages
    | LanguageChanged of Languages
    | Error of exn
