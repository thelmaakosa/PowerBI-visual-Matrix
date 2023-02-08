/*
 *  Power BI Visual CLI
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */
"use strict";

import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import DataView = powerbi.DataView;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import { dataRoleHelper } from "powerbi-visuals-utils-dataviewutils";
import Fill = powerbi.Fill;
import ISandboxExtendedColorPalette = powerbi.extensibility.ISandboxExtendedColorPalette;

import * as d3 from "d3";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { ChartSettingsModel, RowValueSettings } from "./settings";
import { getMatrixNodeObjectValue } from "./objectEnumerationUtility";
import { ReactVisual, initialState } from "./ReactVisual";
import {
  genColumnFirstHeader,
  genValueFirstHeader,
  genSource,
} from "./components/js/formatData";
import { genStyledDiv } from "./components/StyledDiv";
import { parseSettings } from "./components/js/styleUtils";

export class Matrix implements IVisual {
  private target: HTMLElement;
  private updateCount: number;
  private textNode: Text;
  private IdBuilder: powerbi.visuals.ISelectionIdBuilder;
  private formattingSettings: ChartSettingsModel;
  private formattingSettingsService: FormattingSettingsService;
  private colorPalette: ISandboxExtendedColorPalette;
  private host: powerbi.extensibility.visual.IVisualHost;
  private selectionManager: powerbi.extensibility.ISelectionManager;
  private reactRoot: React.ComponentElement<any, any>;

  constructor(options: VisualConstructorOptions) {
    console.log("Visual constructor", options);
    this.target = options.element;
    // this.IdBuilder = options.host.createSelectionIdBuilder();
    const localizationManager = options.host.createLocalizationManager();
    this.formattingSettingsService = new FormattingSettingsService(
      localizationManager
    );
    this.reactRoot = React.createElement(ReactVisual, initialState);
    ReactDOM.render(this.reactRoot, this.target);
  }

  public update(options: VisualUpdateOptions) {
    console.log("Visual update", options);
    this.formattingSettings =
      this.formattingSettingsService.populateFormattingSettingsModel(
        ChartSettingsModel,
        options.dataViews
      );
    if (
      dataRoleHelper.hasRoleInDataView(options.dataViews[0], "category") &&
      dataRoleHelper.hasRoleInDataView(options.dataViews[0], "measure")
    ) {
      const rowLabelSettings = parseSettings(
        this.formattingSettings.rowLabelSettings
      );
      const columnSettings = parseSettings(
        this.formattingSettings.columnStyleSettings
      );
      const rowValueSettings = parseSettings(
        this.formattingSettings.rowValueSettings
      );
      const valueSettings = parseSettings(
        this.formattingSettings.valueSettings
      );

      const unitSettings = parseSettings(
        this.formattingSettings.unitsSettings
      );

      const columnStyleSettings = this.formattingSettings.columnStyleSettings;
      const expandCollapseAllSettings =
        this.formattingSettings.expandCollapseAllSettings;
      const rowDetailsSettings = this.formattingSettings.rowDetailsSettings;

      const StyledDiv = genStyledDiv(
        this.formattingSettings.valueSettings.headerRowHeight.value,
        this.formattingSettings.valueSettings.headerRowPadding.value,
        expandCollapseAllSettings,
        columnSettings,
        valueSettings,
        rowLabelSettings,
        rowValueSettings,
        rowDetailsSettings,
        unitSettings,
      );

      const valueIndex = options.dataViews[0].matrix.valueSources.map(
        (d, i) => ({
          index: i,
          isMeasure: d.roles["measure"] && true,
          isUnit: d.roles["units"] && true,
          isRowDetails: d.roles["rowDetails"] && true,
        })
      );

      const measureIndexes = valueIndex
        .filter((d) => d.isMeasure)
        .map((d) => d.index);

      const rowDetailIndex =
        valueIndex.filter((d) => d.isRowDetails)[0]?.index || null;

      const unitIndexes = dataRoleHelper.hasRoleInDataView(
        options.dataViews[0],
        "units"
      )
        ? valueIndex.filter((d) => d.isUnit).map((d) => d.index)
        : null;

      const topLevelValues = Object.values(
        options.dataViews[0].matrix.rows.root.children.filter(
          (d) => d.isSubtotal
        )[0].values
      );

      const units = measureIndexes.map((d, i) =>
        unitIndexes
          ? d <= unitIndexes.length - 1
            ? {
                index: i,
                unit: topLevelValues.filter(
                  (v) => v.valueSourceIndex == unitIndexes[i] && v.value
                )[0]?.value,
              }
            : { index: 1, unit: "" }
          : { index: 1, unit: "" }
      );
      // unitIndexes?unitIndexes.map((d,i)=>({index:i, unit:topLevelValues.filter(v=>(v.valueSourceIndex==d) && (v.value))[0]?.value})):null

      const dataSource = genSource(
        options.dataViews[0].matrix.rows,
        options.dataViews[0].matrix.valueSources,
        rowLabelSettings,
        this.formattingSettings.rowDetailsSettings,
        measureIndexes,
        rowDetailIndex,
        options.dataViews[0].matrix.rows.levels.length - 1
      );
      let columns;
      if (!this.formattingSettings.rowValueSettings.groupsBeforeValue.value) {
        columns = genValueFirstHeader(
          options.dataViews[0].matrix.columns.root.children,
          options.dataViews[0].matrix.columns.levels.length - 1,
          options.dataViews[0].matrix.valueSources,
          options.dataViews[0].matrix.valueSources.map((d) => d.type),
          valueSettings,
          measureIndexes,
          units
        );
      } else {
        columns = genColumnFirstHeader(
          options.dataViews[0].matrix.columns.root.children,
          options.dataViews[0].matrix.columns.levels.length - 1,
          options.dataViews[0].matrix.valueSources,
          options.dataViews[0].matrix.valueSources.map((d) => d.type),
          valueSettings,
          measureIndexes,
          units
        );
      }
      const numberOfColumns = Object.values(
        options.dataViews[0].matrix.rows.root.children.filter(
          (d) => d.isSubtotal
        )[0]?.values
      ).filter(
        (d) => measureIndexes.indexOf(d.valueSourceIndex || 0) > -1
      ).length;

      ReactVisual.update({
        tableKey: `${Math.round(Math.random() * 1000)}`,
        columns: columns,
        dataSource: dataSource.subData,
        defaultExpandRowKeys: dataSource.defaultExpandRowKeys,
        rowKeys: dataSource.rowKeys,
        numOfLevels: options.dataViews[0].matrix.columns.levels.length,
        headerRowHeight:
          this.formattingSettings.valueSettings.headerRowHeight.value +
          2 * this.formattingSettings.valueSettings.headerRowPadding.value,
        rowValueSettings: rowValueSettings,
        numberOfColumns: numberOfColumns,
        visualHeight: options.viewport.height,
        StyledDiv: StyledDiv,
        showRowDetail: this.formattingSettings.rowDetailsSettings.show.value,
      });
    } else {
      ReactVisual.update(initialState);
    }
  }

  public getFormattingModel(): powerbi.visuals.FormattingModel {
    /**
     * Only show the selected level
     */

    // Column Label
    // const selectedIndex =
    //   this.formattingSettings.cards[2].slices[0]["value"]["value"];

    // this.formattingSettings.cards[2].slices =
    //   this.formattingSettings.cards[2].slices.filter(
    //     (d) =>
    //       d["name"] == "columnLevel" ||
    //       d["name"] == "headerRowHeight" ||
    //       d["name"] == "headerRowPadding" ||
    //       d["name"].indexOf(`_${selectedIndex}`) > -1
    //   );

    // Row Label
    const selectedRowLabelIndex =
      this.formattingSettings.rowLabelSettings.slices[0]["value"]["value"];

    this.formattingSettings.rowLabelSettings.slices =
      this.formattingSettings.rowLabelSettings.slices.filter(
        (d) =>
          d["name"] == "rowLevel" ||
          d["name"].indexOf(`_${selectedRowLabelIndex}`) > -1
      );

    // Row Value
    const selectedRowValueIndex =
      this.formattingSettings.rowValueSettings.slices[1]["value"]["value"];

    this.formattingSettings.rowValueSettings.slices =
      this.formattingSettings.rowValueSettings.slices.filter(
        (d) =>
          d["name"] == "rowLevel" ||
          d["name"] == "groupsBeforeValue" ||
          d["name"].indexOf(`_${selectedRowValueIndex}`) > -1
      );

    // Value
    const selectedValueIndex =
      this.formattingSettings.valueSettings.slices[2]["value"]["value"];

    this.formattingSettings.valueSettings.slices =
      this.formattingSettings.valueSettings.slices.filter(
        (d) =>
          d["name"] == "valueIndex" ||
          d["name"] == "headerRowHeight" ||
          d["name"] == "headerRowPadding" ||
          d["name"].indexOf(`_${selectedValueIndex}`) > -1
      );

    // Units
    const selectedUnitsIndex =
      this.formattingSettings.unitsSettings.slices[0]["value"]["value"];

    this.formattingSettings.unitsSettings.slices =
      this.formattingSettings.unitsSettings.slices.filter(
        (d) =>
          d["name"] == "valueIndex" ||
          d["name"].indexOf(`_${selectedValueIndex}`) > -1
      );

    let formattingModel = this.formattingSettingsService.buildFormattingModel(
      this.formattingSettings
    );
    /**
     * Add Group
     */

    // Column Label
    // console.log(formattingModel,"formattingModel")
    // const columnStyleSlices = (
    //   (formattingModel.cards[2] as powerbi.visuals.FormattingCard)
    //     .groups[0] as powerbi.visuals.FormattingGroup
    // ).slices;

    // (formattingModel.cards[2] as powerbi.visuals.FormattingCard).groups = [
    //   {
    //     displayName: "Column",
    //     slices: columnStyleSlices.filter(
    //       (d) =>
    //         (d as powerbi.visuals.FormattingSlice).uid ==
    //           "columnStyle-columnLevel" ||
    //         (d as powerbi.visuals.FormattingSlice).uid ==
    //           "columnStyle-headerRowHeight" ||
    //         (d as powerbi.visuals.FormattingSlice).uid ==
    //           "columnStyle-headerRowPadding"
    //     ),
    //     uid: "columnStyle-group-columnLevel",
    //   },
    //   {
    //     displayName: "Fill",
    //     slices: columnStyleSlices.filter(
    //       (d) => (d as powerbi.visuals.FormattingSlice).uid.indexOf("fill") > -1
    //     ),
    //     uid: "columnStyle-group-fill",
    //   },
    //   {
    //     displayName: "Outline",
    //     slices: columnStyleSlices.filter(
    //       (d) =>
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("outline") > -1
    //     ),
    //     uid: "columnStyle-group-outline",
    //   },
    //   {
    //     displayName: "Font",
    //     slices: columnStyleSlices.filter(
    //       (d) =>
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("font") > -1 ||
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("wordWrap") >
    //           -1 ||
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("position") >
    //           -1 ||
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf(
    //           "stepIndentation"
    //         ) > -1
    //     ),
    //     uid: "columnStyle-group-font",
    //   },
    // ];

    // // Row Label
    // const rowLabelStyleSlices = (
    //   (formattingModel.cards[0] as powerbi.visuals.FormattingCard)
    //     .groups[0] as powerbi.visuals.FormattingGroup
    // ).slices;

    // (formattingModel.cards[0] as powerbi.visuals.FormattingCard).groups = [
    //   {
    //     displayName: "Row Level",
    //     slices: rowLabelStyleSlices.filter(
    //       (d) =>
    //         (d as powerbi.visuals.FormattingSlice).uid ==
    //         "rowLabelStyle-rowLevel"
    //     ),
    //     uid: "rowLabelStyle-group-rowLevel",
    //   },
    //   {
    //     displayName: "Layout",
    //     slices: rowLabelStyleSlices.filter(
    //       (d) =>
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("rowHeight") >
    //           -1 ||
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("rowPadding") >
    //           -1
    //     ),
    //     uid: "rowLabelStyle-group-layout",
    //   },
    //   {
    //     displayName: "Highlight",
    //     slices: rowLabelStyleSlices.filter(
    //       (d) =>
    //         // (d as powerbi.visuals.FormattingSlice).uid.indexOf("highlightType") > -1 ||
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("fillColor") >
    //           -1 ||
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("fillOpacity") >
    //           -1 ||
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("bandedFill") >
    //           -1 ||
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf(
    //           "bandedFillColor"
    //         ) > -1 ||
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf(
    //           "bandedFillOpacity"
    //         ) > -1
    //     ),
    //     uid: "rowLabelStyle-group-highlight",
    //   },
    //   {
    //     displayName: "Outline",
    //     slices: rowLabelStyleSlices.filter(
    //       (d) =>
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("outline") > -1
    //     ),
    //     uid: "rowLabelStyle-group-outline",
    //   },
    //   {
    //     displayName: "Font",
    //     slices: rowLabelStyleSlices.filter(
    //       (d) =>
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("font") > -1 ||
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("wordWrap") >
    //           -1 ||
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("position") >
    //           -1 ||
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf(
    //           "stepIndentation"
    //         ) > -1
    //     ),
    //     uid: "rowLabelStyle-group-font",
    //   },
    //   {
    //     displayName: "Expand/Collapse",
    //     // topLevelToggle:rowLabelStyleSlices.filter(
    //     //     (d) =>
    //     //       (d as powerbi.visuals.FormattingSlice).uid.indexOf("showExpand") > -1
    //     //   )[0] as powerbi.visuals.EnabledSlice,
    //     slices: rowLabelStyleSlices.filter(
    //       (d) =>
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("expand") > -1 ||
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("showExpand") >
    //           -1
    //     ),
    //     uid: "rowLabelStyle-group-expandCollapse",
    //   },
    // ];

    // // Row Value
    // const rowValueStyleSlices = (
    //   (formattingModel.cards[3] as powerbi.visuals.FormattingCard)
    //     .groups[0] as powerbi.visuals.FormattingGroup
    // ).slices;

    // (formattingModel.cards[3] as powerbi.visuals.FormattingCard).groups = [
    //   {
    //     displayName: "Row Level",
    //     slices: rowValueStyleSlices.filter(
    //       (d) =>
    //         (d as powerbi.visuals.FormattingSlice).uid ==
    //           "rowValueStyle-rowLevel" ||
    //         (d as powerbi.visuals.FormattingSlice).uid ==
    //           "rowValueStyle-groupsBeforeValue"
    //     ),
    //     uid: "rowValueStyle-group-rowLevel",
    //   },
    //   {
    //     displayName: "Highlight",
    //     slices: rowValueStyleSlices.filter(
    //       (d) =>
    //         // (d as powerbi.visuals.FormattingSlice).uid.indexOf("highlightType") > -1 ||
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("fillColor") >
    //           -1 ||
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("fillOpacity") >
    //           -1 ||
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("bandedFill") >
    //           -1 ||
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf(
    //           "bandedFillColor"
    //         ) > -1 ||
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf(
    //           "bandedFillOpacity"
    //         ) > -1
    //     ),
    //     uid: "rowValueStyle-group-highlight",
    //   },
    //   {
    //     displayName: "Outline",
    //     slices: rowValueStyleSlices.filter(
    //       (d) =>
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("outline") > -1
    //     ),
    //     uid: "rowValueStyle-group-outline",
    //   },
    //   {
    //     displayName: "Font",
    //     slices: rowValueStyleSlices.filter(
    //       (d) =>
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("font") > -1 ||
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("wordWrap") >
    //           -1 ||
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("position") >
    //           -1 ||
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf(
    //           "stepIndentation"
    //         ) > -1
    //     ),
    //     uid: "rowValueStyle-group-font",
    //   },
    //   {
    //     displayName: "Selection",
    //     topLevelToggle: rowValueStyleSlices.filter(
    //       (d) =>
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf(
    //           "enableSelection"
    //         ) > -1
    //     )[0] as powerbi.visuals.EnabledSlice,
    //     slices: rowValueStyleSlices.filter(
    //       (d) =>
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("select") > -1
    //     ),
    //     uid: "rowValueStyle-group-selection",
    //   },
    // ];

    // // Values
    // const valueStyleSlices = (
    //   (formattingModel.cards[4] as powerbi.visuals.FormattingCard)
    //     .groups[0] as powerbi.visuals.FormattingGroup
    // ).slices;

    // (formattingModel.cards[4] as powerbi.visuals.FormattingCard).groups = [
    //   {
    //     displayName: "Value Index",
    //     slices: valueStyleSlices.filter(
    //       (d) =>
    //         (d as powerbi.visuals.FormattingSlice).uid ==
    //         "valueStyle-valueIndex"||
    //         (d as powerbi.visuals.FormattingSlice).uid ==
    //           "valueStyle-headerRowHeight"||
    //           (d as powerbi.visuals.FormattingSlice).uid ==
    //             "valueStyle-headerRowPadding"
    //     ),
    //     uid: "valueStyle-group-valueIndex",
    //   },
    //   {
    //     displayName: "Units",
    //     topLevelToggle: valueStyleSlices.filter(
    //       (d) =>
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("showUnits") > -1
    //     )[0] as powerbi.visuals.EnabledSlice,
    //     slices: valueStyleSlices.filter(
    //       (d) =>
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("units") > -1
    //     ),
    //     uid: "valueStyle-group-units",
    //   },
    //   {
    //     displayName: "Fill",
    //     slices: valueStyleSlices.filter(
    //       (d) =>
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("fillColor") >
    //           -1 ||
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("fillOpacity") >
    //           -1
    //     ),
    //     uid: "valueStyle-group-fill",
    //   },
    //   {
    //     displayName: "Outline",
    //     slices: valueStyleSlices.filter(
    //       (d) =>
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("outline") > -1
    //     ),
    //     uid: "valueStyle-group-outline",
    //   },
    //   {
    //     displayName: "Font",
    //     slices: valueStyleSlices.filter(
    //       (d) =>
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("font") > -1 ||
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("wordWrap") >
    //           -1 ||
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("position") >
    //           -1 ||
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf(
    //           "stepIndentation"
    //         ) > -1
    //     ),
    //     uid: "valueStyle-group-font",
    //   },
    //   {
    //     displayName: "Sort Icon",
    //     topLevelToggle: valueStyleSlices.filter(
    //       (d) =>
    //         (d as powerbi.visuals.FormattingSlice).uid.indexOf("showSortIcon") >
    //         -1
    //     )[0] as powerbi.visuals.EnabledSlice,
    //     slices: valueStyleSlices.filter(
    //       (d) => (d as powerbi.visuals.FormattingSlice).uid.indexOf("icon") > -1
    //     ),
    //     uid: "valueStyle-group-sortIcon",
    //   },
    // ];

    return formattingModel;
  }
}

// function visualTransform(
//   options: VisualUpdateOptions,
//   host: powerbi.extensibility.visual.IVisualHost
// ): any {
//   let dataViews = options.dataViews[0];
//   var rows = dataViews.matrix.rows;
//   var columns = dataViews.matrix.columns;
//   let listSelectionId: any[] = [];
//   // var selectionIdBuilder = host.createSelectionIdBuilder();
//   let values = dataViews.matrix.valueSources[0].queryName;

//   rows.root.children.forEach((x) => {
//     listSelectionId.push({
//       value: x.value,
//       selectionId: host
//         .createSelectionIdBuilder()
//         .withMatrixNode(x, rows.levels)
//         .withMeasure(values)
//         .createSelectionId(),
//       object: x.objects,
//     });

//     if (x.children)
//       x.children.forEach((z) => {
//         listSelectionId.push({
//           value: z.value,
//           selectionId: host
//             .createSelectionIdBuilder()
//             .withMatrixNode(z, rows.levels)
//             .withMeasure(values)
//             .createSelectionId(),
//           object: z.objects,
//         });
//         if (z.children)
//           z.children.forEach((a) => {
//             listSelectionId.push({
//               value: a.value,
//               selectionId: host
//                 .createSelectionIdBuilder()
//                 .withMatrixNode(a, rows.levels)
//                 .withMeasure(values)
//                 .createSelectionId(),
//               object: a.objects,
//             });
//           });
//       });
//   });
//   // (listSelectionId)
//   return {
//     dataPoints: listSelectionId,
//   };
// }

function visualTransform(
  rowsData: powerbi.DataViewMatrix["rows"],
  valueIndex,
  rowLabelSettings
) {
  const defaultExpandRowKeys = [];
  const numOfLevels = rowsData.levels.length;
  const rowKeys = [];

  const handlData = (values) => {
    const dataList: Record<string, any[]> = {};

    for (const key in values!) {
      const element = values![key];
      // const vsIndex = element.valueSourceIndex ? element.valueSourceIndex : 0
      // subData[`${vsIndex}-${key}`] = element.value
      const vsIndex = element.valueSourceIndex
        ? element.valueSourceIndex + ""
        : "0";
      if (!(vsIndex in dataList)) {
        dataList[vsIndex] = [];
      }
      dataList[vsIndex].push(element.value!);
    }
    return dataList;
  };

  const getValueByDataList = (list: Record<string, number[]>) => {
    const vals = {};
    // 取出数据
    for (const key in list) {
      const element = list[key];
      element.forEach((val, i) => {
        vals[`${key}-${i}`] = val;
      });
    }
    return vals;
  };

  const getResult = (
    node: powerbi.DataViewMatrixNode,
    index,
    currentLevel,
    currentTitle,
    parent
  ) => {
    const subData: Record<string, any> = {};
    subData.name = {
      text: currentTitle,
      index,
      key: `${currentTitle}-${node.level}-${index}`,
    };
    const rowKey = `${currentTitle}-${node.level}-${index}`;
    subData.parent = parent;
    subData.rowKey = rowKey;
    rowKeys.push(rowKey);
    subData.level = currentLevel;
    if (rowLabelSettings[node.level].showExpand) {
      defaultExpandRowKeys.push(rowKey);
    }
    subData.className = `ant-table-row-level-${currentLevel}-${
      index % 2 == 1 ? "odd" : "even"
    }`;

    // 末级节点
    if (node?.values && !node.isSubtotal) {
      const res = handlData(node.values!);
      Object.assign(subData, getValueByDataList(res));
    }
    // 非末级节点
    else if (node?.children) {
      const res = handlData(
        node.children.filter((d) => d.isSubtotal)[0]?.values!
      );
      Object.assign(subData, getValueByDataList(res));
    }
    //定义一个存储所有values中有或没有valueSourceIndex的数据集合
    return subData;
  };

  let subData = [];
  rowsData.root
    .children!.filter((d) => !d.isSubtotal)
    .forEach((d, i) =>
      subData.push(
        getResult(
          d,
          JSON.stringify(d.identity),
          d.level,
          d.value || "Grand Total",
          subData
        )
      )
    );

  return {
    subData: subData,
    defaultExpandRowKeys: defaultExpandRowKeys,
    rowKeys: rowKeys,
  };
}
