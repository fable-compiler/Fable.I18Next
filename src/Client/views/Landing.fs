module Views.Landing

open Feliz
open Feliz.Bulma
open Domain
open FableProps
open Fable.FontAwesome
open Fable.I18Next
open Router

let view (model: Model) (dispatch: Msg -> unit) =
    let sectionOne =

        Bulma.section [ Bulma.container [ color.hasBackgroundLink
                                          color.hasTextDanger
                                          prop.children [ Html.h2 (I18n.Translate "SectionOne")
                                                          Html.p "Write something meaningful" ] ] ]

    Bulma.content [ prop.style [ style.overflow.auto ]
                    prop.children [ sectionOne ] ]
