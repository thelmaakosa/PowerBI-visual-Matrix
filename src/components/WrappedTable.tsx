// import * as React from "react";
// import styled from "styled-components";
// import * as d3 from "d3";

// import powerbi from "powerbi-visuals-api";

// import {
//   parseSettings,
//   genFontStyle,
//   genBackground,
//   genBorder,
//   genBandedBackgroud,
//   genIconStyle,
//   genRowLayout,
// } from "./js/styleUtils";
// import {
//   ChartSettingsModel,
//   RowDetailsSettings,
//   ExpandCollapseAllSettings,
// } from "../settings";
// import { IStyles } from "./styles";
// import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";

// import MatrixTable from "./MatrixTable";
// import { json } from "d3";
// import { useState } from "react";

// const columnStyleToCSS = (style: IStyles) => {
//   const css = `
//         ${genFontStyle(
//           style.fontBold,
//           style.fontColor,
//           style.fontFamily,
//           style.fontItalic,
//           style.fontSize,
//           style.fontUnderline,
//           style.position,
//           style.stepIndentation,
//           style.wordWrap
//         )}
//         ${genBackground(style.fillColor, style.fillOpacity)}
//         ${genBorder(
//           style.outlineTop,
//           style.outlineRight,
//           style.outlineBottom,
//           style.outlineLeft,
//           style.outlineRadiusTopLeft,
//           style.outlineRadiusTopRight,
//           style.outlineRadiusBottomRight,
//           style.outlineRadiusBottomLeft,
//           style.outlineColor,
//           style.outlineThickness
//         )}
//     `;
//   return css;
// };

// const valueStyleToCSS = (style: IStyles) => {
//   const css = `
//         ${genFontStyle(
//           style.fontBold,
//           style.fontColor,
//           style.fontFamily,
//           style.fontItalic,
//           style.fontSize,
//           style.fontUnderline,
//           style.position,
//           style.stepIndentation,
//           style.wordWrap
//         )}
//         ${genBackground(style.fillColor, style.fillOpacity)}
//         ${genBorder(
//           style.outlineTop,
//           style.outlineRight,
//           style.outlineBottom,
//           style.outlineLeft,
//           style.outlineRadiusTopLeft,
//           style.outlineRadiusTopRight,
//           style.outlineRadiusBottomRight,
//           style.outlineRadiusBottomLeft,
//           style.outlineColor,
//           style.outlineThickness
//         )}
//     `;
//   return css;
// };

// const rowLabelStyleToCSS = (style: IStyles) => {
//   const css = `
//         ${genFontStyle(
//           style.fontBold,
//           style.fontColor,
//           style.fontFamily,
//           style.fontItalic,
//           style.fontSize,
//           style.fontUnderline,
//           style.position,
//           style.stepIndentation,
//           style.wordWrap
//         )}
//         ${genBackground(style.fillColor, style.fillOpacity)}
//         ${genBorder(
//           style.outlineTop,
//           style.outlineRight,
//           style.outlineBottom,
//           style.outlineLeft,
//           style.outlineRadiusTopLeft,
//           style.outlineRadiusTopRight,
//           style.outlineRadiusBottomRight,
//           style.outlineRadiusBottomLeft,
//           style.outlineColor,
//           style.outlineThickness
//         )}
//     `;
//   return css;
// };

// const callapseIconStyleToCSS = (style: IStyles) => {
//   const css = genIconStyle(
//     style.expandCollapseFillColor,
//     style.expandCollapseIconColor,
//     style.expandCollapseIcon,
//     style.expandCollapseOutlineColor,
//     style.expandCollapseOutlineRadius,
//     style.expandCollapseOutlineThickness
//   );
//   return css;
// };

// const rowLayoutStyleToCSS = (style: IStyles) => {
//   const css = `
//         ${genRowLayout(style.rowHeight, style.rowPadding)}
//     `;
//   return css;
// };

// const rowValueStyleToCSS = (style: IStyles) => {
//   const css = `
//         ${genFontStyle(
//           style.fontBold,
//           style.fontColor,
//           style.fontFamily,
//           style.fontItalic,
//           style.fontSize,
//           style.fontUnderline,
//           style.position,
//           style.stepIndentation,
//           style.wordWrap
//         )}
//         ${genBackground(style.fillColor, style.fillOpacity)}
//         ${genBorder(
//           style.outlineTop,
//           style.outlineRight,
//           style.outlineBottom,
//           style.outlineLeft,
//           style.outlineRadiusTopLeft,
//           style.outlineRadiusTopRight,
//           style.outlineRadiusBottomRight,
//           style.outlineRadiusBottomLeft,
//           style.outlineColor,
//           style.outlineThickness
//         )}
//     `;
//   return css;
// };

// const rowValueSelectionStyleToCSS = (style: IStyles) => {
//   const css = `
//         ${genBorder(
//           style.selectedOutline,
//           style.selectedOutline,
//           style.selectedOutline,
//           style.selectedOutline,
//           style.selectedOutlineRadius,
//           style.selectedOutlineRadius,
//           style.selectedOutlineRadius,
//           style.selectedOutlineRadius,
//           style.selectedOutlineColor,
//           style.selectedOutlineThickness
//         )}
//         ${genBackground(style.selectedFillColor, style.selectedFillOpacity)}
//     `;
//   return css;
// };

// const rowDetailsStylesToCSS = (style: RowDetailsSettings) => {
//   const css = `
//         ${genFontStyle(
//           style.fontBold.value,
//           style.fontColor.value.value,
//           style.fontFamily.value,
//           style.fontItalic.value,
//           style.fontSize.value,
//           style.fontUnderline.value,
//           style.position.value.value as string,
//           style.stepIndentation.value
//         )}
//     `;
//   return css;
// };

// export const WrappedTable = (props: {
//   settings: ChartSettingsModel;
//   matrix: powerbi.DataViewMatrix;
// }) => {
//   const rowLabelSettings = parseSettings(props.settings.cards[0]);
//   const columnSettings = parseSettings(props.settings.cards[2]);
//   const rowValueSettings = parseSettings(props.settings.cards[3]);
//   const valueSettings = parseSettings(props.settings.cards[4]);
//   const matrixSettings = props.settings.cards[5];
//   const columnStyleSettings = props.settings.cards[2];
//   const rowValueStyleSettings = props.settings.cards[3];
//   const expandCollapseAllSettings: ExpandCollapseAllSettings = props.settings
//     .cards[5] as ExpandCollapseAllSettings;

//   const columnCSS = columnSettings.map((d) => columnStyleToCSS(d));
//   const valuesCSS = valueSettings.map((d) => valueStyleToCSS(d));
//   const rowLabelCSS = rowLabelSettings.map((d) => rowLabelStyleToCSS(d));
//   const rowCollapseIconCSS = rowLabelSettings.map((d) =>
//     callapseIconStyleToCSS(d)
//   );
//   const rowLayoutCSS = rowLabelSettings.map((d) => rowLayoutStyleToCSS(d));
//   const rowValueCSS = rowValueSettings.map((d) => rowValueStyleToCSS(d));
//   const rowValueSelectionCSS = rowValueSettings.map((d) =>
//     rowValueSelectionStyleToCSS(d)
//   );
//   const rowCollapseAllIconCSS = genIconStyle(
//     expandCollapseAllSettings.expandCollapseFillColor.value.value,
//     expandCollapseAllSettings.expandCollapseIconColor.value.value,
//     expandCollapseAllSettings.expandCollapseIcon.value.value as string,
//     expandCollapseAllSettings.expandCollapseOutlineColor.value.value,
//     expandCollapseAllSettings.expandCollapseOutlineRadius.value,
//     expandCollapseAllSettings.expandCollapseOutlineThickness.value
//   );
//   const [mode, setMode] = useState<"columnFirst" | "valueFirst">("columnFirst");
//   React.useEffect(() => {
//     setMode(
//       rowValueStyleSettings.slices.filter((d) => d.name == "orderType")[0][
//         "value"
//       ]["value"]
//     );
//   }, [props.settings]);

//   const StyledDiv = styled.div`
//     & .ant-table-container {
//       & .ant-table-header {
//         > table
//           > thead
//           > tr:nth-child(1)
//           > th.ant-table-cell.ant-table-column-has-sorters
//           > div
//           > span.ant-table-column-title
//           > div
//           > button {
//           ${rowCollapseAllIconCSS}
//         }
//         & .ant-table-thead {
//           & tr {
//             height: ${props.settings.columnStyleSettings.headerRowHeight.value +
//             2 * props.settings.columnStyleSettings.headerRowPadding.value}px;
//           }
//         }
//         & .matrix-col.matrix-col-cat.matrix-col-cat-1 {
//           ${columnCSS[0]}
//           padding-top: ${props.settings.columnStyleSettings.headerRowPadding
//             .value}px !important;
//           padding-bottom: ${props.settings.columnStyleSettings.headerRowPadding
//             .value}px !important;
//         }
//         & .matrix-col.matrix-col-cat.matrix-col-cat-2 {
//           ${columnCSS[1]}
//           padding-top: ${props.settings.columnStyleSettings.headerRowPadding
//             .value}px !important;
//           padding-bottom: ${props.settings.columnStyleSettings.headerRowPadding
//             .value}px !important;
//         }
//         & .matrix-col.matrix-col-cat.matrix-col-cat-3 {
//           ${columnCSS[2]}
//           padding-top: ${props.settings.columnStyleSettings.headerRowPadding
//             .value}px !important;
//           padding-bottom: ${props.settings.columnStyleSettings.headerRowPadding
//             .value}px !important;
//         }

//         & .matrix-col.matrix-col-value.matrix-col-value-1 {
//           ${valuesCSS[0]}
//           padding-top: ${props.settings.columnStyleSettings.headerRowPadding
//             .value}px !important;
//           padding-bottom: ${props.settings.columnStyleSettings.headerRowPadding
//             .value}px !important;
//         }
//         & .matrix-col.matrix-col-value.matrix-col-value-2 {
//           ${valuesCSS[1]}
//           padding-top: ${props.settings.columnStyleSettings.headerRowPadding
//             .value}px !important;
//           padding-bottom: ${props.settings.columnStyleSettings.headerRowPadding
//             .value}px !important;
//         }
//         & .matrix-col.matrix-col-value.matrix-col-value-3 {
//           ${valuesCSS[2]}
//           padding-top: ${props.settings.columnStyleSettings.headerRowPadding
//             .value}px !important;
//           padding-bottom: ${props.settings.columnStyleSettings.headerRowPadding
//             .value}px !important;
//         }
//       }
//       & .ant-table-body {
//         & .ant-table-row.ant-table-row-level-0 td {
//           ${rowLayoutCSS[0]}
//         }
//         & .ant-table-row.ant-table-row-level-1 td {
//           ${rowLayoutCSS[1]}
//         }
//         & .ant-table-row.ant-table-row-level-2 td {
//           ${rowLayoutCSS[2]}
//         }

//         &
//           .ant-table-row.ant-table-row-level-0.selected
//           td.ant-table-cell.matrix-col {
//           ${rowValueSelectionCSS[0]}
//         }
//         &
//           .ant-table-row.ant-table-row-level-1.selected
//           td.ant-table-cell.matrix-col {
//           ${rowValueSelectionCSS[1]}
//         }
//         &
//           .ant-table-row.ant-table-row-level-2.selected
//           td.ant-table-cell.matrix-col {
//           ${rowValueSelectionCSS[2]}
//         }

//         & .ant-table-row.ant-table-row-level-0 td:not(:first-child) {
//           ${rowValueCSS[0]}
//         }
//         & .ant-table-row.ant-table-row-level-1 td:not(:first-child) {
//           ${rowValueCSS[1]}
//         }
//         & .ant-table-row.ant-table-row-level-2 td:not(:first-child) {
//           ${rowValueCSS[2]}
//         }

//         & .ant-table-row.ant-table-row-level-0 td:first-child {
//           display: flex;
//           align-items: center;
//           ${rowLabelCSS[0]}
//           > button.ant-table-row-expand-icon.ant-table-row-expand-icon-collapsed,.ant-table-row-expand-icon.ant-table-row-expand-icon-expanded {
//             ${rowCollapseIconCSS[0]}
//           }
//           > .row-label .row-label-detail {
//             ${rowDetailsStylesToCSS(props.settings.rowDetailsSettings)}
//           }
//         }
//         & .ant-table-row.ant-table-row-level-1 td:first-child {
//           display: flex;
//           align-items: center;
//           ${rowLabelCSS[1]}
//           > .ant-table-row-expand-icon.ant-table-row-expand-icon-collapsed,.ant-table-row-expand-icon.ant-table-row-expand-icon-expanded {
//             ${rowCollapseIconCSS[1]}
//           }
//           > .row-label .row-label-detail {
//             ${rowDetailsStylesToCSS(props.settings.rowDetailsSettings)}
//           }
//         }
//         & .ant-table-row.ant-table-row-level-2 td:first-child {
//           display: flex;
//           align-items: center;
//           ${rowLabelCSS[2]}
//           > .ant-table-row-expand-icon.ant-table-row-expand-icon-collapsed,.ant-table-row-expand-icon.ant-table-row-expand-icon-expanded {
//             ${rowCollapseIconCSS[2]}
//           }
//           > .row-label .row-label-detail {
//             ${rowDetailsStylesToCSS(props.settings.rowDetailsSettings)}
//           }
//         }

//         & .ant-table-row.ant-table-row-level-0:nth-child(even) td:first-child {
//           ${rowLabelSettings[0].bandedFill
//             ? genBandedBackgroud(
//                 rowLabelSettings[0].bandedFillColor,
//                 rowLabelSettings[0].bandedFillOpacity
//               )
//             : ``}
//         }
//         & .ant-table-row.ant-table-row-level-1:nth-child(even) td:first-child {
//           ${rowLabelSettings[1].bandedFill
//             ? genBandedBackgroud(
//                 rowLabelSettings[1].bandedFillColor,
//                 rowLabelSettings[1].bandedFillOpacity
//               )
//             : ``}
//         }
//         & .ant-table-row.ant-table-row-level-2:nth-child(even) td:first-child {
//           ${rowLabelSettings[2].bandedFill
//             ? genBandedBackgroud(
//                 rowLabelSettings[2].bandedFillColor,
//                 rowLabelSettings[2].bandedFillOpacity
//               )
//             : ``}
//         }

//         &
//           .ant-table-row.ant-table-row-level-0:nth-child(even)
//           td:not(:first-child) {
//           ${rowValueSettings[0].highlightType == "Banded Rows"
//             ? genBandedBackgroud(
//                 rowValueSettings[0].bandedFillColor,
//                 rowValueSettings[0].bandedFillOpacity
//               )
//             : ``}
//         }
//         &
//           .ant-table-row.ant-table-row-level-1:nth-child(even)
//           td:not(:first-child) {
//           ${rowValueSettings[1].highlightType == "Banded Rows"
//             ? genBandedBackgroud(
//                 rowValueSettings[1].bandedFillColor,
//                 rowValueSettings[1].bandedFillOpacity
//               )
//             : ``}
//         }
//         &
//           .ant-table-row.ant-table-row-level-2:nth-child(even)
//           td:not(:first-child) {
//           ${rowValueSettings[2].highlightType == "Banded Rows"
//             ? genBandedBackgroud(
//                 rowValueSettings[2].bandedFillColor,
//                 rowValueSettings[2].bandedFillOpacity
//               )
//             : ``}
//         }
//       }
//     }
//   `;
//   return (
//     <StyledDiv>
//       <MatrixTable
//         matrix={props.matrix}
//         valueSettings={valueSettings}
//         rowLabelSettings={rowLabelSettings}
//         rowValueSettings={rowValueSettings}
//         rowDetailsSettings={props.settings.rowDetailsSettings}
//         matrixSettings={matrixSettings}
//         columnStyleSettings={columnStyleSettings}
//         expandCollapseAllSettings={expandCollapseAllSettings}
//         mode={mode}
//       />
//     </StyledDiv>
//   );
// };
