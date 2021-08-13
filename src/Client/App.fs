module App

open Elmish
open Elmish.React
open Fable.I18Next
open Fable.Core.JsInterop

#if DEBUG
open Elmish.Debug
open Elmish.HMR
#endif


let program =
    Program.mkProgram State.init State.update View.view
#if DEBUG
    |> Program.withConsoleTrace

#endif
    |> Program.withReactBatched "elmish-app"
#if DEBUG
    |> Program.withDebugger
#endif


let resources: obj = import "*" "./translations.json"

promise {
    do! I18n.Init(resources, "de")
    Program.run program
}
|> Promise.start
