import powerbi from "powerbi-visuals-api";
import * as React from "react";
import { ChartSettingsModel } from "./settings";
export interface State {
    matrix: powerbi.DataViewMatrix;
    settings: ChartSettingsModel;
}
export declare const initialState: State;
export declare class ReactVisual extends React.Component<{}, State> {
    constructor(props: any);
    private static updateCallback;
    static update(newState: State): void;
    state: State;
    componentWillMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default ReactVisual;
