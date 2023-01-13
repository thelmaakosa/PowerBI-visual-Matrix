/*! For license information please see visual.js.LICENSE.txt */
var Matrix4A257870E6784C63A9AFC94E65428613;(()=>{var e={86955:(e,t,n)=>{"use strict";n.d(t,{Zq:()=>a});var o=n(67294),r=n(95274);const i={matrix:null,settings:null};class a extends o.Component{constructor(e){super(e),this.state=i,this.state=i}static update(e){"function"==typeof a.updateCallback&&a.updateCallback(e)}componentWillMount(){a.updateCallback=e=>{this.setState(e)}}componentWillUnmount(){a.updateCallback=()=>null}render(){return null!=this.state.matrix&&null!=this.state.settings?o.createElement(o.StrictMode,null,o.createElement(r._,{matrix:this.state.matrix,settings:this.state.settings})):o.createElement("div",null)}}},29735:(e,t,n)=>{"use strict";n.d(t,{Z:()=>l});var o=n(67294),r=n(60328),i=n(81078),a=n(77919);const l=e=>{const t=e.matrix,[n,l]=(0,o.useState)((0,i.LC)(t.rows,t.valueSources,e.rowLabelSettings,e.rowDetailsSettings).defaultExpandRowKeys),s=(0,i.Zj)(t,e.mode,a.W,e.valueSettings,e.rowLabelSettings,e.matrixSettings,e.rowDetailsSettings,e.columnStyleSettings,l,n),[u,c]=(0,o.useState)(s.data),[d,p]=(0,o.useState)(s.tableKey),[f,m]=(0,o.useState)(s.columns),[h,v]=(0,o.useState)("");return(0,o.useEffect)((()=>{const o=(0,i.Zj)(t,e.mode,a.W,e.valueSettings,e.rowLabelSettings,e.matrixSettings,e.rowDetailsSettings,e.columnStyleSettings,l,n);c(o.data),l(o.defaultExpandRowKeys),p(o.tableKey),m(o.columns)}),[e.matrix,e.rowLabelSettings,e.valueSettings,e.rowValueSettings,JSON.stringify(n)]),o.createElement(r.Z,{key:d,rowKey:"rowKey",columns:f,dataSource:u,onRow:(t,n)=>({onClick(){var n;e.rowValueSettings[t.level].enableSelection&&(e.rowValueSettings[t.level].selectionType.indexOf("Move to Top")>-1&&((null===(n=t.parent)||void 0===n?void 0:n.children)?(t.parent.children=[t,...t.parent.children.filter((e=>e.rowKey!=t.rowKey))],c([...u])):(t.parent=[t,...t.parent.filter((e=>e.rowKey!=t.rowKey))],c([...t.parent]))),e.rowValueSettings[t.level].selectionType.indexOf("Highlight")>-1&&(t.rowKey==h?v(""):v(t.rowKey)))}}),scroll:{x:7500,y:500},pagination:!1,rowClassName:e=>e.rowKey==h?`${e.className} selected`:e.className,expandable:{defaultExpandedRowKeys:n}})}},79894:(e,t,n)=>{"use strict";n.d(t,{W:()=>r});var o=n(67294);const r=e=>{const[t,n]=o.useState(e.defaultExpandRowKeys.length>0?"expanded":"collapsed"),r=(0,o.useRef)(null);return o.useEffect((()=>{n(e.defaultExpandRowKeys.length>0?"expanded":"collapsed"),console.log(e.defaultExpandRowKeys,"props.defaultExpandRowKeys")}),[e.defaultExpandRowKeys]),o.createElement("div",{ref:r},o.createElement("div",{className:"expandClickableArea",style:{width:"75px",height:e.numOfLevels*e.headerRowHeight+"px",backgroundColor:"lightgreen",position:"fixed",top:"0px",left:"0px",zIndex:99,display:"flex",justifyContent:"flex-start",alignItems:"center",opacity:0},onClick:o=>{"collapsed"==t?(o.stopPropagation(),n("expanded"),e.updateDefaultExpandRowKeys(e.rowKeys)):(o.stopPropagation(),n("collapsed"),e.updateDefaultExpandRowKeys([]))}}),o.createElement("button",{type:"button",className:`ant-table-row-expand-icon ant-table-row-expand-icon-${t}`,"aria-label":"Collapse row","aria-expanded":"true"}),o.createElement("p",{style:{padding:" 0px 4px"}},"Row"))}},95274:(e,t,n)=>{"use strict";n.d(t,{_:()=>s});var o=n(67294),r=n(71893),i=n(27538),a=n(29735);const l=e=>`\n        ${(0,i.il)(e.fontBold.value,e.fontColor.value.value,e.fontFamily.value,e.fontItalic.value,e.fontSize.value,e.fontUnderline.value,e.position.value.value,e.stepIndentation.value)}\n    `,s=e=>{const t=(0,i.Bk)(e.settings.cards[0]),n=(0,i.Bk)(e.settings.cards[2]),s=(0,i.Bk)(e.settings.cards[3]),u=(0,i.Bk)(e.settings.cards[4]),c=e.settings.cards[5],d=e.settings.cards[2],p=e.settings.cards[3],f=e.settings.cards[5],m=n.map((e=>{return t=e,`\n        ${(0,i.il)(t.fontBold,t.fontColor,t.fontFamily,t.fontItalic,t.fontSize,t.fontUnderline,t.position,t.stepIndentation,t.wordWrap)}\n        ${(0,i.xI)(t.fillColor,t.fillOpacity)}\n        ${(0,i.dU)(t.outlineTop,t.outlineRight,t.outlineBottom,t.outlineLeft,t.outlineRadiusTopLeft,t.outlineRadiusTopRight,t.outlineRadiusBottomRight,t.outlineRadiusBottomLeft,t.outlineColor,t.outlineThickness)}\n    `;var t})),h=u.map((e=>{return t=e,`\n        ${(0,i.il)(t.fontBold,t.fontColor,t.fontFamily,t.fontItalic,t.fontSize,t.fontUnderline,t.position,t.stepIndentation,t.wordWrap)}\n        ${(0,i.xI)(t.fillColor,t.fillOpacity)}\n        ${(0,i.dU)(t.outlineTop,t.outlineRight,t.outlineBottom,t.outlineLeft,t.outlineRadiusTopLeft,t.outlineRadiusTopRight,t.outlineRadiusBottomRight,t.outlineRadiusBottomLeft,t.outlineColor,t.outlineThickness)}\n    `;var t})),v=t.map((e=>{return t=e,`\n        ${(0,i.il)(t.fontBold,t.fontColor,t.fontFamily,t.fontItalic,t.fontSize,t.fontUnderline,t.position,t.stepIndentation,t.wordWrap)}\n        ${(0,i.xI)(t.fillColor,t.fillOpacity)}\n        ${(0,i.dU)(t.outlineTop,t.outlineRight,t.outlineBottom,t.outlineLeft,t.outlineRadiusTopLeft,t.outlineRadiusTopRight,t.outlineRadiusBottomRight,t.outlineRadiusBottomLeft,t.outlineColor,t.outlineThickness)}\n    `;var t})),g=t.map((e=>{return t=e,(0,i.JT)(t.expandCollapseFillColor,t.expandCollapseIconColor,t.expandCollapseIcon,t.expandCollapseOutlineColor,t.expandCollapseOutlineRadius,t.expandCollapseOutlineThickness);var t})),y=t.map((e=>{return t=e,`\n        ${(0,i.Dr)(t.rowHeight,t.rowPadding)}\n    `;var t})),b=s.map((e=>{return t=e,`\n        ${(0,i.il)(t.fontBold,t.fontColor,t.fontFamily,t.fontItalic,t.fontSize,t.fontUnderline,t.position,t.stepIndentation,t.wordWrap)}\n        ${(0,i.xI)(t.fillColor,t.fillOpacity)}\n        ${(0,i.dU)(t.outlineTop,t.outlineRight,t.outlineBottom,t.outlineLeft,t.outlineRadiusTopLeft,t.outlineRadiusTopRight,t.outlineRadiusBottomRight,t.outlineRadiusBottomLeft,t.outlineColor,t.outlineThickness)}\n    `;var t})),w=s.map((e=>{return t=e,`\n        ${(0,i.dU)(t.selectedOutline,t.selectedOutline,t.selectedOutline,t.selectedOutline,t.selectedOutlineRadius,t.selectedOutlineRadius,t.selectedOutlineRadius,t.selectedOutlineRadius,t.selectedOutlineColor,t.selectedOutlineThickness)}\n        ${(0,i.xI)(t.selectedFillColor,t.selectedFillOpacity)}\n    `;var t})),Z=(0,i.JT)(f.expandCollapseFillColor.value.value,f.expandCollapseIconColor.value.value,f.expandCollapseIcon.value.value,f.expandCollapseOutlineColor.value.value,f.expandCollapseOutlineRadius.value,f.expandCollapseOutlineThickness.value),[C,x]=(0,o.useState)("columnFirst");o.useEffect((()=>{x(p.slices.filter((e=>"orderType"==e.name))[0].value.value)}),[e.settings]);const S=r.ZP.div`
    & .ant-table-container {
      & .ant-table-header {
        > table
          > thead
          > tr:nth-child(1)
          > th.ant-table-cell.ant-table-column-has-sorters
          > div
          > span.ant-table-column-title
          > div
          > button {
          ${Z}
        }
        & .ant-table-thead {
          & tr {
            height: ${e.settings.columnStyleSettings.headerRowHeight.value+2*e.settings.columnStyleSettings.headerRowPadding.value}px;
          }
        }
        & .matrix-col.matrix-col-cat.matrix-col-cat-1 {
          ${m[0]}
          padding-top: ${e.settings.columnStyleSettings.headerRowPadding.value}px !important;
          padding-bottom: ${e.settings.columnStyleSettings.headerRowPadding.value}px !important;
        }
        & .matrix-col.matrix-col-cat.matrix-col-cat-2 {
          ${m[1]}
          padding-top: ${e.settings.columnStyleSettings.headerRowPadding.value}px !important;
          padding-bottom: ${e.settings.columnStyleSettings.headerRowPadding.value}px !important;
        }
        & .matrix-col.matrix-col-cat.matrix-col-cat-3 {
          ${m[2]}
          padding-top: ${e.settings.columnStyleSettings.headerRowPadding.value}px !important;
          padding-bottom: ${e.settings.columnStyleSettings.headerRowPadding.value}px !important;
        }

        & .matrix-col.matrix-col-value.matrix-col-value-1 {
          ${h[0]}
          padding-top: ${e.settings.columnStyleSettings.headerRowPadding.value}px !important;
          padding-bottom: ${e.settings.columnStyleSettings.headerRowPadding.value}px !important;
        }
        & .matrix-col.matrix-col-value.matrix-col-value-2 {
          ${h[1]}
          padding-top: ${e.settings.columnStyleSettings.headerRowPadding.value}px !important;
          padding-bottom: ${e.settings.columnStyleSettings.headerRowPadding.value}px !important;
        }
        & .matrix-col.matrix-col-value.matrix-col-value-3 {
          ${h[2]}
          padding-top: ${e.settings.columnStyleSettings.headerRowPadding.value}px !important;
          padding-bottom: ${e.settings.columnStyleSettings.headerRowPadding.value}px !important;
        }
      }
      & .ant-table-body {
        & .ant-table-row.ant-table-row-level-0 td {
          ${y[0]}
        }
        & .ant-table-row.ant-table-row-level-1 td {
          ${y[1]}
        }
        & .ant-table-row.ant-table-row-level-2 td {
          ${y[2]}
        }

        &
          .ant-table-row.ant-table-row-level-0.selected
          td.ant-table-cell.matrix-col {
          ${w[0]}
        }
        &
          .ant-table-row.ant-table-row-level-1.selected
          td.ant-table-cell.matrix-col {
          ${w[1]}
        }
        &
          .ant-table-row.ant-table-row-level-2.selected
          td.ant-table-cell.matrix-col {
          ${w[2]}
        }

        & .ant-table-row.ant-table-row-level-0 td:not(:first-child) {
          ${b[0]}
        }
        & .ant-table-row.ant-table-row-level-1 td:not(:first-child) {
          ${b[1]}
        }
        & .ant-table-row.ant-table-row-level-2 td:not(:first-child) {
          ${b[2]}
        }

        & .ant-table-row.ant-table-row-level-0 td:first-child {
          display: flex;
          align-items: center;
          ${v[0]}
          > button.ant-table-row-expand-icon.ant-table-row-expand-icon-collapsed,.ant-table-row-expand-icon.ant-table-row-expand-icon-expanded {
            ${g[0]}
          }
          > .row-label .row-label-detail {
            ${l(e.settings.rowDetailsSettings)}
          }
        }
        & .ant-table-row.ant-table-row-level-1 td:first-child {
          display: flex;
          align-items: center;
          ${v[1]}
          > .ant-table-row-expand-icon.ant-table-row-expand-icon-collapsed,.ant-table-row-expand-icon.ant-table-row-expand-icon-expanded {
            ${g[1]}
          }
          > .row-label .row-label-detail {
            ${l(e.settings.rowDetailsSettings)}
          }
        }
        & .ant-table-row.ant-table-row-level-2 td:first-child {
          display: flex;
          align-items: center;
          ${v[2]}
          > .ant-table-row-expand-icon.ant-table-row-expand-icon-collapsed,.ant-table-row-expand-icon.ant-table-row-expand-icon-expanded {
            ${g[2]}
          }
          > .row-label .row-label-detail {
            ${l(e.settings.rowDetailsSettings)}
          }
        }

        & .ant-table-row.ant-table-row-level-0:nth-child(even) td:first-child {
          ${t[0].bandedFill?(0,i.d9)(t[0].bandedFillColor,t[0].bandedFillOpacity):""}
        }
        & .ant-table-row.ant-table-row-level-1:nth-child(even) td:first-child {
          ${t[1].bandedFill?(0,i.d9)(t[1].bandedFillColor,t[1].bandedFillOpacity):""}
        }
        & .ant-table-row.ant-table-row-level-2:nth-child(even) td:first-child {
          ${t[2].bandedFill?(0,i.d9)(t[2].bandedFillColor,t[2].bandedFillOpacity):""}
        }

        &
          .ant-table-row.ant-table-row-level-0:nth-child(even)
          td:not(:first-child) {
          ${"Banded Rows"==s[0].highlightType?(0,i.d9)(s[0].bandedFillColor,s[0].bandedFillOpacity):""}
        }
        &
          .ant-table-row.ant-table-row-level-1:nth-child(even)
          td:not(:first-child) {
          ${"Banded Rows"==s[1].highlightType?(0,i.d9)(s[1].bandedFillColor,s[1].bandedFillOpacity):""}
        }
        &
          .ant-table-row.ant-table-row-level-2:nth-child(even)
          td:not(:first-child) {
          ${"Banded Rows"==s[2].highlightType?(0,i.d9)(s[2].bandedFillColor,s[2].bandedFillOpacity):""}
        }
      }
    }