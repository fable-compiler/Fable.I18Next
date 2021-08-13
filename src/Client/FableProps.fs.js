import { Fa_IconOption, Fa_i } from "./.fable/Fable.FontAwesome.2.0.0/FontAwesome.fs.js";
import { ofArray, singleton } from "./.fable/fable-library.3.2.10/List.js";

export function faIcon(icon, size) {
    return Fa_i(ofArray([icon, new Fa_IconOption(0, size), new Fa_IconOption(14, singleton(["style", {
        color: "white",
    }]))]), []);
}

