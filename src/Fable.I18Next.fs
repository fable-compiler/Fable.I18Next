namespace Fable.I18Next

#if FABLE_COMPILER
open Fable.Core.JsInterop

type I18next =
    abstract member init : obj -> (obj -> unit) -> unit
    abstract member t : string -> obj -> string
    abstract member changeLanguage : string -> Fable.Core.JS.Promise<unit>
    abstract member getLanguage : unit -> string

#endif

[<AutoOpen>]
module Helpers =
#if FABLE_COMPILER
    let i18n : I18next = importDefault "./i18n.js"
#else
    let translations = System.Collections.Generic.Dictionary<_,_>()
    let mutable currentLanguage = "de"
#endif

type I18n = class end
    with
        static member Translate (message,(?keys: obj)) =
#if FABLE_COMPILER
            i18n.t message keys
#else
            let fullKey = currentLanguage + ".translation." + message
            match translations.TryGetValue fullKey with
            | true, v -> v
            | _ -> ""
#endif

#if FABLE_COMPILER
        static member Init(resources:obj,language:string,onAfterInit:unit -> unit) =
            let options =
                createObj [
                    "resources" ==> resources
                    "lng" ==> language
                ]
                |> unbox

            i18n.init options (fun err ->
                if not (isNull err) then
                    printfn "Error: %A" err
                onAfterInit())

        static member Init(fileName,language) =
            failwithf "This overload does not work on Fable"

#else
        static member Init(resources:obj,language:string,onAfterInit:unit -> unit) =
            failwithf "This overload does not work on .NET"

        static member Init(fileName,language) =
            currentLanguage <- language
            let rec addChildren key (currentNode:Newtonsoft.Json.Linq.JObject) =
                for child in currentNode.Properties() do
                    let currentKey = child.Name
                    let fullKey = if System.String.IsNullOrEmpty key then currentKey else key + "." + currentKey
                    let subNode = child.Value
                    if subNode.Type = Newtonsoft.Json.Linq.JTokenType.Object then
                        addChildren fullKey (subNode :?> Newtonsoft.Json.Linq.JObject)
                    else
                        let value = subNode.ToString()
                        translations.Add(fullKey, value)

            let text = System.IO.File.ReadAllText(fileName)
            let resources = Newtonsoft.Json.Linq.JObject.Parse text

            addChildren "" resources

#endif

        static member ChangeLanguage(newLanguage) = promise {
            try
#if FABLE_COMPILER
                do! i18n.changeLanguage(newLanguage)
#else
                currentLanguage <- newLanguage
#endif
            with
            | _ -> failwith "Error switching language"
        }

        static member GetLanguage () =
#if FABLE_COMPILER
            i18n.getLanguage ()
#else
            currentLanguage
#endif
