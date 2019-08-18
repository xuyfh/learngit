import React, {Component} from "react";
import BeeGrid,{GridToolBar} from "bee-complex-grid";
import Icon from "bee-icon";
import './index.less'


const defualtPaginationParam = {
    dataNumSelect: ["5", "10", "15", "20", "25", "50", "All"], //每页显示多少条数据
    horizontalPosition: 'center', //分页显示位置
    verticalPosition: "bottom", //分页显示位置
    dataNum: 4, //dataNumSelect 数组下标
    btnType: {
        shape: 'border'
    },
    noBorder: true, //是否带边框
    confirmBtn: () => null //确认按钮
};
const defaultProps = {
    //   hideBodyScroll: true,
    headerScroll: false,
    bordered: false,
    data: [],
    paginationObj: {}
};

class Grid extends Component {
    constructor(props) {
        super(props);
    }

    /**
     *获取保存的column和table上的属性
     *
     */
    getColumnsAndTablePros = () => {
        return this.grid.getColumnsAndTablePros();
    };
    /**
     *
     * 重置grid的columns
     */
    resetColumns = newColumns => {
        this.grid.resetColumns(newColumns);
    };

    exportExcel = () => {
        this.grid.exportExcel();
    };

    render() {
        const { paginationObj, data, exportData,  ...otherProps } = this.props;
        const _paginationObj = {...defualtPaginationParam, ...paginationObj};
        _paginationObj.disabled = paginationObj.disabled !== undefined
            ? paginationObj.disabled
            : data.length === 0;
        let _exportData = exportData || data;
        return (
            <div className='demo-grid-wrapper'>
                <BeeGrid
                    className="ucf-example-grid"
                    data={data}
                    {...otherProps}
                    exportData={_exportData}
                    paginationObj={_paginationObj}
                    ref={el => this.grid = el}
                />
            </div>
        );
    }
}

Grid.defaultProps = defaultProps;
Grid.GridToolBar = GridToolBar;
export default Grid;
