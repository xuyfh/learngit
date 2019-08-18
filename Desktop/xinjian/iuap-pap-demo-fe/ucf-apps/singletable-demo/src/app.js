/**
 * 入口、导入组件样式、渲染
 */

import React from 'react';
import { render } from 'mirrorx';

import IndexView from "./container";

// import 'ucf-common/styles/tinper-bee.css';
// import 'ucf-common/styles/public.less';
import './app.less';



render(<IndexView />, document.querySelector("#app"));
