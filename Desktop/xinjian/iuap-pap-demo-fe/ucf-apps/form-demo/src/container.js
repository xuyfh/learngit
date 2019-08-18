/**
 * 容器类组件
 */

import mirror, { connect } from 'mirrorx';

import IndexView from './components/IndexView';
import model from './model'
// 数据和组件UI关联、绑定
mirror.model(model);

export default connect(state => state.formDemo)(IndexView);
