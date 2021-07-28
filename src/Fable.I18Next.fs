namespace Fable.I18Next

#if FABLE_COMPILER
open Fable.Core.JsInterop

type I18next =
    abstract member init : obj -> Fable.Core.JS.Promise<unit>
    abstract member t : string -> obj -> string
    abstract member changeLanguage : string -> Fable.Core.JS.Promise<unit>
    abstract member getLanguage : unit -> string

#endif

[<AutoOpen>]
module Helpers =

    let mutable currentLanguage = "de"

#if FABLE_COMPILER
    let i18n : I18next = importDefault "i18next"
#else
    let translations = System.Collections.Generic.Dictionary<string,string>()
#endif

type I18n = class end
    with
        static member Translate (message,(?keys: obj)) =
#if FABLE_COMPILER
            i18n.t message keys
#else

            let keys =
                match keys with
                | None ->
                    Newtonsoft.Json.Linq.JObject()
                | Some keys ->
                    Newtonsoft.Json.JsonConvert.SerializeObject keys
                    |> Newtonsoft.Json.Linq.JObject.Parse

            let fullKey = currentLanguage + ".translation." + message
            match translations.TryGetValue fullKey with
            | true, v ->
                let mutable v = v
                for key in keys.Properties() do
                    v <- v.Replace("{{" + key.Name + "}}", key.Value.ToString())
                v
            | _ -> ""
#endif

#if FABLE_COMPILER
        static member Init(resources:obj,language:string) = promise {
            let options =
                createObj [
                    "resources" ==> resources
                    "lng" ==> language
                ]
                |> unbox

            return! i18n.init options
        }

        static member Init(fileName,language) =
            failwithf "This overload does not work on Fable"

#else
        static member Init(resources:obj,language:string) = promise {
            return! failwithf "This overload does not work on .NET"
        }

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
                currentLanguage <- newLanguage
#if FABLE_COMPILER
                do! i18n.changeLanguage(newLanguage)
#endif
            with
            | _ -> failwith "Error switching language"
        }

        static member GetLanguage () =
            currentLanguage
