import { ColumnStyleSettings, RowDetailsSettings } from "../../settings";
export declare const formatStyle: (level: number, obj: Record<string, any>) => Record<string, any>;
/**
 *生成表格数据
 * @param rowsData
 * @returns
 */
export declare const genSource: (rowsData: powerbi.DataViewMatrix["rows"], valueSources: powerbi.DataViewMatrix["valueSources"], rowLabelSettings: any, rowDetailsSettings: RowDetailsSettings) => {
    subData: any[];
    defaultExpandRowKeys: any[];
    rowKeys: any[];
};
export declare const filterStyle: (columnStyle: Record<string, any>) => Record<string, any>;
/**
 *生成Table需要的data和column
 * @param propsData powerbi.DataViewMatrix data
 * @param type 排版模式
 */
export declare const genTableData: (propsData: powerbi.DataViewMatrix, type: "columnFirst" | "valueFirst", formattings: any[], valueSettings: any, rowLabelSettings: any, matrixSettings: any, rowDetailsSettings: RowDetailsSettings, columnStyleSettings: ColumnStyleSettings, updateDefaultExpandRowKeys: any, defaultExpandRowKeys: any) => {
    columns: (import("antd/lib/table").ColumnGroupType<{
        length: number;
        toString(): string;
        toLocaleString(): string;
        pop(): powerbi.PrimitiveValue;
        push(...items: powerbi.PrimitiveValue[]): number;
        concat(...items: ConcatArray<powerbi.PrimitiveValue>[]): powerbi.PrimitiveValue[];
        concat(...items: (powerbi.PrimitiveValue | ConcatArray<powerbi.PrimitiveValue>)[]): powerbi.PrimitiveValue[];
        join(separator?: string): string;
        reverse(): powerbi.PrimitiveValue[];
        shift(): powerbi.PrimitiveValue;
        slice(start?: number, end?: number): powerbi.PrimitiveValue[];
        sort(compareFn?: (a: powerbi.PrimitiveValue, b: powerbi.PrimitiveValue) => number): powerbi.PrimitiveValue[];
        splice(start: number, deleteCount?: number): powerbi.PrimitiveValue[];
        splice(start: number, deleteCount: number, ...items: powerbi.PrimitiveValue[]): powerbi.PrimitiveValue[];
        unshift(...items: powerbi.PrimitiveValue[]): number;
        indexOf(searchElement: powerbi.PrimitiveValue, fromIndex?: number): number;
        lastIndexOf(searchElement: powerbi.PrimitiveValue, fromIndex?: number): number;
        every<S extends powerbi.PrimitiveValue>(predicate: (value: powerbi.PrimitiveValue, index: number, array: powerbi.PrimitiveValue[]) => value is S, thisArg?: any): this is S[];
        every(predicate: (value: powerbi.PrimitiveValue, index: number, array: powerbi.PrimitiveValue[]) => unknown, thisArg?: any): boolean;
        some(predicate: (value: powerbi.PrimitiveValue, index: number, array: powerbi.PrimitiveValue[]) => unknown, thisArg?: any): boolean;
        forEach(callbackfn: (value: powerbi.PrimitiveValue, index: number, array: powerbi.PrimitiveValue[]) => void, thisArg?: any): void;
        map<U>(callbackfn: (value: powerbi.PrimitiveValue, index: number, array: powerbi.PrimitiveValue[]) => U, thisArg?: any): U[];
        filter<S_1 extends powerbi.PrimitiveValue>(predicate: (value: powerbi.PrimitiveValue, index: number, array: powerbi.PrimitiveValue[]) => value is S_1, thisArg?: any): S_1[];
        filter(predicate: (value: powerbi.PrimitiveValue, index: number, array: powerbi.PrimitiveValue[]) => unknown, thisArg?: any): powerbi.PrimitiveValue[];
        reduce(callbackfn: (previousValue: powerbi.PrimitiveValue, currentValue: powerbi.PrimitiveValue, currentIndex: number, array: powerbi.PrimitiveValue[]) => powerbi.PrimitiveValue): powerbi.PrimitiveValue;
        reduce(callbackfn: (previousValue: powerbi.PrimitiveValue, currentValue: powerbi.PrimitiveValue, currentIndex: number, array: powerbi.PrimitiveValue[]) => powerbi.PrimitiveValue, initialValue: powerbi.PrimitiveValue): powerbi.PrimitiveValue;
        reduce<U_1>(callbackfn: (previousValue: U_1, currentValue: powerbi.PrimitiveValue, currentIndex: number, array: powerbi.PrimitiveValue[]) => U_1, initialValue: U_1): U_1;
        reduceRight(callbackfn: (previousValue: powerbi.PrimitiveValue, currentValue: powerbi.PrimitiveValue, currentIndex: number, array: powerbi.PrimitiveValue[]) => powerbi.PrimitiveValue): powerbi.PrimitiveValue;
        reduceRight(callbackfn: (previousValue: powerbi.PrimitiveValue, currentValue: powerbi.PrimitiveValue, currentIndex: number, array: powerbi.PrimitiveValue[]) => powerbi.PrimitiveValue, initialValue: powerbi.PrimitiveValue): powerbi.PrimitiveValue;
        reduceRight<U_2>(callbackfn: (previousValue: U_2, currentValue: powerbi.PrimitiveValue, currentIndex: number, array: powerbi.PrimitiveValue[]) => U_2, initialValue: U_2): U_2;
        find<S_2 extends powerbi.PrimitiveValue>(predicate: (this: void, value: powerbi.PrimitiveValue, index: number, obj: powerbi.PrimitiveValue[]) => value is S_2, thisArg?: any): S_2;
        find(predicate: (value: powerbi.PrimitiveValue, index: number, obj: powerbi.PrimitiveValue[]) => unknown, thisArg?: any): powerbi.PrimitiveValue;
        findIndex(predicate: (value: powerbi.PrimitiveValue, index: number, obj: powerbi.PrimitiveValue[]) => unknown, thisArg?: any): number;
        fill(value: powerbi.PrimitiveValue, start?: number, end?: number): powerbi.PrimitiveValue[];
        copyWithin(target: number, start: number, end?: number): powerbi.PrimitiveValue[];
        entries(): IterableIterator<[number, powerbi.PrimitiveValue]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<powerbi.PrimitiveValue>;
        includes(searchElement: powerbi.PrimitiveValue, fromIndex?: number): boolean;
        flatMap<U_3, This = undefined>(callback: (this: This, value: powerbi.PrimitiveValue, index: number, array: powerbi.PrimitiveValue[]) => U_3 | readonly U_3[], thisArg?: This): U_3[];
        flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[];
        at(index: number): powerbi.PrimitiveValue;
        [Symbol.iterator](): IterableIterator<powerbi.PrimitiveValue>;
        [Symbol.unscopables](): {
            copyWithin: boolean;
            entries: boolean;
            fill: boolean;
            find: boolean;
            findIndex: boolean;
            keys: boolean;
            values: boolean;
        };
        name: powerbi.PrimitiveValue;
    }[]> | import("antd/lib/table").ColumnType<{
        length: number;
        toString(): string;
        toLocaleString(): string;
        pop(): powerbi.PrimitiveValue;
        push(...items: powerbi.PrimitiveValue[]): number;
        concat(...items: ConcatArray<powerbi.PrimitiveValue>[]): powerbi.PrimitiveValue[];
        concat(...items: (powerbi.PrimitiveValue | ConcatArray<powerbi.PrimitiveValue>)[]): powerbi.PrimitiveValue[];
        join(separator?: string): string;
        reverse(): powerbi.PrimitiveValue[];
        shift(): powerbi.PrimitiveValue;
        slice(start?: number, end?: number): powerbi.PrimitiveValue[];
        sort(compareFn?: (a: powerbi.PrimitiveValue, b: powerbi.PrimitiveValue) => number): powerbi.PrimitiveValue[];
        splice(start: number, deleteCount?: number): powerbi.PrimitiveValue[];
        splice(start: number, deleteCount: number, ...items: powerbi.PrimitiveValue[]): powerbi.PrimitiveValue[];
        unshift(...items: powerbi.PrimitiveValue[]): number;
        indexOf(searchElement: powerbi.PrimitiveValue, fromIndex?: number): number;
        lastIndexOf(searchElement: powerbi.PrimitiveValue, fromIndex?: number): number;
        every<S extends powerbi.PrimitiveValue>(predicate: (value: powerbi.PrimitiveValue, index: number, array: powerbi.PrimitiveValue[]) => value is S, thisArg?: any): this is S[];
        every(predicate: (value: powerbi.PrimitiveValue, index: number, array: powerbi.PrimitiveValue[]) => unknown, thisArg?: any): boolean;
        some(predicate: (value: powerbi.PrimitiveValue, index: number, array: powerbi.PrimitiveValue[]) => unknown, thisArg?: any): boolean;
        forEach(callbackfn: (value: powerbi.PrimitiveValue, index: number, array: powerbi.PrimitiveValue[]) => void, thisArg?: any): void;
        map<U>(callbackfn: (value: powerbi.PrimitiveValue, index: number, array: powerbi.PrimitiveValue[]) => U, thisArg?: any): U[];
        filter<S_1 extends powerbi.PrimitiveValue>(predicate: (value: powerbi.PrimitiveValue, index: number, array: powerbi.PrimitiveValue[]) => value is S_1, thisArg?: any): S_1[];
        filter(predicate: (value: powerbi.PrimitiveValue, index: number, array: powerbi.PrimitiveValue[]) => unknown, thisArg?: any): powerbi.PrimitiveValue[];
        reduce(callbackfn: (previousValue: powerbi.PrimitiveValue, currentValue: powerbi.PrimitiveValue, currentIndex: number, array: powerbi.PrimitiveValue[]) => powerbi.PrimitiveValue): powerbi.PrimitiveValue;
        reduce(callbackfn: (previousValue: powerbi.PrimitiveValue, currentValue: powerbi.PrimitiveValue, currentIndex: number, array: powerbi.PrimitiveValue[]) => powerbi.PrimitiveValue, initialValue: powerbi.PrimitiveValue): powerbi.PrimitiveValue;
        reduce<U_1>(callbackfn: (previousValue: U_1, currentValue: powerbi.PrimitiveValue, currentIndex: number, array: powerbi.PrimitiveValue[]) => U_1, initialValue: U_1): U_1;
        reduceRight(callbackfn: (previousValue: powerbi.PrimitiveValue, currentValue: powerbi.PrimitiveValue, currentIndex: number, array: powerbi.PrimitiveValue[]) => powerbi.PrimitiveValue): powerbi.PrimitiveValue;
        reduceRight(callbackfn: (previousValue: powerbi.PrimitiveValue, currentValue: powerbi.PrimitiveValue, currentIndex: number, array: powerbi.PrimitiveValue[]) => powerbi.PrimitiveValue, initialValue: powerbi.PrimitiveValue): powerbi.PrimitiveValue;
        reduceRight<U_2>(callbackfn: (previousValue: U_2, currentValue: powerbi.PrimitiveValue, currentIndex: number, array: powerbi.PrimitiveValue[]) => U_2, initialValue: U_2): U_2;
        find<S_2 extends powerbi.PrimitiveValue>(predicate: (this: void, value: powerbi.PrimitiveValue, index: number, obj: powerbi.PrimitiveValue[]) => value is S_2, thisArg?: any): S_2;
        find(predicate: (value: powerbi.PrimitiveValue, index: number, obj: powerbi.PrimitiveValue[]) => unknown, thisArg?: any): powerbi.PrimitiveValue;
        findIndex(predicate: (value: powerbi.PrimitiveValue, index: number, obj: powerbi.PrimitiveValue[]) => unknown, thisArg?: any): number;
        fill(value: powerbi.PrimitiveValue, start?: number, end?: number): powerbi.PrimitiveValue[];
        copyWithin(target: number, start: number, end?: number): powerbi.PrimitiveValue[];
        entries(): IterableIterator<[number, powerbi.PrimitiveValue]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<powerbi.PrimitiveValue>;
        includes(searchElement: powerbi.PrimitiveValue, fromIndex?: number): boolean;
        flatMap<U_3, This = undefined>(callback: (this: This, value: powerbi.PrimitiveValue, index: number, array: powerbi.PrimitiveValue[]) => U_3 | readonly U_3[], thisArg?: This): U_3[];
        flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[];
        at(index: number): powerbi.PrimitiveValue;
        [Symbol.iterator](): IterableIterator<powerbi.PrimitiveValue>;
        [Symbol.unscopables](): {
            copyWithin: boolean;
            entries: boolean;
            fill: boolean;
            find: boolean;
            findIndex: boolean;
            keys: boolean;
            values: boolean;
        };
        name: powerbi.PrimitiveValue;
    }[]> | {
        dataIndex: string[];
        width: number;
        title: () => JSX.Element;
        sorter: (a: any, b: any) => 0 | 1 | -1;
        render: (text: string, record: Record<string, any>) => JSX.Element;
    })[];
    data: any[];
    defaultExpandRowKeys: any;
    tableKey: string;
};
