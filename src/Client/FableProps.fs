module FableProps

open Fable.FontAwesome
open Fable.React.Props

let faIcon icon size =
    Fa.i [ icon
           Fa.Size size
           Fa.Props [ Style [ Color "white" ] ] ] []
