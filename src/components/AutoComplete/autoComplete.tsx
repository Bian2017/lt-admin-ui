import React, { FC, useState, useEffect, useRef, ChangeEvent, ReactElement, Keyboa } from 'react';
import classNames from 'classnames';
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
import Transition from '../Transition/transition';

interface DataSourceObject {
  value: string;
}

// 返回一个交叉类型，其中泛型的默认值是{}
export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, renderOption, ...restProps } = props;

  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [showDropdown, setShowDropDown] = useState(false);

  const triggerSearch = useRef(false); // 在多次渲染过程中，都会保持相同的引用
  // 点击组件外部区域关闭下拉菜单(利用useRef跟DOM节点打交道)
  const componentRef = useRef<HTMLDivElement>(null);

  // 自定义Hook
  const debouncedValue = useDebounce(inputValue, 500);

  useClickOutside(componentRef, () => {
    setSuggestions([]);
  });

  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      const results = fetchSuggestions(debouncedValue);
      // 判断results是否是Promise对象
      if (results instanceof Promise) {
        setLoading(true);
        results.then((data) => {
          setLoading(false);
          setSuggestions(data);
          if (data.length > 0) {
            setShowDropDown(true);
          }
        });
      } else {
        setSuggestions(results);
        setShowDropDown(true);
        if (results.length > 0) {
          setShowDropDown(true);
        }
      }
    } else {
      setShowDropDown(false);
    }
    setHighlightIndex(-1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const setHighlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }

    setHighlightIndex(index);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      // 回车键
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      // 向上键
      case 38:
        setHighlight(highlightIndex - 1);
        break;
      // 向下键
      case 40:
        setHighlight(highlightIndex + 1);
        break;
      // ESC键
      case 27:
        setShowDropDown(false);
        break;
      default:
        break;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    setInputValue(value);
    triggerSearch.current = true;
  };

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setShowDropDown(false);
    if (onSelect) {
      onSelect(item);
    }

    // 在选择下拉选项的过程中，不希望触发搜索
    triggerSearch.current = false;
  };

  // 支持下拉菜单的自定义模板渲染
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  // 产生下拉菜单
  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {
          setSuggestions([]);
        }}
      >
        <ul className="lt-suggestion-list">
          {loading && (
            <div className="suggestions-loading-icon">
              <Icon icon="spinner" spin />
            </div>
          )}
          {suggestions.map((item, index) => {
            const cls = classNames('suggestion-item', {
              'is-active': index === highlightIndex,
            });

            return (
              <li key={index} className={cls} onClick={() => handleSelect(item)}>
                {renderTemplate(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };

  return (
    <div className="lt-auto-complete" ref={componentRef}>
      <Input value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} {...restProps} />

      {generateDropdown()}
    </div>
  );
};

export default AutoComplete;
