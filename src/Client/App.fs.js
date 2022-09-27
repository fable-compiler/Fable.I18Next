import { Program_Internal_withReactBatchedUsing } from "./.fable/Fable.Elmish.React.3.0.1/react.fs.js";
import { lazyView2With } from "./.fable/Fable.Elmish.HMR.4.1.0/common.fs.js";
import { ProgramModule_map, ProgramModule_runWith, ProgramModule_mkProgram, ProgramModule_withConsoleTrace } from "./.fable/Fable.Elmish.3.1.0/program.fs.js";
import { update as update_1, init as init_1 } from "./State.fs.js";
import { view as view_1 } from "./View.fs.js";
import { Debugger_ConnectionOptions, Program_withDebuggerUsing, Debugger_showWarning, Debugger_showError } from "./.fable/Fable.Elmish.Debugger.3.3.0/debugger.fs.js";
import { empty as empty_1, cons, singleton, ofArray } from "./.fable/fable-library.3.2.10/List.js";
import { newGuid } from "./.fable/fable-library.3.2.10/Guid.js";
import { add } from "./.fable/fable-library.3.2.10/Map.js";
import { Auto_generateBoxedEncoder_Z20B7B430, uint64, int64, decimal } from "./.fable/Thoth.Json.6.0.0/Encode.fs.js";
import { fromValue, Auto_generateBoxedDecoder_79988AEF, uint64 as uint64_1, int64 as int64_1, decimal as decimal_1 } from "./.fable/Thoth.Json.6.0.0/Decode.fs.js";
import { empty } from "./.fable/Thoth.Json.6.0.0/Extra.fs.js";
import { ExtraCoders } from "./.fable/Thoth.Json.6.0.0/Types.fs.js";
import { Model$reflection } from "./Domain.fs.js";
import { uncurry } from "./.fable/fable-library.3.2.10/Util.js";
import { getCaseFields, getCaseName as getCaseName_1, isUnion } from "./.fable/fable-library.3.2.10/Reflection.js";
import { join } from "./.fable/fable-library.3.2.10/String.js";
import { Options$1 } from "./.fable/Fable.Elmish.Debugger.3.3.0/Fable.Import.RemoteDev.fs.js";
import { connectViaExtension } from "remotedev";
import * as translations from "./translations.json";
import { PromiseBuilder__Delay_62FBFDE1, PromiseBuilder__Run_212F1D4B } from "./.fable/Fable.Promise.2.2.2/Promise.fs.js";
import { promise } from "./.fable/Fable.Promise.2.2.2/PromiseImpl.fs.js";
import { I18n_Init_Z6861C5C0 } from "../Fable.I18Next/Fable.I18Next.fs.js";
import { Internal_saveState, Model$1, Msg$1, Internal_tryRestoreState } from "./.fable/Fable.Elmish.HMR.4.1.0/hmr.fs.js";
import { value as value_8 } from "./.fable/fable-library.3.2.10/Option.js";
import { Cmd_batch, Cmd_none, Cmd_map } from "./.fable/Fable.Elmish.3.1.0/cmd.fs.js";

export const program = (() => {
    let copyOfStruct, copyOfStruct_1, copyOfStruct_2, opt, makeMsgObj, fallback, inputRecord_1, inputRecord_2;
    const program_5 = Program_Internal_withReactBatchedUsing((equal, view, state, dispatch_1) => lazyView2With(equal, view, state, dispatch_1), "elmish-app", ProgramModule_withConsoleTrace(ProgramModule_mkProgram(init_1, (msg, currentModel) => update_1(msg, currentModel), (model, dispatch) => view_1(model, dispatch))));
    try {
        let patternInput;
        try {
            let coders;
            let extra_6;
            const extra_3 = new ExtraCoders((copyOfStruct = newGuid(), copyOfStruct), add("System.Decimal", [(value) => decimal(value), (path) => ((value_1) => decimal_1(path, value_1))], empty.Coders));
            extra_6 = (new ExtraCoders((copyOfStruct_1 = newGuid(), copyOfStruct_1), add("System.Int64", [(value_3) => int64(value_3), int64_1], extra_3.Coders)));
            coders = (new ExtraCoders((copyOfStruct_2 = newGuid(), copyOfStruct_2), add("System.UInt64", [(value_5) => uint64(value_5), uint64_1], extra_6.Coders)));
            const encoder_3 = Auto_generateBoxedEncoder_Z20B7B430(Model$reflection(), void 0, coders, void 0);
            const decoder_3 = Auto_generateBoxedDecoder_79988AEF(Model$reflection(), void 0, coders);
            patternInput = [(x) => {
                try {
                    return encoder_3(x);
                }
                catch (er) {
                    Debugger_showWarning(singleton(er.message));
                    return x;
                }
            }, (x_1) => {
                const matchValue = fromValue("$", uncurry(2, decoder_3), x_1);
                if (matchValue.tag === 1) {
                    throw (new Error(matchValue.fields[0]));
                }
                else {
                    return matchValue.fields[0];
                }
            }];
        }
        catch (er_2) {
            Debugger_showWarning(singleton(er_2.message));
            patternInput = [(value_7) => value_7, (_arg1) => {
                throw (new Error("Cannot inflate model"));
            }];
        }
        return Program_withDebuggerUsing(patternInput[0], patternInput[1], (opt = (new Debugger_ConnectionOptions(0)), (makeMsgObj = ((tupledArg) => ({
            type: tupledArg[0],
            msg: tupledArg[1],
        })), (fallback = (new Options$1(true, 443, "remotedev.io", true, (arg00) => {
            const x_3 = arg00;
            if (isUnion(x_3)) {
                const getCaseName = (acc_mut, x_4_mut) => {
                    getCaseName:
                    while (true) {
                        const acc = acc_mut, x_4 = x_4_mut;
                        const acc_1 = cons(getCaseName_1(x_4), acc);
                        const fields_1 = getCaseFields(x_4);
                        if ((fields_1.length === 1) ? isUnion(fields_1[0]) : false) {
                            acc_mut = acc_1;
                            x_4_mut = fields_1[0];
                            continue getCaseName;
                        }
                        else {
                            return makeMsgObj([join("/", acc_1), fields_1]);
                        }
                        break;
                    }
                };
                return getCaseName(empty_1(), x_3);
            }
            else {
                return makeMsgObj(["NOT-AN-F#-UNION", x_3]);
            }
        })), connectViaExtension((opt.tag === 1) ? ((inputRecord_1 = fallback, new Options$1(inputRecord_1.remote, opt.fields[1], opt.fields[0], false, inputRecord_1.getActionType))) : ((opt.tag === 2) ? ((inputRecord_2 = fallback, new Options$1(inputRecord_2.remote, opt.fields[1], opt.fields[0], inputRecord_2.secure, inputRecord_2.getActionType))) : (new Options$1(false, 8000, "localhost", false, fallback.getActionType))))))), program_5);
    }
    catch (ex) {
        Debugger_showError(ofArray(["Unable to connect to the monitor, continuing w/o debugger", ex.message]));
        return program_5;
    }
})();

export const resources = translations;

(function () {
    const pr = PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => (I18n_Init_Z6861C5C0(resources, "de").then((() => {
        let hmrState = null;
        const hot = module.hot;
        if (!(hot == null)) {
            window.Elmish_HMR_Count = ((window.Elmish_HMR_Count == null) ? 0 : (window.Elmish_HMR_Count + 1));
            const value = hot.accept();
            const matchValue = Internal_tryRestoreState(hot);
            if (matchValue == null) {
            }
            else {
                const previousState = value_8(matchValue);
                hmrState = previousState;
            }
        }
        const map = (tupledArg) => [tupledArg[0], Cmd_map((arg0) => (new Msg$1(0, arg0)), tupledArg[1])];
        ProgramModule_runWith(void 0, ProgramModule_map(uncurry(2, (init) => {
            if (hmrState == null) {
                return (arg_2) => {
                    const tupledArg_1 = map(init(arg_2));
                    return [new Model$1(1, tupledArg_1[0]), tupledArg_1[1]];
                };
            }
            else {
                return (_arg1_1) => [hmrState, Cmd_none()];
            }
        }), (update, msg, model_1) => {
            let patternInput;
            const patternInput_1 = map((msg.tag === 1) ? [new Model$1(0), Cmd_none()] : ((model_1.tag === 1) ? ((patternInput = update(msg.fields[0], model_1.fields[0]), [new Model$1(1, patternInput[0]), patternInput[1]])) : [model_1, Cmd_none()]));
            const newModel_1 = patternInput_1[0];
            hmrState = newModel_1;
            return [newModel_1, patternInput_1[1]];
        }, (view, model_5, dispatch_2) => {
            if (model_5.tag === 1) {
                return view(model_5.fields[0], (arg_4) => dispatch_2(new Msg$1(0, arg_4)));
            }
            else {
                throw (new Error("\nYour are using HMR and this Elmish application has been marked as inactive.\n\nYou should not see this message\n                    "));
            }
        }, (setState, model_3, dispatch) => {
            if (model_3.tag === 1) {
                setState(model_3.fields[0], (arg_3) => dispatch(new Msg$1(0, arg_3)));
            }
        }, (subscribe, model_4) => {
            if (model_4.tag === 1) {
                return Cmd_batch(ofArray([Cmd_map((arg0_2) => (new Msg$1(0, arg0_2)), subscribe(model_4.fields[0])), singleton((dispatch_1) => {
                    if (!(hot == null)) {
                        hot.dispose((data) => {
                            Internal_saveState(data, hmrState);
                            return dispatch_1(new Msg$1(1));
                        });
                    }
                })]));
            }
            else {
                return Cmd_none();
            }
        }, program));
        return Promise.resolve();
    })))));
    pr.then();
})();

