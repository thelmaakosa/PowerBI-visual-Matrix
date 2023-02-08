import * as React from "react";
import { IProps } from "./components/MatrixTable";
export interface State extends IProps {
    StyledDiv: any;
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
