import { FC } from "react";
export interface IProps {
    tableKey: any;
    columns: any;
    dataSource: any;
    defaultExpandRowKeys: any;
    rowKeys: any;
    numOfLevels: any;
    headerRowHeight: any;
    rowValueSettings: any;
    numberOfColumns: any;
    visualHeight: any;
    showRowDetail: any;
}
export declare const MatrixTable: FC<IProps>;
