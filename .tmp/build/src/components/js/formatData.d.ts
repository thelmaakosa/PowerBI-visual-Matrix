import { RowDetailsSettings } from "../../settings";
export declare const genSource: (rowsData: powerbi.DataViewMatrix["rows"], valueSources: powerbi.DataViewMatrix["valueSources"], rowLabelSettings: any, rowDetailsSettings: RowDetailsSettings, measureIndexes: any, rowDetailIndex: any, rowLevel: any) => {
    subData: any[];
    defaultExpandRowKeys: any[];
    rowKeys: any[];
};
export declare const genColumnFirstHeader: (columnData: powerbi.DataViewMatrixNode[], columnLevel: number, valueSources: powerbi.DataViewMatrix["valueSources"], valueTypes: powerbi.ValueTypeDescriptor[], valueSettings: any, measureIndexes: any, units: any) => any[];
export declare const genValueFirstHeader: (columnData: powerbi.DataViewMatrixNode[], columnLevel: number, valueSources: powerbi.DataViewMatrix["valueSources"], valueTypes: powerbi.ValueTypeDescriptor[], valueSettings: any, measureIndexes: any, units: any) => any[];
