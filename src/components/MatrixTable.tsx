import * as React from "react";
import { useEffect } from "react";
import { Button, Table } from "antd";
import { FC, useMemo, useState } from "react";
import { genTableData } from "./js/formatData";
import { sampleMatrix } from "./sampleData";
import { formattings } from "./formattingData";
import { genSource } from "./js/formatData";
// import { sampleMatrix } from './sampleData';
import powerbi from "powerbi-visuals-api";

import { ColumnStyleSettings, ExpandCollapseAllSettings, RowDetailsSettings, RowValueSettings, RowLabelSettings, ValueSettings} from "../settings"

import * as d3 from "d3";

interface IProps {
  matrix: powerbi.DataViewMatrix;
  valueSettings: any;
  rowLabelSettings: any;
  rowValueSettings: any;
  matrixSettings: any;
  rowDetailsSettings: RowDetailsSettings;
  columnStyleSettings:any;
  expandCollapseAllSettings:ExpandCollapseAllSettings;
  mode: any;
}

const MatrixTable: FC<IProps> = (props) => {
  const sampleMatrix = props.matrix;

  const [defaultExpandRowKeys, updateDefaultExpandRowKeys] = useState(
    genSource(
      sampleMatrix.rows,
      sampleMatrix.valueSources,
      props.rowLabelSettings,
      props.rowDetailsSettings,
    ).defaultExpandRowKeys
  );

  const tableData = genTableData(
    sampleMatrix,
    props.mode,
    formattings,
    props.valueSettings,
    props.rowLabelSettings,
    props.matrixSettings,
    props.rowDetailsSettings,
    props.columnStyleSettings,
    updateDefaultExpandRowKeys,
    defaultExpandRowKeys
  );

  const [dataSource, updateDataSource] = useState(tableData.data);

  const [tableKey, updateTableKey] = useState(tableData.tableKey);

  const [columns, updateColumns] = useState(tableData.columns);

  const [hightlightRowKey, updateHightlightRowKey] = useState("");

  useEffect(() => {
    const tableData = genTableData(
      sampleMatrix,
      props.mode,
      formattings,
      props.valueSettings,
      props.rowLabelSettings,
      props.matrixSettings,
      props.rowDetailsSettings,
      props.columnStyleSettings,
      updateDefaultExpandRowKeys,
      defaultExpandRowKeys
    );
    updateDataSource(tableData.data);
    updateDefaultExpandRowKeys(tableData.defaultExpandRowKeys);
    updateTableKey(tableData.tableKey);
    updateColumns(tableData.columns);
  }, [
    props.matrix,
    props.rowLabelSettings,
    props.valueSettings,
    props.rowValueSettings,
    JSON.stringify(defaultExpandRowKeys)
  ]);

  // useEffect(() => {
  //   updateTableKey(String(Math.random()));
  //   console.log(defaultExpandRowKeys, "defaultExpandRowKeys");
  // }, );

  return (
    <Table
      key={tableKey}
      rowKey="rowKey"
      columns={columns}
      dataSource={dataSource as any[]}
      onRow={(record, index) => {
        return {
          onClick() {
            // console.log(props.rowValueSettings[record.level].enableSelection)
            if (props.rowValueSettings[record.level].enableSelection) {
              if (
                props.rowValueSettings[record.level].selectionType.indexOf(
                  "Move to Top"
                ) > -1
              ) {
                if (record.parent?.children) {
                  record.parent.children = [
                    record,
                    ...record.parent.children.filter(
                      (d) => d.rowKey != record.rowKey
                    ),
                  ];
                  updateDataSource([...dataSource]);
                } else {
                  record.parent = [
                    record,
                    ...record.parent.filter((d) => d.rowKey != record.rowKey),
                  ];
                  updateDataSource([...record.parent]);
                }
              }
              if (
                props.rowValueSettings[record.level].selectionType.indexOf(
                  "Highlight"
                ) > -1
              ) {
                if (record.rowKey == hightlightRowKey) {
                  updateHightlightRowKey("");
                } else {
                  updateHightlightRowKey(record.rowKey);
                }
              }
            }
          },
        };
      }}
      scroll={{ x: 7500, y: 500 }}
      pagination={false}
      rowClassName={(record) =>
        record.rowKey == hightlightRowKey
          ? `${record["className"]} selected`
          : record["className"]
      }
      expandable={{ defaultExpandedRowKeys: defaultExpandRowKeys }}
      // defaultExpandAllRows = {true}
    />
  );
};

export default MatrixTable;
