
import powerbi from "powerbi-visuals-api";
import * as React from "react";
import styled from 'styled-components';

import { WrappedTable } from './components/WrappedTable'
import { ChartSettingsModel } from "./settings";

// import "antd/dist/antd.css";

export interface State {
    matrix:powerbi.DataViewMatrix
    settings:ChartSettingsModel
}

export const initialState: State = {
    matrix:null,
    settings:null
}

export class ReactVisual extends React.Component<{}, State>{
    constructor(props: any){
        super(props);
        this.state = initialState;
    }

    

    private static updateCallback: (data: any) => void;

    public static update(newState: State) {
        if(typeof ReactVisual.updateCallback === 'function'){
            ReactVisual.updateCallback(newState);
        }
    }

    public state: State = initialState;

    public componentWillMount() {
        ReactVisual.updateCallback = (newState: State): void => { 
            this.setState(newState); 
        };
    }

    public componentWillUnmount() {
        ReactVisual.updateCallback = ()=>null;
    }

    render(){
        if ((this.state.matrix != null) && (this.state.settings != null)){
            return (
                <React.StrictMode>
                    <WrappedTable matrix = {this.state.matrix} settings = {this.state.settings} />
                </React.StrictMode>
            )
        } else {
            return <div></div>
        }
    }
}

export default ReactVisual;