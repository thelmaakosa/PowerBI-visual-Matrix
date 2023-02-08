import powerbi from "powerbi-visuals-api";
import * as React from "react";
import styled from "styled-components";

// import { WrappedTable } from './components/WrappedTable'
import { MatrixTable, IProps } from "./components/MatrixTable";
import { ChartSettingsModel } from "./settings";

// import "antd/dist/antd.css";

export interface State extends IProps {
  // matrix:powerbi.DataViewMatrix
  // settings:ChartSettingsModel
  StyledDiv:any
}

export const initialState: State = {
  tableKey: null,
  columns: null,
  dataSource: null,
  defaultExpandRowKeys: null,
  rowKeys:null,
  numOfLevels:null,
  headerRowHeight:null,
  rowValueSettings:null,
  numberOfColumns:null,
  visualHeight:null,
  StyledDiv:null,
  showRowDetail:null
};

export class ReactVisual extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = initialState;
  }

  private static updateCallback: (data: any) => void;

  public static update(newState: State) {
    if (typeof ReactVisual.updateCallback === "function") {
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
    ReactVisual.updateCallback = () => null;
  }

  render() {
    if (this.state.tableKey) {
      return (
        <this.state.StyledDiv>
          <MatrixTable
            tableKey={this.state.tableKey}
            columns={this.state.columns}
            dataSource={this.state.dataSource}
            defaultExpandRowKeys={this.state.defaultExpandRowKeys}
            rowKeys = {this.state.rowKeys}
            numOfLevels = {this.state.numOfLevels}
            headerRowHeight = {this.state.headerRowHeight}
            rowValueSettings = {this.state.rowValueSettings}
            numberOfColumns = {this.state.numberOfColumns}
            visualHeight = {this.state.visualHeight}
            showRowDetail = {this.state.showRowDetail}
          />
        </this.state.StyledDiv>
      );
    } else {
      return <div></div>;
    }
  }
}

export default ReactVisual;
