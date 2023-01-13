import { ColumnsType } from "antd/lib/table";
import { RowTitle } from "../RowTitle";
import * as React from "react";
import { ColumnStyleSettings, matrixStyleSettings, RowDetailsSettings } from "../../settings"

type StyleType = {
  colStyle: Record<string, any>;
  valueStyle: Record<string, any>;
  rowLabelStyle: Record<string, any>;
  rowValueStyle: Record<string, any>;
};

/**
 * 格式化表格数字
 * @param text any
 * @param record object
 * @param index number
 * @returns string
 */
const formatCellValue =
  (valueType: powerbi.ValueTypeDescriptor) =>
  (text: any, record: any, index: number) => {
    if (text == null) {
      return text;
    }
    if (valueType.numeric || valueType.integer) {
      const num = Number(text);
      const [n, float] = num.toFixed(2).split(".");
      return [n.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"), float].join(".");
    } else {
      return text;
    }
    // return text
  };

// 生成jsx 样式
export const formatStyle = (level: number, obj: Record<string, any>) => {
  const itemStyle: Record<string, any> = {};
  for (const key in obj) {
    const [propertyKey, _level] = key.split("_");
    if (_level && level == +_level) {
      const val = obj[key];
      itemStyle[propertyKey] = val;
    }
  }
  return itemStyle;
};

/**
 *生成表格数据
 * @param rowsData
 * @returns
 */

export const genSource = (
  rowsData: powerbi.DataViewMatrix["rows"],
  valueSources: powerbi.DataViewMatrix["valueSources"],
  rowLabelSettings,
  rowDetailsSettings:RowDetailsSettings,
) => {
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
    subData.name = { text: currentTitle, index, key: `${currentTitle}-${node.level}-${index}`};
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
    if (node?.values) {
      const res = handlData(node.values!);
      Object.assign(subData, getValueByDataList(res));
    } else {
      if (!rowDetailsSettings.show.value||(rowDetailsSettings.show && node.level !== numOfLevels - 2)) {
        subData.children = node.children
          .filter((d) => !d.isSubtotal)
          .map((d, i) => getResult(d, JSON.stringify(d.identity), d.level, d.value, subData));
      }

      if (rowDetailsSettings.show.value && node.level == numOfLevels - 2) {
        Object.assign(subData, { rowDetail: node.children[0].value });
      }

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
      subData.push(getResult(d, JSON.stringify(d.identity), d.level, d.value || "Grand Total", subData))
    );

  return { subData: subData, defaultExpandRowKeys: defaultExpandRowKeys, rowKeys:rowKeys };
};

/**
 * 根据数据生成column配置项
 * @param columnData column 数据
 * @returns ColumnsType antd column配置数组
 */
const genColumnFirstHeader = (
  columnData: powerbi.DataViewMatrixNode[],
  valueSources: powerbi.DataViewMatrix["valueSources"],
  style: StyleType,
  valueTypes: powerbi.ValueTypeDescriptor[],
  valueSettings
): ColumnsType<ReturnType<typeof genDataSource>> => {
  let dataIndex = 0;
  let vsIndexRecord: Record<string, any> = {};

  // 渲染标题
  const renderTitle = (title: string, level: number) => {
    return <div className="h-full">{title}</div>;
  };
  const genValueSourceColumn = (level: number, valueSettings) => {
    const children: ColumnsType = [];
    valueSources.forEach((vs, i) => {
      let key = i + "";
      if (!(key in vsIndexRecord)) {
        vsIndexRecord[key] = 0;
      }
      const indexKey = `${key}-${vsIndexRecord[key]}`;
      children.push({
        className: `matrix-col matrix-col-value matrix-col-value-${i + 1}`,
        title: ({ sortColumns }) => {
          const sortedColumn = sortColumns?.find(
            ({ column }) => column.dataIndex === indexKey
          );
          return (
            <div className="h-full">
              {sortedColumn
                ? sortedColumn.order === "ascend"
                  ? // <SortUpIcon />
                    ""
                  : // <SortDownIcon />
                    ""
                : ""}
              {vs.displayName}
            </div>
          );
        },
        dataIndex: indexKey,
        sorter: valueSettings[i].showSortIcon
          ? (a, b) => a[indexKey] - b[indexKey]
          : false,
        render(value, record, index) {
          const val = formatCellValue(valueTypes[i])(value, record, index);
          return <div>{val}</div>;
        },
      });
      vsIndexRecord[key]++;
    });

    return children;
  };

  const handle = (data: powerbi.DataViewMatrixNode[], valueSettings) => {
    const column: ColumnsType<ReturnType<typeof genDataSource>> = [];
    data.forEach((item, i) => {
      const options: Record<string, any> = {
        className: `matrix-col matrix-col-cat matrix-col-cat-${item.level + 1}`,
      };
      // 如果是统计列 只会有一层children 不用深度递归
      if (item.isSubtotal) {
        options.title = renderTitle("Total", item.level!);
        const children = genValueSourceColumn(item.level!, valueSettings);
        options.children = children;
        options.render = formatCellValue;
        column.push(options);
      } else {
        // 递归生成column [Edited]
        if (item.value) {
          options.title = renderTitle(item.value + "", item.level!);
          if (!item?.children?.at(0)?.value) {
            const children = genValueSourceColumn(item.level!, valueSettings);
            options.children = children;
          } else if (!item.children) {
            const children = genValueSourceColumn(0, valueSettings);
            options.children = children;
          } else {
            options.children = handle(item.children, valueSettings);
          }
          column.push(options);
        }
      }
    });
    return column;
  };

  return handle(columnData, valueSettings);
};
/**
 *
 * @param rowsData
 * @returns
 */
const genDataSource = (
  rowsData: powerbi.DataViewMatrix["rows"]["root"]["children"]
) => {
  return rowsData!.map((item, index) => {
    const subData: powerbi.PrimitiveValue[] = [];
    const idx = Object.keys(item.values!);
    idx.forEach((i) => {
      const val = item.values![i].value!;
      subData.push(val);
    });
    return {
      name: item.isSubtotal ? "Grand Total" : item.value,
      ...subData,
    };
  });
};

/**
 * 生成valueFirst 模式column配置项
 * @param columnData column 数据
 * @returns ColumnsType antd column配置数组
 */
const genValueFirstHeader = (
  columnData: powerbi.DataViewMatrixNode[],
  valueSources: powerbi.DataViewMatrix["valueSources"],
  style: StyleType,
  valueTypes: powerbi.ValueTypeDescriptor[],
  valueSettings: any
): ColumnsType<ReturnType<typeof genDataSource>> => {
  const column: ColumnsType<ReturnType<typeof genDataSource>> = [];
  let dataIndex = 0,
    vsIndex = 0;
  const handle = (
    data: powerbi.DataViewMatrixNode[],
    vIndex: number,
    valueSetting
  ) => {
    const children: ColumnsType = [];
    data.forEach((item, i) => {
      const options: Record<string, any> = {
        className: `matrix-col matrix-col-cat matrix-col-cat-${item.level + 1}`,
      };
      // 如果是统计列 只会有一层children 不用深度递归
      if (item.isSubtotal) {
        options.title = "Total";
        children.push(options);
        const indexKey = `${vIndex}-${dataIndex}`;
        options.dataIndex = indexKey;
        options.render = formatCellValue(valueTypes[vIndex]);
        options.sorter = valueSetting.showSortIcon
          ? (a, b) => a[indexKey] - b[indexKey]
          : false;
        ++dataIndex;
      } else {
        // 递归生成column
        if (item.value) {
          options.title = item.value;
          options.key = item.value;
          if (!item?.children?.at(0)?.value) {
            // const firstChild = item.children.at(0);
            // if (!firstChild?.value) {
            // options.children = handle(valueSources);
            const indexKey = `${vIndex}-${dataIndex}`;
            options.dataIndex = indexKey;
            options.render = formatCellValue(valueTypes[vIndex]);
            options.sorter = valueSetting.showSortIcon
              ? (a, b) => a[indexKey] - b[indexKey]
              : false;
            ++dataIndex;
          } else if (!item?.children) {
            const indexKey = `${vIndex}-${dataIndex}`;
            options.dataIndex = indexKey;
            options.render = formatCellValue(valueTypes[vIndex]);
            options.sorter = valueSetting.showSortIcon
              ? (a, b) => a[indexKey] - b[indexKey]
              : false;
            ++dataIndex;
          } else {
            options.children = handle(item.children, vIndex, valueSetting);
          }
        }
        children.push(options);
        // }
      }
    });
    return children;
  };
  valueSources.forEach((vs, i) => {
    vsIndex = i;
    dataIndex = 0;
    const col: Record<string, any> = {
      title: vs.displayName,
      key: vs.displayName,
      className: `matrix-col matrix-col-value matrix-col-value-${i + 1}`,
    };
    col.children = handle(columnData, vsIndex, valueSettings[i]);
    column.push(col);
  });

  return column;
};

const string2cssProperty = (key: string) => {
  switch (key) {
    case "fontItalic":
      return "fontStyle";
    case "fillColor":
      return "background";
    case "fontBold":
      return "fontWeight";
    case "fontColor":
      return "color";
    case "position":
      return "textAlign";
    default:
      return key;
  }
};

export const filterStyle = (columnStyle: Record<string, any>) => {
  const style: Record<string, any> = {};

  const keys = [
    "wordWrap",
    "position",
    "fillColor",
    "fontFamily",
    "fontSize",
    "fontColor",
    "fontBold",
    "fontItalic",
  ];
  for (const key in columnStyle) {
    if (Object.prototype.hasOwnProperty.call(columnStyle, key)) {
      // 分割key
      const [styleName, index] = key.split("_");
      if (keys.includes(styleName)) {
        const element = columnStyle[key];
        let val: any;
        // 判断值类型
        const valueType = typeof element.value;
        if (valueType == "object") {
          val = element.value?.value;
        } else {
          val = element.value;
        }
        if (styleName === "fontBold") {
          val = val ? "bold" : "normal";
        } else if (styleName === "fontItalic") {
          val = val ? "italic" : "normal";
        } else if (styleName === "position") {
          val = val.toLowerCase();
        } else if (styleName === "wordWrap") {
          val = val ? "break-word" : "normal";
        }
        style[`${string2cssProperty(styleName)}_${+index - 1}`] = val;
      }
    }
  }
  return style;
};

/**
 *生成Table需要的data和column
 * @param propsData powerbi.DataViewMatrix data
 * @param type 排版模式
 */
export const genTableData = (
  propsData: powerbi.DataViewMatrix,
  type: "columnFirst" | "valueFirst" = "columnFirst",
  formattings: any[],
  valueSettings,
  rowLabelSettings,
  matrixSettings:any,
  rowDetailsSettings:RowDetailsSettings,
  columnStyleSettings:ColumnStyleSettings,
  updateDefaultExpandRowKeys,
  defaultExpandRowKeys
) => {
  const tableKey = `${Math.random()}`;
  const { valueSources, rows, columns: propsColumns } = propsData;
  const valueTypes: powerbi.ValueTypeDescriptor[] = propsData.valueSources.map(
    (d) => d.type
  );
  const source = genSource(rows, valueSources, rowLabelSettings,rowDetailsSettings);
  const data = source.subData;
  // const defaultExpandRowKeys = source.defaultExpandRowKeys;
  // const data = genSource(rows.root, valueSources)
  const colStyle = filterStyle(formattings[0]);
  const rowLabelStyle = filterStyle(formattings[1]);
  const rowValueStyle = filterStyle(formattings[2]);
  const valueStyle = filterStyle(formattings[3]);

  // For titles
  const numOfLevels = propsData.columns.levels.length
  const headerRowHeight = columnStyleSettings.headerRowHeight.value + 2 * columnStyleSettings.headerRowPadding.value
  const style: StyleType = {
    colStyle,
    valueStyle,
    rowLabelStyle,
    rowValueStyle,
  };
  const columns =
    type === "columnFirst"
      ? genColumnFirstHeader(
          propsColumns.root.children!,
          valueSources,
          style,
          valueTypes,
          valueSettings
        )
      : genValueFirstHeader(
          propsColumns.root.children!,
          valueSources,
          style,
          valueTypes,
          valueSettings
        );

  return {
    columns: [
      {
        dataIndex: ["name", "text"],
        width: 150,
        title: () => {
          return <RowTitle numOfLevels={numOfLevels} headerRowHeight = {headerRowHeight} rowKeys = {source.rowKeys} updateDefaultExpandRowKeys = {updateDefaultExpandRowKeys} defaultExpandRowKeys = {defaultExpandRowKeys}/>;
        },
        sorter: (a, b) => {
          if (
            a.name === data[data.length - 1].name ||
            b.name === data[data.length - 1].name
          )
            return 0;
          return a["text"] == "Grand Total"
            ? 1
            : a["text"] > b["text"]
            ? 1
            : -1;
        },
        render: (text: string, record: Record<string, any>) => {
          return (
            <div className="row-label">
              {text}
              {Object.keys(record).indexOf("rowDetail") > -1 ? (
                <p className="row-label-detail">{record["rowDetail"]}</p>
              ) : null}
            </div>
          );
        },
      },
      ...columns,
    ],
    data,
    defaultExpandRowKeys,
    tableKey,
  };
};
