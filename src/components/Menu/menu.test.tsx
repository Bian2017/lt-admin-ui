import React from 'react';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';

import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test'
};

const testVerProps: MenuProps = {
  defaultIndex: 0,
  mode: 'vertical'
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index={0}>active</MenuItem>
      <MenuItem index={1} disabled>
        disabled
      </MenuItem>
      <MenuItem index={2}>menu3</MenuItem>
    </Menu>
  );
};

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;

describe('test Menu and MenuItem component', () => {
  /**
   * 针对多个测试case运行前需获取相同的元素，可以通过beforeEach避免重复设置。
   * 在每个case运行之前，都会运行该函数
   */
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));

    // 如果要取Menu节点，可以在外层元素加上data-testid
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  });

  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();

    // 应该有menu test等两个class属性
    expect(menuElement).toHaveClass('menu test');

    // 应该有三个菜单栏节点
    expect(menuElement.getElementsByTagName('li').length).toEqual(3);

    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  });

  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('menu3');

    // 触发click事件
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');

    // 希望函数被调用的参数是2
    expect(testProps.onSelect).toHaveBeenCalledWith(2);

    fireEvent.click(disabledElement);
    // disabled元素应当点击了应该没有任何反应
    expect(disabledElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
  });

  it('should render vertical mode when mode is set to vertical', () => {
    /**
     * 调用cleanup避免变量命名存在冲突。在其他测试case中没有出现wrapper重复命名情况，是因为
     * 框架自动调用了cleanup函数。
     *
     * Cleanup is called after each test automatically by default if the testing framework
     * you're using supports the afterEach global (like mocha, Jest, and Jasmine).
     */
    cleanup();

    const wrapper = render(generateMenu(testVerProps));
    const menuElement = wrapper.getByTestId('test-menu');

    expect(menuElement).toHaveClass('menu-vertical');
  });
});
