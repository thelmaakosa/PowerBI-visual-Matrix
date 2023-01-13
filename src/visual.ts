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
import Fill = powerbi.Fill;
import ISandboxExtendedColorPalette = powerbi.extensibility.ISandboxExtendedColorPalette;

import * as d3 from "d3";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { ChartSettingsModel } from "./settings";
import { getMatrixNodeObjectValue } from "./objectEnumerationUtility";
import { ReactVisual, initialState } from "./ReactVisual";

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
    this.IdBuilder = options.host.createSelectionIdBuilder();
    const localizationManager = options.host.createLocalizationManager();
    this.formattingSettingsService = new FormattingSettingsService(
      localizationManager
    );
    this.colorPalette = options.host.colorPalette;
    this.host = options.host;
    this.reactRoot = React.createElement(ReactVisual, {});
    ReactDOM.render(this.reactRoot, this.target);
  }

  public update(options: VisualUpdateOptions) {
    this.formattingSettings =
      this.formattingSettingsService.populateFormattingSettingsModel(
        ChartSettingsModel,
        options.dataViews
      );
    this.formattingSettings.updateLevels(options.dataViews[0].matrix.columns.levels,options.dataViews[0].matrix.rows.levels,options.dataViews[0].matrix.valueSources)
      
    console.log("Visual update", options);

    this.selectionManager = this.host.createSelectionManager();
    this.selectionManager.registerOnSelectCallback(() => {
      // console.log(
      //   "selection manager callback",
      //   this.selectionManager.getSelectionIds()
      // );
    });
    
    const data = visualTransform(options, this.host);

    ReactVisual.update({matrix:options.dataViews[0].matrix, settings:this.formattingSettings});
  }

  public getFormattingModel(): powerbi.visuals.FormattingModel {
    
    /**
     * Only show the selected level
     */

    // console.log(this.formattingSettings,"this.formattingSetting")

    // Column Label
    const selectedIndex =
      this.formattingSettings.cards[2].slices[0]["value"]["value"];

    this.formattingSettings.cards[2].slices =
      this.formattingSettings.cards[2].slices.filter(
        (d) =>
          d["name"] == "columnLevel" ||
          d["name"] == "headerRowHeight" ||
          d["name"] == "headerRowPadding" ||
          d["name"].indexOf(`_${selectedIndex}`)>-1
      );

    // Row Label
    const selectedRowLabelIndex =
      this.formattingSettings.cards[0].slices[0]["value"]["value"];

    this.formattingSettings.cards[0].slices =
      this.formattingSettings.cards[0].slices.filter(
        (d) =>
          d["name"] == "rowLevel" ||
          d["name"].indexOf(`_${selectedRowLabelIndex}`)>-1
      );

    // Row Value
    const selectedRowValueIndex =
    this.formattingSettings.cards[3].slices[0]["value"]["value"];

    this.formattingSettings.cards[3].slices =
    this.formattingSettings.cards[3].slices.filter(
        (d) =>
        d["name"] == "rowLevel" ||
        d["name"] == "orderType" ||
        d["name"].indexOf(`_${selectedRowValueIndex}`)>-1
    );

    // Value
    const selectedValueIndex =
    this.formattingSettings.cards[4].slices[0]["value"]["value"];

    this.formattingSettings.cards[4].slices =
    this.formattingSettings.cards[4].slices.filter(
        (d) =>
        d["name"] == "valueIndex" ||
        d["name"].indexOf(`_${selectedValueIndex}`)>-1
    );

    let formattingModel = this.formattingSettingsService.buildFormattingModel( this.formattingSettings );


    /**
     * Add Group
     */

    // Column Label
    // console.log(formattingModel,"formattingModel")
    const columnStyleSlices = ((formattingModel.cards[2] as powerbi.visuals.FormattingCard).groups[0] as powerbi.visuals.FormattingGroup).slices;

    (formattingModel.cards[2] as powerbi.visuals.FormattingCard).groups = [
      {
        displayName: "Column",
        slices: columnStyleSlices.filter(
          (d) =>
            (d as powerbi.visuals.FormattingSlice).uid ==
            "columnStyle-columnLevel" ||
            (d as powerbi.visuals.FormattingSlice).uid ==
            "columnStyle-headerRowHeight" ||
            (d as powerbi.visuals.FormattingSlice).uid ==
            "columnStyle-headerRowPadding"
        ),
        uid: "columnStyle-group-columnLevel",
      },
      {
        displayName: "Fill",
        slices: columnStyleSlices.filter(
          (d) => (d as powerbi.visuals.FormattingSlice).uid.indexOf("fill") > -1
        ),
        uid: "columnStyle-group-fill",
      },
      {
        displayName: "Outline",
        slices: columnStyleSlices.filter(
          (d) =>
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("outline") > -1
        ),
        uid: "columnStyle-group-outline",
      },
      {
        displayName: "Font",
        slices: columnStyleSlices.filter(
          (d) =>
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("font") > -1 ||
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("wordWrap") > -1 ||
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("position") > -1 ||
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("stepIndentation") > -1
        ),
        uid: "columnStyle-group-font",
      },
    ];

    // Row Label
    const rowLabelStyleSlices = ((formattingModel.cards[0] as powerbi.visuals.FormattingCard).groups[0] as powerbi.visuals.FormattingGroup).slices;

    (formattingModel.cards[0] as powerbi.visuals.FormattingCard).groups = [
      {
        displayName: "Row Level",
        slices: rowLabelStyleSlices.filter(
          (d) =>
            (d as powerbi.visuals.FormattingSlice).uid ==
            "rowLabelStyle-rowLevel"
        ),
        uid: "rowLabelStyle-group-rowLevel",
      },
      {
        displayName: "Layout",
        slices: rowLabelStyleSlices.filter(
          (d) =>
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("rowHeight") >
              -1 ||
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("rowPadding") >
              -1
        ),
        uid: "rowLabelStyle-group-layout",
      },
      {
        displayName: "Highlight",
        slices: rowLabelStyleSlices.filter(
          (d) =>
            // (d as powerbi.visuals.FormattingSlice).uid.indexOf("highlightType") > -1 ||
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("fillColor") > -1 ||
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("fillOpacity") > -1 ||
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("bandedFill") > -1 ||
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("bandedFillColor") > -1 ||
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("bandedFillOpacity") > -1
        ),
        uid: "rowLabelStyle-group-highlight",
      },
      {
        displayName: "Outline",
        slices: rowLabelStyleSlices.filter(
          (d) =>
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("outline") > -1
        ),
        uid: "rowLabelStyle-group-outline",
      },
      {
        displayName: "Font",
        slices: rowLabelStyleSlices.filter(
          (d) =>
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("font") > -1 ||
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("wordWrap") > -1 ||
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("position") > -1 ||
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("stepIndentation") > -1
        ),
        uid: "rowLabelStyle-group-font",
      },
      {
        displayName: "Expand/Collapse",
        // topLevelToggle:rowLabelStyleSlices.filter(
        //     (d) =>
        //       (d as powerbi.visuals.FormattingSlice).uid.indexOf("showExpand") > -1 
        //   )[0] as powerbi.visuals.EnabledSlice,
        slices: rowLabelStyleSlices.filter(
          (d) =>
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("expand") > -1 || (d as powerbi.visuals.FormattingSlice).uid.indexOf("showExpand") > -1 
        ),
        uid: "rowLabelStyle-group-expandCollapse",
      },
    ];

    // Row Value
    const rowValueStyleSlices = ((formattingModel.cards[3] as powerbi.visuals.FormattingCard).groups[0] as powerbi.visuals.FormattingGroup).slices;

    (formattingModel.cards[3] as powerbi.visuals.FormattingCard).groups = [
      {
        displayName: "Row Level",
        slices: rowValueStyleSlices.filter(
          (d) =>
            (d as powerbi.visuals.FormattingSlice).uid ==
            "rowValueStyle-rowLevel" ||
            (d as powerbi.visuals.FormattingSlice).uid ==
            "rowValueStyle-orderType"
        ),
        uid: "rowValueStyle-group-rowLevel",
      },
      {
        displayName: "Highlight",
        slices: rowValueStyleSlices.filter(
          (d) =>
            // (d as powerbi.visuals.FormattingSlice).uid.indexOf("highlightType") > -1 ||
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("fillColor") > -1 ||
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("fillOpacity") > -1 ||
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("bandedFill") > -1 ||
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("bandedFillColor") > -1 ||
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("bandedFillOpacity") > -1
        ),
        uid: "rowValueStyle-group-highlight",
      },
      {
        displayName: "Outline",
        slices: rowValueStyleSlices.filter(
          (d) =>
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("outline") > -1
        ),
        uid: "rowValueStyle-group-outline",
      },
      {
        displayName: "Font",
        slices: rowValueStyleSlices.filter(
          (d) =>
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("font") > -1 ||
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("wordWrap") > -1 ||
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("position") > -1 ||
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("stepIndentation") > -1
        ),
        uid: "rowValueStyle-group-font",
      },
      {
        displayName: "Selection",
        topLevelToggle:rowValueStyleSlices.filter(
            (d) =>
              (d as powerbi.visuals.FormattingSlice).uid.indexOf("enableSelection") > -1 
          )[0] as powerbi.visuals.EnabledSlice,
        slices: rowValueStyleSlices.filter(
          (d) =>
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("select") > -1 
        ),
        uid: "rowValueStyle-group-selection",
      },
    ];

    // Values
    const valueStyleSlices = ((formattingModel.cards[4] as powerbi.visuals.FormattingCard).groups[0] as powerbi.visuals.FormattingGroup).slices;

    (formattingModel.cards[4] as powerbi.visuals.FormattingCard).groups = [
      {
        displayName: "Value Index",
        slices: valueStyleSlices.filter(
          (d) =>
            (d as powerbi.visuals.FormattingSlice).uid ==
            "valueStyle-valueIndex"
        ),
        uid: "valueStyle-group-valueIndex",
      },
      {
        displayName: "Units",
        topLevelToggle:valueStyleSlices.filter(
            (d) =>
              (d as powerbi.visuals.FormattingSlice).uid.indexOf("showUnits") > -1 
          )[0] as powerbi.visuals.EnabledSlice,
        slices: valueStyleSlices.filter(
          (d) =>
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("units") > -1 
        ),
        uid: "valueStyle-group-units",
      },
      {
        displayName: "Fill",
        slices: valueStyleSlices.filter(
          (d) =>
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("fillColor") > -1 ||
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("fillOpacity") > -1
        ),
        uid: "valueStyle-group-fill",
      },
      {
        displayName: "Outline",
        slices: valueStyleSlices.filter(
          (d) =>
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("outline") > -1
        ),
        uid: "valueStyle-group-outline",
      },
      {
        displayName: "Font",
        slices: valueStyleSlices.filter(
          (d) =>
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("font") > -1 ||
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("wordWrap") > -1 ||
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("position") > -1 ||
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("stepIndentation") > -1
        ),
        uid: "valueStyle-group-font",
      },
      {
        displayName: "Sort Icon",
        topLevelToggle:valueStyleSlices.filter(
            (d) =>
              (d as powerbi.visuals.FormattingSlice).uid.indexOf("showSortIcon") > -1 
          )[0] as powerbi.visuals.EnabledSlice,
        slices: valueStyleSlices.filter(
          (d) =>
            (d as powerbi.visuals.FormattingSlice).uid.indexOf("icon") > -1
        ),
        uid: "valueStyle-group-sortIcon",
      },
    ];
    return formattingModel
  }

  // private transformData(options: VisualUpdateOptions, IdBuilder) {
  //     const matrix = options.dataViews[0].matrix;
  //     const column = matrix.columns.root.children.map( (d) => d.value);
  //     const rowRoot:any = matrix.rows.root.children

  //     const rowLevels: powerbi.DataViewHierarchyLevel[] = matrix.rows.levels;
  //     const columnLevels: powerbi.DataViewHierarchyLevel[] = matrix.columns.levels;

  //     // // iterate rows hierarchy
  //     // nodeWalker(matrix.rows.root, rowLevels);
  //     // // iterate columns hierarchy
  //     // nodeWalker(matrix.columns.root, columnLevels);

  //     // function nodeWalker(node: any, levels: powerbi.DataViewHierarchyLevel[]) {
  //     //     node.selectionId =  IdBuilder.withMatrixNode(node, levels).createSelectionId();
  //     //     console.log(IdBuilder.withMatrixNode(node, levels).createSelectionId())

  //     //     if (node.children && node.children.length) {
  //     //         node.children.forEach(child => {
  //     //             nodeWalker(child, levels);
  //     //         });
  //     //     }
  //     // }

  //     const parseMatrix = (obj: powerbi.DataViewMatrixNode, parentIndex, levels)=>{
  //         const newParentIndex = [...parentIndex, obj.identity["identityIndex"]];
  //         let result = {};
  //         result["segmentIndex"] = obj.identity["identityIndex"];
  //         result["Segment"] = obj.value;
  //         result["Level"] = obj.level;
  //         console.log(IdBuilder.withMatrixNode(obj, levels).createSelectionId())
  //         result["id"] = JSON.parse(JSON.stringify(IdBuilder.withMatrixNode(obj, levels).createSelectionId())) ;
  //         result["color"] = this.getMatrixColorByIndex(obj,1,this.colorPalette)
  //         if (obj.children) {
  //             // Object.values(
  //             //   obj.children.filter((d) => d?.isSubtotal)[0].values
  //             // ).forEach((d, i) => {
  //             //   if (d?.valueSourceIndex != 1) {
  //             //     const key = (column[i / 2] as string) || "Total";
  //             //     result = { ...result, [key]: d.value };
  //             //   }
  //             // });
  //             result["children"] = obj.children
  //               .filter((d) => !d?.isSubtotal)
  //               .map((d) => parseMatrix(d, newParentIndex,levels));
  //           } else {
  //             // Object.values(obj.values).forEach((d, i) => {
  //             //   if (d?.valueSourceIndex != 1) {
  //             //     const key = column[i / 2] as string;
  //             //     result = { ...result, [key]: d.value };
  //             //   }
  //             // });
  //           }
  //           result["path"] = newParentIndex;
  //           return result;
  //     }

  //     const getColumns = (node:powerbi.DataViewMatrixNode,index)=>{
  //         if(node?.children){
  //             return node.children.map((n,i)=>getColumns(n,[...index,`l${n.level}i${i}`]))
  //         }
  //         return index.join('_')
  //     }

  //     console.log(getColumns(matrix.columns.root,[0]))

  //     const data = matrix.columns.root.children
  //     .filter((d) => !d?.isSubtotal)
  //     .map((d) => parseMatrix(d, [], columnLevels));

  //     return data

  // }

  private getMatrixColorByIndex(
    category: any,
    index: number,
    colorPalette: ISandboxExtendedColorPalette
  ): string {
    if (colorPalette.isHighContrast) {
      return colorPalette.background.value;
    }

    const defaultColor: Fill = {
      solid: {
        color: colorPalette.getColor(`${category.values[index]}`).value,
      },
    };

    return getMatrixNodeObjectValue<Fill>(
      category,
      index,
      "colorSelector",
      "fill",
      defaultColor
    ).solid.color;
  }
}

function visualTransform(
  options: VisualUpdateOptions,
  host: powerbi.extensibility.visual.IVisualHost
): any {
  let dataViews = options.dataViews[0];
  var rows = dataViews.matrix.rows;
  var columns = dataViews.matrix.columns;
  let listSelectionId: any[] = [];
  // var selectionIdBuilder = host.createSelectionIdBuilder();
  let values = dataViews.matrix.valueSources[0].queryName;

  rows.root.children.forEach((x) => {
    listSelectionId.push({
      value: x.value,
      selectionId: host
        .createSelectionIdBuilder()
        .withMatrixNode(x, rows.levels)
        .withMeasure(values)
        .createSelectionId(),
      object: x.objects,
    });

    if (x.children)
      x.children.forEach((z) => {
        listSelectionId.push({
          value: z.value,
          selectionId: host
            .createSelectionIdBuilder()
            .withMatrixNode(z, rows.levels)
            .withMeasure(values)
            .createSelectionId(),
          object: z.objects,
        });
        if (z.children)
          z.children.forEach((a) => {
            listSelectionId.push({
              value: a.value,
              selectionId: host
                .createSelectionIdBuilder()
                .withMatrixNode(a, rows.levels)
                .withMeasure(values)
                .createSelectionId(),
              object: a.objects,
            });
          });
      });
  });
  // console.log(listSelectionId)
  return {
    dataPoints: listSelectionId,
  };
}
