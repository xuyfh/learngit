import React, {Component} from "react";
import {Upload, Icon} from 'tinper-bee';
import './index.less';

const Dragger = Upload.Dragger;
const demo6props = {
    name: 'file',
    multiple: true,
    showUploadList: false,
    action: '/upload.do',
    onChange(info) {
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
  
        console.log(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        console.log(`${info.file.name} file upload failed.`);
      }
    },
};

class UploadPic extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="goods-pic-container">
                <p>商品照片</p>
                <Dragger {...demo6props}>
                    <p className="u-upload-drag-icon">
                        <Icon type="inbox" className="uf-upload" />
                    </p>
                    <p className="u-upload-text">点击选择文件或 拖拽文件到此处</p>
                </Dragger>
            </div>
        )
    }
}

export default UploadPic;