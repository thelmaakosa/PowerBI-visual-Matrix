import { Matrix } from "../../src/visual";
import powerbiVisualsApi from "powerbi-visuals-api";
import IVisualPlugin = powerbiVisualsApi.visuals.plugins.IVisualPlugin;
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
import DialogConstructorOptions = powerbiVisualsApi.extensibility.visual.DialogConstructorOptions;
var powerbiKey: any = "powerbi";
var powerbi: any = window[powerbiKey];
var Matrix4A257870E6784C63A9AFC94E65428613: IVisualPlugin = {
    name: 'Matrix4A257870E6784C63A9AFC94E65428613',
    displayName: 'Triskele Matrix 1.0',
    class: 'Matrix',
    apiVersion: '5.1.0',
    create: (options: VisualConstructorOptions) => {
        if (Matrix) {
            return new Matrix(options);
        }
        throw 'Visual instance not found';
    },
    createModalDialog: (dialogId: string, options: DialogConstructorOptions, initialState: object) => {
        const dialogRegistry = globalThis.dialogRegistry;
        if (dialogId in dialogRegistry) {
            new dialogRegistry[dialogId](options, initialState);
        }
    },
    custom: true
};
if (typeof powerbi !== "undefined") {
    powerbi.visuals = powerbi.visuals || {};
    powerbi.visuals.plugins = powerbi.visuals.plugins || {};
    powerbi.visuals.plugins["Matrix4A257870E6784C63A9AFC94E65428613"] = Matrix4A257870E6784C63A9AFC94E65428613;
}
export default Matrix4A257870E6784C63A9AFC94E65428613;