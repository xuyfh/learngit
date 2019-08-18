/**
 * App模块
 */

import React, { Component } from 'react';
import {actions} from 'mirrorx';
import { Button, FormControl, Form, Label } from 'tinper-bee';
const FormItem = Form.FormItem;

import './index.less';

class Edit extends Component {
    constructor(props) {
        super(props);
    }

    submit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                console.log('校验失败', values);
            } else {
                console.log('提交成功', values);
                actions.formDemo.updateState({
                    formData:values
                });
            }
        });
    }
    
    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        console.log(Form,FormItem,FormControl,Label)
        return (
            <div className="edit">
                <Form>
                    <FormItem>
                        <Label>员工编号</Label>
                        <FormControl 
                            {...getFieldProps('code', {
                                initialValue: '',
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: '请输入员工编号'
                                }]
                            })}
                        />
                        <span className='error'>
                            {getFieldError('code')}
                        </span>  
                    </FormItem>
                    <FormItem>
                        <Label>姓名</Label>
                        <FormControl
                            {...getFieldProps('name', {
                                initialValue: '',
                                rules: [{
                                    required: true, message: '请输入姓名'
                                }]
                            })}
                        />
                        <span className='error'>
                            {getFieldError('name')}
                        </span>  
                    </FormItem>
                </Form>
                <Button colors="primary" onClick={this.submit}>确认</Button>
            </div>
        );
    }
}

//displayName 属性用于组件调试时输出显示，JSX自动设置该值，可以理解为调试时显示的组件名
Edit.displayName = "Edit";
export default Form.createForm()(Edit);
