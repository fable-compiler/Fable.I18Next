import { Model, Msg, Languages__get_Key, ModelModule_init } from "./Domain.fs.js";
import { Cmd_OfAsync_start, Cmd_OfAsyncWith_perform, Cmd_OfPromise_either, Cmd_none } from "./.fable/Fable.Elmish.3.1.0/cmd.fs.js";
import { singleton } from "./.fable/fable-library.3.2.10/AsyncBuilder.js";
import { sleep } from "./.fable/fable-library.3.2.10/Async.js";
import { printf, toConsole } from "./.fable/fable-library.3.2.10/String.js";
import { I18n_ChangeLanguage_Z721C83C5 } from "../Fable.I18Next/Fable.I18Next.fs.js";

export function init() {
    return [ModelModule_init, Cmd_none()];
}

function delay(msg) {
    return singleton.Delay(() => singleton.Bind(sleep(2000), () => singleton.Return(msg)));
}

export function update(msg, currentModel) {
    switch (msg.tag) {
        case 3: {
            const lang = msg.fields[0];
            toConsole(printf("lang %A"))(lang);
            return [currentModel, Cmd_OfPromise_either((arg00) => I18n_ChangeLanguage_Z721C83C5(arg00), Languages__get_Key(lang), () => (new Msg(4, lang)), (arg0) => (new Msg(5, arg0)))];
        }
        case 4: {
            toConsole(printf("changed lang to %A"))(msg.fields[0]);
            return [currentModel, Cmd_none()];
        }
        case 2: {
            return [currentModel, Cmd_none()];
        }
        case 1: {
            return [new Model(currentModel.CurrentPage, currentModel.ShowQuickView, !currentModel.ShowLoader), (!currentModel.ShowLoader) ? Cmd_OfAsyncWith_perform((x_1) => {
                Cmd_OfAsync_start(x_1);
            }, (msg_1) => delay(msg_1), new Msg(1), (x) => x) : Cmd_none()];
        }
        case 5: {
            const arg10_2 = msg.fields[0].message;
            toConsole(printf("Error: %s"))(arg10_2);
            return [currentModel, Cmd_none()];
        }
        default: {
            return [new Model(msg.fields[0], currentModel.ShowQuickView, currentModel.ShowLoader), Cmd_none()];
        }
    }
}

