import React from 'react';
import { render, RenderResult, fireEvent, wait } from '@testing-library/react';
import AutoComplete, { AutoCompleteProps } from './autoComplete';
import { config } from 'react-transition-group';

// 将所有异步的transition动画变成了同步
config.disabled = true;

const testArray = [
  { value: 'ab', number: 11 },
  { value: 'abc', number: 1 },
  { value: 'b', number: 4 },
  { value: 'c', number: 15 },
];

const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {
    return testArray.filter((item) => item.value.includes(query));
  },
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
};

let wrapper: RenderResult, inputNode: HTMLInputElement;

describe('test AutoComplete Component', () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />);
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement;
  });

  it('test basic AutoComplete behavior', async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: 'a' } });
    // 由于存在函数防抖，会有延迟。故需使用await函数
    await wait(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument();
    });

    // should have two suggestion items
    expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2);

    // click the first item
    fireEvent.click(wrapper.getByText('ab'));
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 });
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument();

    // fill the input
    expect(inputNode.value).toBe('ab');
  });

  it('should provide keyboard support', async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: 'a' } });
    // 由于存在函数防抖，会有延迟。故需使用await函数
    await wait(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument();
    });

    const firstResult = wrapper.queryByText('ab');
    const secondResult = wrapper.queryByText('abc');

    // arrow down(向下键)
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(firstResult).toHaveClass('is-active');
    // arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(secondResult).toHaveClass('is-active');
    // arrow up(向上键)
    fireEvent.keyDown(inputNode, { keyCode: 38 });
    expect(firstResult).toHaveClass('is-active');
    // press enter
    fireEvent.keyDown(inputNode, { keyCode: 13 });
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 });
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument();
  });

  it('click outside should hide the dropdown', async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: 'a' } });
    // 由于存在函数防抖，会有延迟。故需使用await函数
    await wait(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument();
    });

    // 点击文档外部
    fireEvent.click(document);
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument();
  });

  it('renderOption should generate the right template', () => {});

  it('async fetchSuggestions should works fine', () => {});
});
