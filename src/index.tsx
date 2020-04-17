/**
 * 将所有组件都导入，再导出。这样就可以从入口文件直接导入所有组件
 */
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// 通过创建library来引用Icons
library.add(fas); // fas 所有图表的集

export { default as Icon } from './components/Icon';
export { default as Button } from './components/Button';
export { default as Menu } from './components/Menu';
