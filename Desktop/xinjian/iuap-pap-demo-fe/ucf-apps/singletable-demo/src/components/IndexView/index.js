import React,{Component} from 'react';
import Header from 'components/Header';
import SearchArea from '../SearchArea';
import Grid from 'components/Grid';
import {Tooltip,Button,Modal} from 'tinper-bee';
import {actions} from 'mirrorx';
import moment from 'moment';
import PopupModal from '../PopupModal';

import './index.less';

class IndexView extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedIndex: -1,
            showHoverContent: false, //控制hover内容是否显示和隐藏
            editModalShow: false, //用于控制PopupModal显示和隐藏
            btnFlag: 0 //btnFlag: 0为添加、1为修改、2为详情
        }
    }

    componentDidMount() {
        actions.app.loadList(this.props.queryParam);
    }

    column = [
        {
            title: "员工编号",
            dataIndex: "code",
            key: "code",
            width: 150,
        },
        {
            title: "员工姓名",
            dataIndex: "name",
            key: "name",
            width: 120,
            render: (text, record, index) => {
                return (
                    <Tooltip inverse overlay={text}>
                        <span tootip={text} className="popTip">{text}</span>
                    </Tooltip>
                );
            }
        },
        {
            title: "员工性别",
            dataIndex: "sexEnumValue",
            key: "sexEnumValue",
            width: 150,
        },
        {
            title: "工龄",
            dataIndex: "serviceYears",
            key: "serviceYears",
            width: 130,
            className: 'column-number-right ', // 靠右对齐
        },
        {
            title: "年份",
            dataIndex: "year",
            key: "year",
            width: 100,
            render: (text, record, index) => {
                return <div>
                    {text ? moment(text).format('YYYY') : ""}
                </div>
            }
        },
        {
            title: "月份",
            dataIndex: "monthEnumValue",
            key: "monthEnumValue",
            width: 100,
        }
    ];

    onRowHover = (index,record) => {
        this.setState({
            selectedIndex: index,
            showHoverContent: true
        })
    }

    getHoverContent = () => {
        let {showHoverContent} = this.state;
        if(showHoverContent){
            return (
                <div className="opt-btns">
                    <Button size="sm" onClick={() => this.showEditModal(1)}>修改</Button>
                    <Button size="sm" onClick={() => this.showEditModal(2)}>查看</Button>
                    <Button size="sm" onClick={this.handleDelete}>删除</Button> 
                </div>
            )
        }else {
            return null;
        }
    }

    //新增
    showEditModal = (btnFlag) => {
        this.setState({
            editModalShow: true,
            btnFlag: btnFlag
        })
    }
    //关闭编辑模态框
    closeEdit = () => {
        this.setState({
            editModalShow: false
        })
    }

    handleDelete = () => {
        let {list} = this.props;
        let {selectedIndex} = this.state;
        Modal.confirm({
            title: '确定要删除这条单据吗？',
            content: '单据删除后将不能恢复。',
            onOk() {
                actions.app.deleteData(list[selectedIndex]);
            }
        })
    }

    render(){
        let {list,showLoading} = this.props;
        const toolBtns = [{
            value:'新增',
            onClick:() => this.showEditModal(0),
            bordered:false,
            colors:'primary'
        }];
        return(
            <div>
                <Header title="单表示例"/>
                <SearchArea {...this.props}/>
                <Grid.GridToolBar toolBtns={toolBtns}  />
                <Grid 
                columns={this.column}
                data={list}
                rowKey="id" //指定行数据的 key 
                multiSelect={false} //是否使用多选
                loading={showLoading}
                hoverContent={this.getHoverContent}
                onRowHover={this.onRowHover}
                />
                <PopupModal 
                closeEdit={this.closeEdit}
                editModalShow={this.state.editModalShow}
                btnFlag={this.state.btnFlag}
                list={list}
                currentIndex={this.state.selectedIndex}
                />
            </div>
        )
    }
}
export default IndexView;