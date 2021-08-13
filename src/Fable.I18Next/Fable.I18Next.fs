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

    let mutable currentLanguage = ""

#if FABLE_COMPILER
    let i18n : I18next = importDefault "i18next"
#else
    let translations = System.Collections.Generic.Dictionary<string,string>()
#endif

type I18n = class end
    with
        static member Translate (message:string,(?keys: obj)) =
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
            
            currentLanguage <- language

            return! i18n.init options
        }

        static member Init(fileName:string,language:string) =
            failwithf "This overload does not work on Fable"


        static member SetLanguage(newLanguage:string) = 
            failwithf "This overload does not work on Fable"            

        static member ChangeLanguage(newLanguage:string) = promise {
            try
                currentLanguage <- newLanguage
                do! i18n.changeLanguage(newLanguage)
            with
            | _ -> failwith "Error switching language"
        }       

#else
        static member Init(resources:obj,language:string) = promise {
            return! failwithf "This overload does not work on .NET"
        }

        static member Init(fileName:string,language:string) =
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

        static member ChangeLanguage(newLanguage:string) = promise {            
            return! failwithf "This overload does not work on .NET"
        }            

        static member SetLanguage(newLanguage:string) = 
            currentLanguage <- newLanguage       
#endif

        static member GetLanguage () =
            currentLanguage
