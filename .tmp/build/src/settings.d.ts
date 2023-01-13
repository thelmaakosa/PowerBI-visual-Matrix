import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";
import FormattingSettingsCard = formattingSettings.Card;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;
export declare class matrixStyleSettings extends FormattingSettingsCard {
    orderType: formattingSettings.ItemDropdown;
    name: string;
    displayName: string;
    slices: Array<FormattingSettingsSlice>;
}
export declare class ColumnStyleSettings extends FormattingSettingsCard {
    headerRowHeight: formattingSettings.NumUpDown;
    headerRowPadding: formattingSettings.NumUpDown;
    columnLevel: formattingSettings.ItemDropdown;
    fillColor_1: formattingSettings.ColorPicker;
    fillOpacity_1: formattingSettings.NumUpDown;
    outlineColor_1: formattingSettings.ColorPicker;
    outlineThickness_1: formattingSettings.NumUpDown;
    outlineLeft_1: formattingSettings.ToggleSwitch;
    outlineRight_1: formattingSettings.ToggleSwitch;
    outlineTop_1: formattingSettings.ToggleSwitch;
    outlineBottom_1: formattingSettings.ToggleSwitch;
    outlineRadiusTopLeft_1: formattingSettings.NumUpDown;
    outlineRadiusTopRight_1: formattingSettings.NumUpDown;
    outlineRadiusBottomLeft_1: formattingSettings.NumUpDown;
    outlineRadiusBottomRight_1: formattingSettings.NumUpDown;
    fontFamily_1: formattingSettings.FontPicker;
    fontSize_1: formattingSettings.NumUpDown;
    fontColor_1: formattingSettings.ColorPicker;
    fontBold_1: formattingSettings.ToggleSwitch;
    fontItalic_1: formattingSettings.ToggleSwitch;
    fontUnderline_1: formattingSettings.ToggleSwitch;
    wordWrap_1: formattingSettings.ToggleSwitch;
    position_1: formattingSettings.ItemDropdown;
    stepIndentation_1: formattingSettings.NumUpDown;
    fillColor_2: formattingSettings.ColorPicker;
    fillOpacity_2: formattingSettings.NumUpDown;
    outlineColor_2: formattingSettings.ColorPicker;
    outlineThickness_2: formattingSettings.NumUpDown;
    outlineLeft_2: formattingSettings.ToggleSwitch;
    outlineRight_2: formattingSettings.ToggleSwitch;
    outlineTop_2: formattingSettings.ToggleSwitch;
    outlineBottom_2: formattingSettings.ToggleSwitch;
    outlineRadiusTopLeft_2: formattingSettings.NumUpDown;
    outlineRadiusTopRight_2: formattingSettings.NumUpDown;
    outlineRadiusBottomLeft_2: formattingSettings.NumUpDown;
    outlineRadiusBottomRight_2: formattingSettings.NumUpDown;
    fontFamily_2: formattingSettings.FontPicker;
    fontSize_2: formattingSettings.NumUpDown;
    fontColor_2: formattingSettings.ColorPicker;
    fontBold_2: formattingSettings.ToggleSwitch;
    fontItalic_2: formattingSettings.ToggleSwitch;
    fontUnderline_2: formattingSettings.ToggleSwitch;
    wordWrap_2: formattingSettings.ToggleSwitch;
    position_2: formattingSettings.ItemDropdown;
    stepIndentation_2: formattingSettings.NumUpDown;
    fillColor_3: formattingSettings.ColorPicker;
    fillOpacity_3: formattingSettings.NumUpDown;
    outlineColor_3: formattingSettings.ColorPicker;
    outlineThickness_3: formattingSettings.NumUpDown;
    outlineLeft_3: formattingSettings.ToggleSwitch;
    outlineRight_3: formattingSettings.ToggleSwitch;
    outlineTop_3: formattingSettings.ToggleSwitch;
    outlineBottom_3: formattingSettings.ToggleSwitch;
    outlineRadiusTopLeft_3: formattingSettings.NumUpDown;
    outlineRadiusTopRight_3: formattingSettings.NumUpDown;
    outlineRadiusBottomLeft_3: formattingSettings.NumUpDown;
    outlineRadiusBottomRight_3: formattingSettings.NumUpDown;
    fontFamily_3: formattingSettings.FontPicker;
    fontSize_3: formattingSettings.NumUpDown;
    fontColor_3: formattingSettings.ColorPicker;
    fontBold_3: formattingSettings.ToggleSwitch;
    fontItalic_3: formattingSettings.ToggleSwitch;
    fontUnderline_3: formattingSettings.ToggleSwitch;
    wordWrap_3: formattingSettings.ToggleSwitch;
    position_3: formattingSettings.ItemDropdown;
    stepIndentation_3: formattingSettings.NumUpDown;
    name: string;
    displayName: string;
    slices: Array<FormattingSettingsSlice>;
}
export declare class RowLabelSettings extends FormattingSettingsCard {
    rowLevel: formattingSettings.ItemDropdown;
    rowHeight_1: formattingSettings.TextInput;
    rowPadding_1: formattingSettings.NumUpDown;
    fillColor_1: formattingSettings.ColorPicker;
    fillOpacity_1: formattingSettings.NumUpDown;
    bandedFill_1: formattingSettings.ToggleSwitch;
    bandedFillColor_1: formattingSettings.ColorPicker;
    bandedFillOpacity_1: formattingSettings.NumUpDown;
    outlineColor_1: formattingSettings.ColorPicker;
    outlineThickness_1: formattingSettings.NumUpDown;
    outlineLeft_1: formattingSettings.ToggleSwitch;
    outlineRight_1: formattingSettings.ToggleSwitch;
    outlineTop_1: formattingSettings.ToggleSwitch;
    outlineBottom_1: formattingSettings.ToggleSwitch;
    outlineRadiusTopLeft_1: formattingSettings.NumUpDown;
    outlineRadiusTopRight_1: formattingSettings.NumUpDown;
    outlineRadiusBottomLeft_1: formattingSettings.NumUpDown;
    outlineRadiusBottomRight_1: formattingSettings.NumUpDown;
    fontFamily_1: formattingSettings.FontPicker;
    fontSize_1: formattingSettings.NumUpDown;
    fontColor_1: formattingSettings.ColorPicker;
    fontBold_1: formattingSettings.ToggleSwitch;
    fontItalic_1: formattingSettings.ToggleSwitch;
    fontUnderline_1: formattingSettings.ToggleSwitch;
    wordWrap_1: formattingSettings.ToggleSwitch;
    position_1: formattingSettings.ItemDropdown;
    stepIndentation_1: formattingSettings.NumUpDown;
    showExpand_1: formattingSettings.ToggleSwitch;
    expandCollapseIcon_1: formattingSettings.ItemDropdown;
    expandCollapseIconColor_1: formattingSettings.ColorPicker;
    expandCollapseFillColor_1: formattingSettings.ColorPicker;
    expandCollapseOutlineColor_1: formattingSettings.ColorPicker;
    expandCollapseOutlineThickness_1: formattingSettings.NumUpDown;
    expandCollapseOutlineRadius_1: formattingSettings.NumUpDown;
    rowHeight_2: formattingSettings.TextInput;
    rowPadding_2: formattingSettings.NumUpDown;
    fillColor_2: formattingSettings.ColorPicker;
    fillOpacity_2: formattingSettings.NumUpDown;
    bandedFill_2: formattingSettings.ToggleSwitch;
    bandedFillColor_2: formattingSettings.ColorPicker;
    bandedFillOpacity_2: formattingSettings.NumUpDown;
    outlineColor_2: formattingSettings.ColorPicker;
    outlineThickness_2: formattingSettings.NumUpDown;
    outlineLeft_2: formattingSettings.ToggleSwitch;
    outlineRight_2: formattingSettings.ToggleSwitch;
    outlineTop_2: formattingSettings.ToggleSwitch;
    outlineBottom_2: formattingSettings.ToggleSwitch;
    outlineRadiusTopLeft_2: formattingSettings.NumUpDown;
    outlineRadiusTopRight_2: formattingSettings.NumUpDown;
    outlineRadiusBottomLeft_2: formattingSettings.NumUpDown;
    outlineRadiusBottomRight_2: formattingSettings.NumUpDown;
    fontFamily_2: formattingSettings.FontPicker;
    fontSize_2: formattingSettings.NumUpDown;
    fontColor_2: formattingSettings.ColorPicker;
    fontBold_2: formattingSettings.ToggleSwitch;
    fontItalic_2: formattingSettings.ToggleSwitch;
    fontUnderline_2: formattingSettings.ToggleSwitch;
    wordWrap_2: formattingSettings.ToggleSwitch;
    position_2: formattingSettings.ItemDropdown;
    stepIndentation_2: formattingSettings.NumUpDown;
    showExpand_2: formattingSettings.ToggleSwitch;
    expandCollapseIcon_2: formattingSettings.ItemDropdown;
    expandCollapseIconColor_2: formattingSettings.ColorPicker;
    expandCollapseFillColor_2: formattingSettings.ColorPicker;
    expandCollapseOutlineColor_2: formattingSettings.ColorPicker;
    expandCollapseOutlineThickness_2: formattingSettings.NumUpDown;
    expandCollapseOutlineRadius_2: formattingSettings.NumUpDown;
    rowHeight_3: formattingSettings.TextInput;
    rowPadding_3: formattingSettings.NumUpDown;
    fillColor_3: formattingSettings.ColorPicker;
    fillOpacity_3: formattingSettings.NumUpDown;
    bandedFill_3: formattingSettings.ToggleSwitch;
    bandedFillColor_3: formattingSettings.ColorPicker;
    bandedFillOpacity_3: formattingSettings.NumUpDown;
    outlineColor_3: formattingSettings.ColorPicker;
    outlineThickness_3: formattingSettings.NumUpDown;
    outlineLeft_3: formattingSettings.ToggleSwitch;
    outlineRight_3: formattingSettings.ToggleSwitch;
    outlineTop_3: formattingSettings.ToggleSwitch;
    outlineBottom_3: formattingSettings.ToggleSwitch;
    outlineRadiusTopLeft_3: formattingSettings.NumUpDown;
    outlineRadiusTopRight_3: formattingSettings.NumUpDown;
    outlineRadiusBottomLeft_3: formattingSettings.NumUpDown;
    outlineRadiusBottomRight_3: formattingSettings.NumUpDown;
    fontFamily_3: formattingSettings.FontPicker;
    fontSize_3: formattingSettings.NumUpDown;
    fontColor_3: formattingSettings.ColorPicker;
    fontBold_3: formattingSettings.ToggleSwitch;
    fontItalic_3: formattingSettings.ToggleSwitch;
    fontUnderline_3: formattingSettings.ToggleSwitch;
    wordWrap_3: formattingSettings.ToggleSwitch;
    position_3: formattingSettings.ItemDropdown;
    stepIndentation_3: formattingSettings.NumUpDown;
    showExpand_3: formattingSettings.ToggleSwitch;
    expandCollapseIcon_3: formattingSettings.ItemDropdown;
    expandCollapseIconColor_3: formattingSettings.ColorPicker;
    expandCollapseFillColor_3: formattingSettings.ColorPicker;
    expandCollapseOutlineColor_3: formattingSettings.ColorPicker;
    expandCollapseOutlineThickness_3: formattingSettings.NumUpDown;
    expandCollapseOutlineRadius_3: formattingSettings.NumUpDown;
    name: string;
    displayName: string;
    slices: Array<FormattingSettingsSlice>;
}
export declare class RowValueSettings extends FormattingSettingsCard {
    rowLevel: formattingSettings.ItemDropdown;
    orderType: formattingSettings.ItemDropdown;
    fillColor_1: formattingSettings.ColorPicker;
    fillOpacity_1: formattingSettings.NumUpDown;
    bandedFill_1: formattingSettings.ToggleSwitch;
    bandedFillColor_1: formattingSettings.ColorPicker;
    bandedFillOpacity_1: formattingSettings.NumUpDown;
    outlineColor_1: formattingSettings.ColorPicker;
    outlineThickness_1: formattingSettings.NumUpDown;
    outlineLeft_1: formattingSettings.ToggleSwitch;
    outlineRight_1: formattingSettings.ToggleSwitch;
    outlineTop_1: formattingSettings.ToggleSwitch;
    outlineBottom_1: formattingSettings.ToggleSwitch;
    outlineRadiusTopLeft_1: formattingSettings.NumUpDown;
    outlineRadiusTopRight_1: formattingSettings.NumUpDown;
    outlineRadiusBottomLeft_1: formattingSettings.NumUpDown;
    outlineRadiusBottomRight_1: formattingSettings.NumUpDown;
    fontFamily_1: formattingSettings.FontPicker;
    fontSize_1: formattingSettings.NumUpDown;
    fontColor_1: formattingSettings.ColorPicker;
    fontBold_1: formattingSettings.ToggleSwitch;
    fontItalic_1: formattingSettings.ToggleSwitch;
    fontUnderline_1: formattingSettings.ToggleSwitch;
    wordWrap_1: formattingSettings.ToggleSwitch;
    position_1: formattingSettings.ItemDropdown;
    stepIndentation_1: formattingSettings.NumUpDown;
    enableSelection_1: formattingSettings.ToggleSwitch;
    selectionType_1: formattingSettings.ItemDropdown;
    selectedFillColor_1: formattingSettings.ColorPicker;
    selectedFillOpacity_1: formattingSettings.NumUpDown;
    selectedOutline_1: formattingSettings.ToggleSwitch;
    selectedOutlineColor_1: formattingSettings.ColorPicker;
    selectedOutlineThickness_1: formattingSettings.NumUpDown;
    selectedOutlineRadius_1: formattingSettings.NumUpDown;
    fillColor_2: formattingSettings.ColorPicker;
    fillOpacity_2: formattingSettings.NumUpDown;
    bandedFill_2: formattingSettings.ToggleSwitch;
    bandedFillColor_2: formattingSettings.ColorPicker;
    bandedFillOpacity_2: formattingSettings.NumUpDown;
    outlineColor_2: formattingSettings.ColorPicker;
    outlineThickness_2: formattingSettings.NumUpDown;
    outlineLeft_2: formattingSettings.ToggleSwitch;
    outlineRight_2: formattingSettings.ToggleSwitch;
    outlineTop_2: formattingSettings.ToggleSwitch;
    outlineBottom_2: formattingSettings.ToggleSwitch;
    outlineRadiusTopLeft_2: formattingSettings.NumUpDown;
    outlineRadiusTopRight_2: formattingSettings.NumUpDown;
    outlineRadiusBottomLeft_2: formattingSettings.NumUpDown;
    outlineRadiusBottomRight_2: formattingSettings.NumUpDown;
    fontFamily_2: formattingSettings.FontPicker;
    fontSize_2: formattingSettings.NumUpDown;
    fontColor_2: formattingSettings.ColorPicker;
    fontBold_2: formattingSettings.ToggleSwitch;
    fontItalic_2: formattingSettings.ToggleSwitch;
    fontUnderline_2: formattingSettings.ToggleSwitch;
    wordWrap_2: formattingSettings.ToggleSwitch;
    position_2: formattingSettings.ItemDropdown;
    stepIndentation_2: formattingSettings.NumUpDown;
    enableSelection_2: formattingSettings.ToggleSwitch;
    selectionType_2: formattingSettings.ItemDropdown;
    selectedFillColor_2: formattingSettings.ColorPicker;
    selectedFillOpacity_2: formattingSettings.NumUpDown;
    selectedOutline_2: formattingSettings.ToggleSwitch;
    selectedOutlineColor_2: formattingSettings.ColorPicker;
    selectedOutlineThickness_2: formattingSettings.NumUpDown;
    selectedOutlineRadius_2: formattingSettings.NumUpDown;
    fillColor_3: formattingSettings.ColorPicker;
    fillOpacity_3: formattingSettings.NumUpDown;
    bandedFill_3: formattingSettings.ToggleSwitch;
    bandedFillColor_3: formattingSettings.ColorPicker;
    bandedFillOpacity_3: formattingSettings.NumUpDown;
    outlineColor_3: formattingSettings.ColorPicker;
    outlineThickness_3: formattingSettings.NumUpDown;
    outlineLeft_3: formattingSettings.ToggleSwitch;
    outlineRight_3: formattingSettings.ToggleSwitch;
    outlineTop_3: formattingSettings.ToggleSwitch;
    outlineBottom_3: formattingSettings.ToggleSwitch;
    outlineRadiusTopLeft_3: formattingSettings.NumUpDown;
    outlineRadiusTopRight_3: formattingSettings.NumUpDown;
    outlineRadiusBottomLeft_3: formattingSettings.NumUpDown;
    outlineRadiusBottomRight_3: formattingSettings.NumUpDown;
    fontFamily_3: formattingSettings.FontPicker;
    fontSize_3: formattingSettings.NumUpDown;
    fontColor_3: formattingSettings.ColorPicker;
    fontBold_3: formattingSettings.ToggleSwitch;
    fontItalic_3: formattingSettings.ToggleSwitch;
    fontUnderline_3: formattingSettings.ToggleSwitch;
    wordWrap_3: formattingSettings.ToggleSwitch;
    position_3: formattingSettings.ItemDropdown;
    stepIndentation_3: formattingSettings.NumUpDown;
    enableSelection_3: formattingSettings.ToggleSwitch;
    selectionType_3: formattingSettings.ItemDropdown;
    selectedFillColor_3: formattingSettings.ColorPicker;
    selectedFillOpacity_3: formattingSettings.NumUpDown;
    selectedOutline_3: formattingSettings.ToggleSwitch;
    selectedOutlineColor_3: formattingSettings.ColorPicker;
    selectedOutlineThickness_3: formattingSettings.NumUpDown;
    selectedOutlineRadius_3: formattingSettings.NumUpDown;
    name: string;
    displayName: string;
    slices: Array<FormattingSettingsSlice>;
}
export declare class ValueSettings extends FormattingSettingsCard {
    valueIndex: formattingSettings.ItemDropdown;
    showUnits_1: formattingSettings.ToggleSwitch;
    unitsSpacer_1: formattingSettings.ToggleSwitch;
    unitsFontFamily_1: formattingSettings.FontPicker;
    unitsFontSize_1: formattingSettings.NumUpDown;
    unitsFontColor_1: formattingSettings.ColorPicker;
    unitsFontBold_1: formattingSettings.ToggleSwitch;
    unitsFontItalic_1: formattingSettings.ToggleSwitch;
    unitsFontUnderline_1: formattingSettings.ToggleSwitch;
    fillColor_1: formattingSettings.ColorPicker;
    fillOpacity_1: formattingSettings.NumUpDown;
    outlineColor_1: formattingSettings.ColorPicker;
    outlineThickness_1: formattingSettings.NumUpDown;
    outlineLeft_1: formattingSettings.ToggleSwitch;
    outlineRight_1: formattingSettings.ToggleSwitch;
    outlineTop_1: formattingSettings.ToggleSwitch;
    outlineBottom_1: formattingSettings.ToggleSwitch;
    outlineRadiusTopLeft_1: formattingSettings.NumUpDown;
    outlineRadiusTopRight_1: formattingSettings.NumUpDown;
    outlineRadiusBottomLeft_1: formattingSettings.NumUpDown;
    outlineRadiusBottomRight_1: formattingSettings.NumUpDown;
    fontFamily_1: formattingSettings.FontPicker;
    fontSize_1: formattingSettings.NumUpDown;
    fontColor_1: formattingSettings.ColorPicker;
    fontBold_1: formattingSettings.ToggleSwitch;
    fontItalic_1: formattingSettings.ToggleSwitch;
    fontUnderline_1: formattingSettings.ToggleSwitch;
    wordWrap_1: formattingSettings.ToggleSwitch;
    position_1: formattingSettings.ItemDropdown;
    stepIndentation_1: formattingSettings.NumUpDown;
    showSortIcon_1: formattingSettings.ToggleSwitch;
    iconColor_1: formattingSettings.ColorPicker;
    iconPosition_1: formattingSettings.ItemDropdown;
    showUnits_2: formattingSettings.ToggleSwitch;
    unitsSpacer_2: formattingSettings.ToggleSwitch;
    unitsFontFamily_2: formattingSettings.FontPicker;
    unitsFontSize_2: formattingSettings.NumUpDown;
    unitsFontColor_2: formattingSettings.ColorPicker;
    unitsFontBold_2: formattingSettings.ToggleSwitch;
    unitsFontItalic_2: formattingSettings.ToggleSwitch;
    unitsFontUnderline_2: formattingSettings.ToggleSwitch;
    fillColor_2: formattingSettings.ColorPicker;
    fillOpacity_2: formattingSettings.NumUpDown;
    outlineColor_2: formattingSettings.ColorPicker;
    outlineThickness_2: formattingSettings.NumUpDown;
    outlineLeft_2: formattingSettings.ToggleSwitch;
    outlineRight_2: formattingSettings.ToggleSwitch;
    outlineTop_2: formattingSettings.ToggleSwitch;
    outlineBottom_2: formattingSettings.ToggleSwitch;
    outlineRadiusTopLeft_2: formattingSettings.NumUpDown;
    outlineRadiusTopRight_2: formattingSettings.NumUpDown;
    outlineRadiusBottomLeft_2: formattingSettings.NumUpDown;
    outlineRadiusBottomRight_2: formattingSettings.NumUpDown;
    fontFamily_2: formattingSettings.FontPicker;
    fontSize_2: formattingSettings.NumUpDown;
    fontColor_2: formattingSettings.ColorPicker;
    fontBold_2: formattingSettings.ToggleSwitch;
    fontItalic_2: formattingSettings.ToggleSwitch;
    fontUnderline_2: formattingSettings.ToggleSwitch;
    wordWrap_2: formattingSettings.ToggleSwitch;
    position_2: formattingSettings.ItemDropdown;
    stepIndentation_2: formattingSettings.NumUpDown;
    showSortIcon_2: formattingSettings.ToggleSwitch;
    iconColor_2: formattingSettings.ColorPicker;
    iconPosition_2: formattingSettings.ItemDropdown;
    showUnits_3: formattingSettings.ToggleSwitch;
    unitsSpacer_3: formattingSettings.ToggleSwitch;
    unitsFontFamily_3: formattingSettings.FontPicker;
    unitsFontSize_3: formattingSettings.NumUpDown;
    unitsFontColor_3: formattingSettings.ColorPicker;
    unitsFontBold_3: formattingSettings.ToggleSwitch;
    unitsFontItalic_3: formattingSettings.ToggleSwitch;
    unitsFontUnderline_3: formattingSettings.ToggleSwitch;
    fillColor_3: formattingSettings.ColorPicker;
    fillOpacity_3: formattingSettings.NumUpDown;
    outlineColor_3: formattingSettings.ColorPicker;
    outlineThickness_3: formattingSettings.NumUpDown;
    outlineLeft_3: formattingSettings.ToggleSwitch;
    outlineRight_3: formattingSettings.ToggleSwitch;
    outlineTop_3: formattingSettings.ToggleSwitch;
    outlineBottom_3: formattingSettings.ToggleSwitch;
    outlineRadiusTopLeft_3: formattingSettings.NumUpDown;
    outlineRadiusTopRight_3: formattingSettings.NumUpDown;
    outlineRadiusBottomLeft_3: formattingSettings.NumUpDown;
    outlineRadiusBottomRight_3: formattingSettings.NumUpDown;
    fontFamily_3: formattingSettings.FontPicker;
    fontSize_3: formattingSettings.NumUpDown;
    fontColor_3: formattingSettings.ColorPicker;
    fontBold_3: formattingSettings.ToggleSwitch;
    fontItalic_3: formattingSettings.ToggleSwitch;
    fontUnderline_3: formattingSettings.ToggleSwitch;
    wordWrap_3: formattingSettings.ToggleSwitch;
    position_3: formattingSettings.ItemDropdown;
    stepIndentation_3: formattingSettings.NumUpDown;
    showSortIcon_3: formattingSettings.ToggleSwitch;
    iconColor_3: formattingSettings.ColorPicker;
    iconPosition_3: formattingSettings.ItemDropdown;
    name: string;
    displayName: string;
    slices: Array<FormattingSettingsSlice>;
}
export declare class RowDetailsSettings extends FormattingSettingsCard {
    show: formattingSettings.ToggleSwitch;
    fontFamily: formattingSettings.FontPicker;
    fontSize: formattingSettings.NumUpDown;
    fontColor: formattingSettings.ColorPicker;
    fontBold: formattingSettings.ToggleSwitch;
    fontItalic: formattingSettings.ToggleSwitch;
    fontUnderline: formattingSettings.ToggleSwitch;
    wordWrap: formattingSettings.ToggleSwitch;
    position: formattingSettings.ItemDropdown;
    stepIndentation: formattingSettings.NumUpDown;
    name: string;
    displayName: string;
    slices: Array<FormattingSettingsSlice>;
}
export declare class ExpandCollapseAllSettings extends FormattingSettingsCard {
    expandCollapseIcon: formattingSettings.ItemDropdown;
    expandCollapseIconColor: formattingSettings.ColorPicker;
    expandCollapseFillColor: formattingSettings.ColorPicker;
    expandCollapseOutlineColor: formattingSettings.ColorPicker;
    expandCollapseOutlineThickness: formattingSettings.NumUpDown;
    expandCollapseOutlineRadius: formattingSettings.NumUpDown;
    name: string;
    displayName: string;
    slices: Array<FormattingSettingsSlice>;
}
/**
* BarChart settings model class
*
*/
export declare class ChartSettingsModel extends FormattingSettingsModel {
    columnStyleSettings: ColumnStyleSettings;
    rowLabelSettings: RowLabelSettings;
    rowValueSettings: RowValueSettings;
    valueSettings: ValueSettings;
    matrixSettings: matrixStyleSettings;
    rowDetailsSettings: RowDetailsSettings;
    expandCollapseAllSettings: ExpandCollapseAllSettings;
    cards: (RowLabelSettings | RowDetailsSettings | ColumnStyleSettings | RowValueSettings | ValueSettings | ExpandCollapseAllSettings)[];
    updateLevels: (columnLevels: any, rowLevels: any, valueLevels: any) => void;
}
