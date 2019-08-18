//btnFlag: 0为添加、1为修改、2为详情
import React,{Component} from 'react';
import {Modal,Button,FormControl,Select,InputNumber} from 'tinper-bee';
import FormList from 'components/FormList';
import SelectMonth from 'components/SelectMonth';
import DatePicker from 'bee-datepicker';
import zhCN from 'tinper-bee/locale/zh_CN';
import FormError from 'components/FormError';
import moment from 'moment';
import {actions} from 'mirrorx';

const FormItem = FormList.Item;
const Option = Select.Option;
const {YearPicker} = DatePicker;
const titles = ['新增','修改','查看'];

import './index.less';

class PopupModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal: false, //模态框是否显示
            btnFlag: 0, //标识操作类型
            rowData: {}, //存放表格行信息
            currentIndex: -1 //表格行序号
        }
    }

    componentWillReceiveProps(nextProps){
        let _this = this;
        let {list} = this.props;
        let {
            editModalShow:nextEditModalShow,
            currentIndex: nextCurrentIndex,
            btnFlag: nextBtnFlag
        } = nextProps;
        let {
            editModalShow,
            currentIndex,
            btnFlag
        } = this.props;
        // 更新Modal显示状态
        if(editModalShow !== nextEditModalShow){
            this.setState({
                showModal: nextEditModalShow
            })
        }
        if(nextCurrentIndex !== currentIndex || nextBtnFlag !== btnFlag){
            _this.props.form.resetFields();
            this.setState({
                btnFlag: nextBtnFlag,
                rowData: {}
            });
            if(nextBtnFlag !== 0 && nextEditModalShow){
                this.setState({
                    rowData: list[nextCurrentIndex] || {}
                })
            }
        }
    }

    close = () => {
        this.setState({
            showModal: false
        });
        this.props.closeEdit();
    }

    submit = () => {
        let {btnFlag} = this.state;
        this.props.form.validateFields((err, values) => {
            if (err) {
                console.log('校验失败', values);
            } else {
                let _values = this.handleSaveData(values);
                //数据提交
                this.close();
                _values.btnFlag = btnFlag;
                actions.app.saveData(_values);
            }
        });
    }
    //处理表单数据
    handleSaveData = (values) => {
        let {rowData} = this.state,
            resObj = {},
            refData = {
                dept: "e648d0bd-4912-46af-9880-29af8e68ace2",
                pickType: "1",
                postLevel: "level5"
            }

        if(rowData){
            resObj = Object.assign({},rowData,refData,values)
        }
        resObj.year = resObj.year.format("YYYY");

        return resObj;
    }

    render(){
        const { getFieldProps, getFieldError } = this.props.form;
        let {btnFlag,rowData} = this.state;
        let {code,name,sex,serviceYears,year,month} = rowData;
        // console.log(rowData);
        return(
            <Modal
            className="edit-table-modal"
            backdropClosable={false}
            size="lg"
            show = { this.state.showModal }
            onHide = { this.close } >
                <Modal.Header closeButton>
                    <Modal.Title>{titles[btnFlag]}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <FormList>
                        <FormItem label="员工编号">
                            <FormControl disabled
                                {...getFieldProps('code', {
                                    initialValue: code || ''
                                }) }
                            />
                        </FormItem>
                        <FormItem label="员工姓名" required>
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
                            <FormError errorMsg={getFieldError('name')} />
                        </FormItem>
                        <FormItem label="员工性别" required>
                            <Select
                                disabled={btnFlag === 2}
                                {...getFieldProps('sex', {
                                    initialValue: sex || 0,
                                    rules: [{
                                        required: true, message: '请选择员工性别',
                                    }],
                                })}
                            >
                                <Option value={0}>女</Option>
                                <Option value={1}>男</Option>
                            </Select>
                            <FormError errorMsg={getFieldError('sex')} />
                        </FormItem>
                        <FormItem label="工龄" required>
                            <InputNumber
                                disabled={btnFlag === 2}
                                {...getFieldProps('serviceYears', {
                                    initialValue: serviceYears || 0,
                                    validateTrigger: 'onBlur',
                                    rules:[{
                                        required: true, message: "请输入工龄"
                                    },{
                                        pattern: /^[0-9]+$/, message: "请输入数字"
                                    }]
                                }) }
                                iconStyle="one"
                                max={99}
                                min={1}
                                step={1}
                            />
                            <FormError errorMsg={getFieldError('serviceYears')} />
                        </FormItem>
                        <FormItem label="年份" required disabled={btnFlag === 2}>
                            <YearPicker
                                disabled={btnFlag === 2}
                                {...getFieldProps('year', { 
                                    initialValue: year ? moment(year) : moment() ,
                                    validateTrigger: 'onBlur',
                                    rules:[{
                                        required: true, message: "请选择年份"
                                    }]
                                })}
                                format="YYYY"
                                locale={zhCN}
                                placeholder="选择年"
                                getCalendarContainer={()=>{
                                    return document.querySelector(".edit-table-modal");
                                }}
                            />
                            <FormError errorMsg={getFieldError('year')} />
                        </FormItem>

                        <FormItem label="月份" required disabled={btnFlag === 2}>
                            <SelectMonth  
                            disabled={btnFlag === 2}
                            {...getFieldProps('month', { 
                                initialValue: month || '' ,
                                validateTrigger: 'onBlur',
                                    rules:[{
                                        required: true, message: "请选择月份"
                                    }]
                                })} 
                            />
                            <FormError errorMsg={getFieldError('month')} />
                        </FormItem>
                    </FormList>
                </Modal.Body>
                {
                    btnFlag !== 2?
                    <Modal.Footer>
                        <Button onClick={ this.close } colors="secondary" style={{marginRight: 8}}>取消</Button>
                        <Button onClick={ this.submit } colors="primary">确认</Button>
                    </Modal.Footer>
                    : 
                    null
                }
                
           </Modal>
        )
    }
}

export default FormList.createForm()(PopupModal);