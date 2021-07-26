namespace Fable.I18Next

open Fable.Core.JsInterop

type I18next =
    abstract member init : obj -> (obj -> unit) -> unit
    abstract member t : string -> obj -> string
    abstract member changeLanguage : string -> Fable.Core.JS.Promise<unit>
    abstract member getLanguage : unit -> string

[<AutoOpen>]
module Helpers =
    let i18n : I18next =
#if FABLE_COMPILER
        importDefault "./i18n.js"
#else
        { new I18next with
            member _.init _ _ = ()
            member _.t _ _ = ""
            member _.changeLanguage _ = promise { return () }
            member _.getLanguage () = "" }
#endif

    let initI18n resources (callback:unit -> unit) =
#if FABLE_COMPILER
        let options =
            createObj [
                "resources" ==> resources
                "lng" ==> "de"
            ]
            |> unbox

        i18n.init options (fun err ->
            if not (isNull err) then
                printfn "Error: %A" err
            callback())
#else
        // TODO: load translations.json (js > json) + i18n.init
        callback()
#endif

type I18n = class end
    with
        static member Translate (message,(?keys: obj)) =
            i18n.t message keys

        static member ChangeLanguage(newLanguage) = promise {

            try
                do! i18n.changeLanguage(newLanguage)
            with
            | _ -> failwith "Error switching language"
        }

        static member GetLanguage () =
            i18n.getLanguage ()