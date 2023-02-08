import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
export declare class Matrix implements IVisual {
    private target;
    private updateCount;
    private textNode;
    private IdBuilder;
    private formattingSettings;
    private formattingSettingsService;
    private colorPalette;
    private host;
    private selectionManager;
    private reactRoot;
    constructor(options: VisualConstructorOptions);
    update(options: VisualUpdateOptions): void;
    getFormattingModel(): powerbi.visuals.FormattingModel;
}
