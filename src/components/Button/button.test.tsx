import React from 'react';
import { render, fireEvent } from '@testing-library/react'; // React Testing Library
import Button, { ButtonProps } from './button';

const defaultProps = {
  onClick: jest.fn() // jest.fn创建模拟函数，检测是否被调用
};

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'test-class'
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
};

// 先把组件测试cases进行分类
describe('test Button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>btn</Button>);
    // getByText: 返回HTMLElement。
    // 因为HTMLElement没有disabled属性，可通过类型断言将HTMLElement转成HTMLButtonElement，
    const element = wrapper.getByText('btn') as HTMLButtonElement;

    expect(element).toBeInTheDocument(); // 判断是否在HTML文档中
    expect(element.tagName).toEqual('BUTTON'); // 判断DOM元素是否是button。tagName属性的值是是大写的
    expect(element).toHaveClass('btn btn-default'); // 判断有没有对应的class
    expect(element.disabled).toBeFalsy(); // 判断disabled属性是否是假

    // fireEvent: 触发DOM事件
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled(); // 检测onClick函数是否被调用到
  });

  it('should render the correct component based on different props', () => {
    const wrapper = render(<Button {...testProps}>lg</Button>);
    const element = wrapper.getByText('lg'); // getByText: 返回HTMLElement

    expect(element).toBeInTheDocument(); // 判断是否在HTML文档中
    expect(element).toHaveClass('btn-primary btn-lg test-class');
  });

  it('should render a link when btnType equals link and href is provided', () => {
    const wrapper = render(
      <Button btnType="link" href="http://www.baidu.com">
        link
      </Button>
    );
    const element = wrapper.getByText('link');

    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
    expect(element).toHaveClass('btn btn-link');
  });

  it('should render disabled button when disabled set to true', () => {
    const wrapper = render(<Button {...disabledProps}>disabled</Button>);
    const element = wrapper.getByText('disabled') as HTMLButtonElement; // getByText: 返回HTMLElement

    expect(element).toBeInTheDocument(); // 判断是否在HTML文档中
    expect(element.disabled).toBeTruthy();

    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled(); // click事件应该无法触发
  });
});
