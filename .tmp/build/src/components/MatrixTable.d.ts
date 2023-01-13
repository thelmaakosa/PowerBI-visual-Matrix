import { FC } from "react";
import powerbi from "powerbi-visuals-api";
import { ExpandCollapseAllSettings, RowDetailsSettings } from "../settings";
interface IProps {
    matrix: powerbi.DataViewMatrix;
    valueSettings: any;
    rowLabelSettings: any;
    rowValueSettings: any;
    matrixSettings: any;
    rowDetailsSettings: RowDetailsSettings;
    columnStyleSettings: any;
    expandCollapseAllSettings: ExpandCollapseAllSettings;
    mode: any;
}
declare const MatrixTable: FC<IProps>;
export default MatrixTable;
