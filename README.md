This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 一、脚本

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### yarn run storybook

## 一、项目创建

> npx create-react-app ts-with-react --typescript

使用`Sass`:

> yarn add node-sass

## 二、开发注意事项

### 2.1 图标解决方案

借助 react-fontawesome、[fontawesome](https://fontawesome.com/icons?d=gallery&s=solid&m=free)第三方库使用 SVG 方案。

```Bash
$ npm i --save @fortawesome/fontawesome-svg-core
$ npm i --save @fortawesome/free-solid-svg-icons
$ npm i --save @fortawesome/react-fontawesome
```

**注：**

SVG 方案优势：

- 完全可控
- 即取即用

### 2.2 React Transition Group

#### 2.2.1 CSSTransition

此 Transition 组件用于 CSS 动画过渡，灵感来源于 ng-animate 库。

CSSTransition：在组件淡入 appear，进场 enter,出场 exit 时，CSSTransition 组件应用了一系列 className 名来对这些动作进行描述。首先 appear 被应用到组件 className 上，接着添加“active”类名来激活 CSS 动画。在动画完成后，原 class 改变为 done 表明组件动画已经应用完成并加载完成。

当组件的 in 属性变为 true 时，组件的 className 将被赋值为 example-enter，并在下一刻添加 example-enter-active 的 CSS class 名。这些都是基于 className 属性的约定。即：原组件带有 className="animate-rotate"，则 enter 状态时，变为"animate-rotate-enter"

##### 属性

**in**

控制组件应用动画的属性值，通常将一个 react 的组件 state 赋值给它，通过改变 state，从而开启和关闭动画。

### 2.3 Storybook

#### 2.3.1 安装 storybook

采用自动安装方式安装 storybook。

> npx -p @storybook/cli sb init --type react_scripts

#### 2.3.2 安装 addon-info 插件

安装 addon-info 插件。

> yarn add @storybook/addon-info -D
> yarn add @types/storybook\_\_addon-info -D

#### 2.3.3 使用 react-docgen 插件

如果想通过注释方式来生成文档，可以使用 `react-docgen` 插件。要使用该插件，还需安装相应的 loader，然后配置 main.js 文件。

> yarn add react-docgen-typescript-loader -D

```JS
{
  loader: require.resolve('react-docgen-typescript-loader'),
  options: {
    // 将枚举或者联合类型转换成字符串形式，避免字符串字面量显示别名。
    shouldExtractLiteralValuesFromEnum: true,
    // 避免显示原生内置属性
    propFilter: prop => {
      if (prop.parent) {
        return !prop.parent.fileName.includes('node_modules');
      }

      return true;
    }
  }
}
```

通过注释方式生成文档，还需编写正确的注释格式，这可参照[JSDoc](https://jsdoc.app/about-getting-started.html)标准来编写。

## 三、其他

### 3.1 如何运行单个测试

> npm test -- -t "auto"

注："auto"表示测试用例的部分名称。

### 3.2 rimraf

由于 `rm -rf` 命令不兼容 windows，故需利用第三方依赖库`rimraf`来清空每次编译后的文件。
