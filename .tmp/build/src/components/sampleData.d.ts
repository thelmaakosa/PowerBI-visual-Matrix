/** 下面的信息不是所有的都是需要用到的。*/
export declare const sampleMatrix: {
    rows: {
        levels: {
            sources: {
                roles: {
                    category: boolean;
                };
                type: {
                    underlyingType: number;
                    category: any;
                    primitiveType: number;
                    extendedType: number;
                    categoryString: any;
                    text: boolean;
                    numeric: boolean;
                    integer: boolean;
                    bool: boolean;
                    dateTime: boolean;
                    duration: boolean;
                    binary: boolean;
                    json: boolean;
                    none: boolean;
                };
                displayName: string;
                queryName: string;
                expr: {
                    _kind: number;
                    source: {
                        _kind: number;
                        entity: string;
                        variable: string;
                        kind: number;
                    };
                    ref: string;
                    kind: number;
                };
                rolesIndex: {
                    category: number[];
                };
                index: number;
                identityExprs: {
                    _kind: number;
                    source: {
                        _kind: number;
                        entity: string;
                        kind: number;
                    };
                    ref: string;
                    kind: number;
                }[];
            }[];
        }[];
        root: {
            children: ({
                values: {
                    "0": {
                        value: number;
                    };
                    "1": {
                        valueSourceIndex: number;
                        value: number;
                    };
                    "2": {
                        value: number;
                    };
                    "3": {
                        valueSourceIndex: number;
                        value: number;
                    };
                    "4": {
                        value: number;
                    };
                    "5": {
                        valueSourceIndex: number;
                        value: number;
                    };
                    "6": {
                        value: number;
                    };
                    "7": {
                        valueSourceIndex: number;
                        value: number;
                    };
                    "8": {
                        value: number;
                    };
                    "9": {
                        valueSourceIndex: number;
                        value: number;
                    };
                    "10": {
                        value: number;
                    };
                    "11": {
                        valueSourceIndex: number;
                        value: number;
                    };
                    "12": {
                        value: number;
                    };
                    "13": {
                        valueSourceIndex: number;
                        value: number;
                    };
                };
                level: number;
                levelValues: {
                    value: string;
                    levelSourceIndex: number;
                }[];
                value: string;
                identity: {
                    identityIndex: number;
                };
                isSubtotal?: undefined;
            } | {
                values: {
                    "0": {
                        value: number;
                    };
                    "1": {
                        valueSourceIndex: number;
                        value: number;
                    };
                    "2": {
                        value: number;
                    };
                    "3": {
                        valueSourceIndex: number;
                        value: number;
                    };
                    "4": {
                        value: number;
                    };
                    "5": {
                        valueSourceIndex: number;
                        value: number;
                    };
                    "6": {
                        value: number;
                    };
                    "7": {
                        valueSourceIndex: number;
                        value: number;
                    };
                    "8": {
                        value: number;
                    };
                    "9": {
                        valueSourceIndex: number;
                        value: number;
                    };
                    "10": {
                        value: number;
                    };
                    "11": {
                        valueSourceIndex: number;
                        value: number;
                    };
                    "12": {
                        value: number;
                    };
                    "13": {
                        valueSourceIndex: number;
                        value: number;
                    };
                };
                level: number;
                isSubtotal: boolean;
                levelValues?: undefined;
                value?: undefined;
                identity?: undefined;
            })[];
            childIdentityFields: {
                _kind: number;
                source: {
                    _kind: number;
                    entity: string;
                    kind: number;
                };
                ref: string;
                kind: number;
            }[];
        };
    };
    columns: {
        levels: ({
            sources: {
                roles: {
                    Column: boolean;
                };
                type: {
                    underlyingType: number;
                    category: any;
                    primitiveType: number;
                    extendedType: number;
                    categoryString: any;
                    text: boolean;
                    numeric: boolean;
                    integer: boolean;
                    bool: boolean;
                    dateTime: boolean;
                    duration: boolean;
                    binary: boolean;
                    json: boolean;
                    none: boolean;
                };
                format: string;
                displayName: string;
                queryName: string;
                expr: {
                    _kind: number;
                    source: {
                        _kind: number;
                        entity: string;
                        variable: string;
                        kind: number;
                    };
                    ref: string;
                    kind: number;
                };
                rolesIndex: {
                    Column: number[];
                };
                index: number;
                identityExprs: {
                    _kind: number;
                    source: {
                        _kind: number;
                        entity: string;
                        kind: number;
                    };
                    ref: string;
                    kind: number;
                }[];
            }[];
        } | {
            sources: ({
                roles: {
                    measure: boolean;
                };
                type: {
                    underlyingType: number;
                    category: any;
                    primitiveType: number;
                    extendedType: number;
                    categoryString: any;
                    text: boolean;
                    numeric: boolean;
                    integer: boolean;
                    bool: boolean;
                    dateTime: boolean;
                    duration: boolean;
                    binary: boolean;
                    json: boolean;
                    none: boolean;
                };
                format: string;
                displayName: string;
                queryName: string;
                expr: {
                    _kind: number;
                    arg: {
                        _kind: number;
                        source: {
                            _kind: number;
                            entity: string;
                            variable: string;
                            kind: number;
                        };
                        ref: string;
                        kind: number;
                    };
                    func: number;
                    kind: number;
                };
                sort: number;
                sortOrder: number;
                rolesIndex: {
                    measure: number[];
                };
                index: number;
                isMeasure: boolean;
            } | {
                roles: {
                    measure: boolean;
                };
                type: {
                    underlyingType: number;
                    category: any;
                    primitiveType: number;
                    extendedType: number;
                    categoryString: any;
                    text: boolean;
                    numeric: boolean;
                    integer: boolean;
                    bool: boolean;
                    dateTime: boolean;
                    duration: boolean;
                    binary: boolean;
                    json: boolean;
                    none: boolean;
                };
                format: string;
                displayName: string;
                queryName: string;
                expr: {
                    _kind: number;
                    arg: {
                        _kind: number;
                        source: {
                            _kind: number;
                            entity: string;
                            variable: string;
                            kind: number;
                        };
                        ref: string;
                        kind: number;
                    };
                    func: number;
                    kind: number;
                };
                rolesIndex: {
                    measure: number[];
                };
                index: number;
                isMeasure: boolean;
                sort?: undefined;
                sortOrder?: undefined;
            })[];
        })[];
        root: {
            children: ({
                children: ({
                    children: ({
                        level: number;
                        levelSourceIndex?: undefined;
                    } | {
                        level: number;
                        levelSourceIndex: number;
                    })[];
                    level: number;
                    levelValues: {
                        value: number;
                        levelSourceIndex: number;
                    }[];
                    value: number;
                    identity: {
                        identityIndex: number;
                    };
                    isSubtotal?: undefined;
                } | {
                    children: ({
                        level: number;
                        isSubtotal: boolean;
                        levelSourceIndex?: undefined;
                    } | {
                        level: number;
                        isSubtotal: boolean;
                        levelSourceIndex: number;
                    })[];
                    level: number;
                    isSubtotal: boolean;
                    levelValues?: undefined;
                    value?: undefined;
                    identity?: undefined;
                })[];
                level: number;
                levelValues: {
                    value: number;
                    levelSourceIndex: number;
                }[];
                value: number;
                identity: {
                    identityIndex: number;
                };
                childIdentityFields: {
                    _kind: number;
                    source: {
                        _kind: number;
                        entity: string;
                        kind: number;
                    };
                    ref: string;
                    kind: number;
                }[];
                isSubtotal?: undefined;
            } | {
                children: ({
                    level: number;
                    isSubtotal: boolean;
                    levelSourceIndex?: undefined;
                } | {
                    level: number;
                    isSubtotal: boolean;
                    levelSourceIndex: number;
                })[];
                level: number;
                isSubtotal: boolean;
                levelValues?: undefined;
                value?: undefined;
                identity?: undefined;
                childIdentityFields?: undefined;
            })[];
            childIdentityFields: {
                _kind: number;
                source: {
                    _kind: number;
                    entity: string;
                    kind: number;
                };
                ref: string;
                kind: number;
            }[];
        };
    };
    valueSources: ({
        roles: {
            measure: boolean;
        };
        type: {
            underlyingType: number;
            category: any;
            primitiveType: number;
            extendedType: number;
            categoryString: any;
            text: boolean;
            numeric: boolean;
            integer: boolean;
            bool: boolean;
            dateTime: boolean;
            duration: boolean;
            binary: boolean;
            json: boolean;
            none: boolean;
        };
        format: string;
        displayName: string;
        queryName: string;
        expr: {
            _kind: number;
            arg: {
                _kind: number;
                source: {
                    _kind: number;
                    entity: string;
                    variable: string;
                    kind: number;
                };
                ref: string;
                kind: number;
            };
            func: number;
            kind: number;
        };
        sort: number;
        sortOrder: number;
        rolesIndex: {
            measure: number[];
        };
        index: number;
        isMeasure: boolean;
    } | {
        roles: {
            measure: boolean;
        };
        type: {
            underlyingType: number;
            category: any;
            primitiveType: number;
            extendedType: number;
            categoryString: any;
            text: boolean;
            numeric: boolean;
            integer: boolean;
            bool: boolean;
            dateTime: boolean;
            duration: boolean;
            binary: boolean;
            json: boolean;
            none: boolean;
        };
        format: string;
        displayName: string;
        queryName: string;
        expr: {
            _kind: number;
            arg: {
                _kind: number;
                source: {
                    _kind: number;
                    entity: string;
                    variable: string;
                    kind: number;
                };
                ref: string;
                kind: number;
            };
            func: number;
            kind: number;
        };
        rolesIndex: {
            measure: number[];
        };
        index: number;
        isMeasure: boolean;
        sort?: undefined;
        sortOrder?: undefined;
    })[];
};
export declare type MatrixColumnType = typeof sampleMatrix.columns;
