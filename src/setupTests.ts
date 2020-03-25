// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

/**
 * 每当我们运行jest或者npm run test的时候，会先运行setupTests文件。
 * 对于每次测试之前的一些全局通用配置，就可以放置在setupTests文件中。
 */

// 当 @testing-library/jest-dom 库安装完毕，需将安装好的库以自定义扩展的形式安装上去
import '@testing-library/jest-dom/extend-expect';
