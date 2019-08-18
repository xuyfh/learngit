import React, {Component} from "react";
import {actions} from "mirrorx";
import {FormControl, Select} from 'tinper-bee'
import FormList from 'components/FormList';
import {getValidateFieldsTrim} from "utils";
import moment from "moment";
import DatePicker from "bee-datepicker";
import SelectMonth from 'components/SelectMonth';
import PopDialog from 'components/Pop';
import FormError from 'components/FormError';
import InputNumber from 'bee-input-number';

import zhCN from "rc-calendar/lib/locale/zh_CN";
import './index.less'

const FormItem = FormList.Item;
const {Option} = Select;
const {YearPicker} = DatePicker;
const format = "YYYY-MM-DD HH:mm:ss";
const formatYYYY = "YYYY";
let titleArr = ["新增", "修改", "详情"];

class PopupModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowData: {},
            btnFlag: 0,
            cancelFlag: false
        }
    }

    async componentWillReceiveProps(nextProps) {
        let _this = this;
        let {btnFlag, currentIndex} = this.props;
        let {btnFlag: nextBtnFlag, currentIndex: nextCurrentIndex, editModelVisible} = nextProps;
        // 判断是否 btnFlag新弹框状态  currentIndex当前选中行
        if (btnFlag !== nextBtnFlag || currentIndex !== nextCurrentIndex) {
            _this.props.form.resetFields();
            // 防止网络阻塞造成btnFlag显示不正常
            this.setState({btnFlag: nextBtnFlag}); 
            if (nextBtnFlag !== 0 && editModelVisible) {
                let {list} = this.props;
                let rowData = list[nextCurrentIndex] || {};
                this.setState({rowData});
            }
        }

    }

    /**
     * 关闭Modal
     */
    onCloseEdit = () => {
        this.setState({rowData: {}, btnFlag: 0});
        this.props.onCloseEdit();
    }

    /**
     * 提交表单信息
     */
    onSubmitEdit = () => {
        let _this = this;
        let {btnFlag}=_this.state;
        _this.props.form.validateFields((err, _values) => {
            let values = getValidateFieldsTrim(_values);
            if (!err) {
                values = _this.onHandleSaveData(values);
                this.onCloseEdit();
                values.btnFlag=btnFlag; // 弹框状态标识
                actions.popupEdit.saveOrder(values);
            }
        } );
    }

    /**
     *
     * @description 处理保存数据
     * @param {Object} values 待处理数据
     */
    onHandleSaveData = (values) => {
        let _this = this,
            {rowData} = this.state,
            resObj = {};

        if (rowData) {
            resObj = Object.assign({}, rowData, values);
        }
        resObj.year = resObj.year.format(formatYYYY);
        //修改状态日期格式化
        // if(resObj.applyTime){
        //     resObj.applyTime=resObj.applyTime.format(format);
        // }
        return resObj;
    }

    /**
     *
     * @description 底部按钮是否显示处理函数
     * @param {Number} btnFlag 为页面标识
     * @returns footer中的底部按钮
     */
    onHandleBtns = (btnFlag) => {
        let _this = this;
        let btns = [

            {
                label: '取消',
                fun: this.onCloseEdit,
                shape: 'border'
            },
            {
                label: '确定',
                fun: _this.onSubmitEdit,
                colors: 'primary'
            },
        ];

        if (btnFlag == 2) {
            btns = [];
        }
        return btns;
    }


    render() {
        const _this = this;
        let {form, editModelVisible} = _this.props;
        let {rowData, btnFlag} = _this.state;
        let {getFieldProps, getFieldError} = form;
        let {
            code, serviceYearsCompany, pickTime,
            postLevel, levelName, year, sex, allowanceStandard, remark,
            deptName, dept, exdeeds, allowanceActual,
            allowanceType, month, pickType, name,
            serviceYears, applyTime
        } = rowData;

        // console.log('rowData', allowanceStandard);
        let btns = _this.onHandleBtns(btnFlag);


        return (

            <PopDialog
                show={editModelVisible}
                title={titleArr[btnFlag]}
                size='lg'
                btns={btns}
                autoFocus={false}
                enforceFocus={false}
                closeclose={this.onCloseEdit}
                className="single-table-pop-model"
            >


                <FormList>
                    <FormItem
                        label="员工编号"
                    >
                        <FormControl disabled={true}
                                     {...getFieldProps('code', {
                                         initialValue: code || '',
                                     })}
                        />
                    </FormItem>
                    <FormItem
                        required
                        label="员工姓名"
                    >
                        <FormControl disabled={btnFlag === 2}
                                     {...getFieldProps('name', {
                                         validateTrigger: 'onBlur',
                                         initialValue: name || '',
                                         rules: [{
                                             type: 'string',
                                             required: true,
                                             pattern: /\S+/ig,
                                             message: '请输入员工姓名',
                                         }],
                                     })}
                        />
                        <FormError errorMsg={getFieldError('name')}/>
                    </FormItem>

                    <FormItem
                        required
                        label="员工性别"
                    >
                        <Select disabled={btnFlag === 2}
                                {...getFieldProps('sex', {
                                    initialValue: typeof sex !== 'undefined' ? sex : 0,
                                    rules: [{
                                        required: true, message: '请选择员工性别',
                                    }],
                                })}
                        >
                            <Option value={0}>女</Option>
                            <Option value={1}>男</Option>
                        </Select>
                        <FormError errorMsg={getFieldError('sex')}/>
                    </FormItem>

                    <FormItem
                        className="time"
                        required
                        label="工龄"
                    >
                        <InputNumber iconStyle="one" min={0} step={1} disabled={btnFlag === 2} max={99}
                                     {...getFieldProps('serviceYears', {
                                         initialValue: (typeof serviceYears) === "number" ? serviceYears : 1,
                                         rules: [{pattern: /^[0-9]+$/, required: true}],
                                     })}
                        />
                    </FormItem>

                    <FormItem
                        className="time"
                        required
                        label="司龄"
                    >
                        <InputNumber iconStyle="one" min={0} step={1} disabled={btnFlag === 2} max={99}
                                     {...getFieldProps('serviceYearsCompany', {
                                         initialValue: (typeof serviceYearsCompany) === "number" ? serviceYearsCompany : 1,
                                         rules: [{pattern: /^[0-9]+$/, required: true}],
                                     })}
                        />
                    </FormItem>

                    <FormItem
                        className="time"
                        required
                        label="年份"
                    >
                        <YearPicker disabled={btnFlag == 2}
                                    {...getFieldProps('year', {
                                        initialValue: year ? moment(year) : moment(),
                                        validateTrigger: 'onBlur',
                                        rules: [{required: true, message: '请选择申请时间'}],
                                    })}
                                    getCalendarContainer={() => {
                                        return document.querySelector('.single-table-pop-model')
                                    }}
                                    format={formatYYYY}
                                    locale={zhCN}
                                    placeholder="选择年"
                        />
                    </FormItem>

                    <FormItem
                        required
                        label="月份"
                    >
                        <SelectMonth disabled={btnFlag === 2}
                                     {...getFieldProps('month', {
                                         initialValue: month ? month : 1,
                                         rules: [{
                                             required: true, message: '请选择月份',
                                         }],
                                     })} />
                        <FormError errorMsg={getFieldError('month')}/>
                    </FormItem>

                    <FormItem
                        required
                        label="补贴类别"
                    >
                        <Select disabled={btnFlag === 2}
                                {...getFieldProps('allowanceType', {
                                    initialValue: allowanceType ? allowanceType.toString() : '1',
                                    rules: [{
                                        required: true, message: '请选择补贴类别',
                                    }],
                                })}
                        >
                            <Option value="1">电脑补助</Option>
                            <Option value="2">住宿补助</Option>
                            <Option value="3">交通补助</Option>
                        </Select>
                        <FormError errorMsg={getFieldError('allowanceType')}/>
                    </FormItem>

                    <FormItem
                        className="time"
                        required
                        label="补贴标准"
                    >
                        <InputNumber iconStyle="one" precision={2} min={0} max={999999} disabled={btnFlag === 2}
                                     {...getFieldProps('allowanceStandard', {
                                         initialValue: allowanceStandard ? Number(allowanceStandard) : 100,
                                     })}
                        />
                    </FormItem>

                    <FormItem
                        className="time"
                        required
                        label="实际补贴"
                    >
                        <InputNumber iconStyle="one" precision={2} min={0} max={999999} disabled={btnFlag === 2}
                                     {...getFieldProps('allowanceActual', {
                                         initialValue: allowanceActual ? Number(allowanceActual) : 100,
                                     })}
                        />
                    </FormItem>

                    <FormItem
                        required
                        label="是否超标"
                    >
                        <Select disabled={btnFlag === 2}
                                {...getFieldProps('exdeeds', {
                                    initialValue: exdeeds ? exdeeds.toString() : '0',
                                    rules: [{required: true, message: '请选择是否超标'}],
                                })}
                        >
                            <Option value="0">未超标</Option>
                            <Option value="1">超标</Option>
                        </Select>
                        <FormError errorMsg={getFieldError('exdeeds')}/>
                    </FormItem>

                    {btnFlag >= 2 ? (
                        <FormItem
                            className="time"
                            required
                            label="申请时间"
                        >
                            <DatePicker className='form-item' format={format} disabled={btnFlag === 2}
                                        {...getFieldProps('applyTime', {
                                            initialValue: applyTime ? moment(applyTime) : moment(),
                                            validateTrigger: 'onBlur',
                                            rules: [{required: true, message: '请选择申请时间'}],
                                        })}
                            />
                        </FormItem>
                    ) : null}
                </FormList>

            </PopDialog>
        )
    }
}

export default FormList.createForm()(PopupModal);
