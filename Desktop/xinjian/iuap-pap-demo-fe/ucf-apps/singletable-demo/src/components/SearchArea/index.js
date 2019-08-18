import React,{Component} from 'react';
import SearchPanel from 'components/SearchPanel';
import FormList from 'components/FormList';
import {FormControl} from 'tinper-bee';
import DatePicker from 'bee-datepicker';
import zhCN from 'tinper-bee/locale/zh_CN';
import SelectMonth from 'components/SelectMonth';
import {deepClone} from "utils";
import {actions} from 'mirrorx';

const FormItem = FormList.Item;
const {YearPicker} = DatePicker;

import './index.less';

class SearchAreaForm extends Component{
    constructor(props){
        super(props);
    }
    /**
     * 点击清空按钮的回调
     */
    reset = () => {
        this.props.form.resetFields()
    }
 
    /**
     * 点击搜索按钮的回调
     */
    search = () => {
        this.props.form.validateFields((err,values) => {
            let _values = values;
            if(values.year){
                _values = Object.assign(_values,{
                    year : values.year.format("YYYY")
                })
            }
            this.getQuery(_values);
        });
    }

    /** 查询数据
     * @param {Object} values 表单对象
     */
    getQuery = (values) => {
        let queryParam = deepClone(this.props.queryParam);
        let {pageParams, whereParams} = queryParam;
        whereParams = deepClone(whereParams);
        pageParams.pageIndex = 0;
        for (let key in values) {
            for (let [index, elem] of whereParams.entries()) {
                if (key === elem.key) {
                    whereParams.splice(index, 1);
                    break;
                }
            }

            if (values[key] || values[key] === 0) {
                let condition = "LIKE";
                // 这里通过根据项目自己优化
                let equalArray = ["code", "month"];
                if (equalArray.includes(key)) { // 等于
                    condition = "EQ";
                }
                whereParams.push({key, value: values[key], condition}); //前后端约定
            }
        }
        queryParam.whereParams = whereParams;
        actions.app.updateState(queryParam);
        actions.app.loadList(queryParam);
        // this.props.onCloseEdit();
    }

    render(){
        const { getFieldProps, getFieldError } = this.props.form;
        return(
            <SearchPanel 
            reset={this.reset}
            search={this.search}
            >
                <FormList size="sm">
                    <FormItem label="员工编号">
                        <FormControl placeholder="精确查询" {...getFieldProps('code', { initialValue: '' })} />
                    </FormItem>

                    <FormItem label="员工姓名">
                        <FormControl placeholder="模糊查询" {...getFieldProps('name', { initialValue: '' })} />
                    </FormItem>

                    <FormItem label="年份">
                        <YearPicker
                            {...getFieldProps('year', { initialValue: null })}
                            format="YYYY"
                            locale={zhCN}
                            placeholder="选择年"
                        />
                    </FormItem>

                    <FormItem label="月份">
                        <SelectMonth  {...getFieldProps('month', { initialValue: '' })} />
                    </FormItem>
                </FormList>
            </SearchPanel>
        )
    }
}

export default FormList.createForm()(SearchAreaForm);