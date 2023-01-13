import powerbi from "powerbi-visuals-api";
import { ChartSettingsModel } from "../settings";
export declare const WrappedTable: (props: {
    settings: ChartSettingsModel;
    matrix: powerbi.DataViewMatrix;
}) => JSX.Element;
