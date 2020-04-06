import React, { FC, useState, ChangeEvent, ReactElement } from 'react';
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon';

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

  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    setInputValue(value);
    if (value) {
      const results = fetchSuggestions(value);
      // 判断下是否是Promise
      if (results instanceof Promise) {
        setLoading(true);
        results.then((data) => {
          setLoading(false);
          setSuggestions(data);
        });
      } else {
        setSuggestions(results);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
  };

  // 支持下拉菜单的自定义模板渲染
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  // 产生下拉菜单
  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          return (
            <li key={index} onClick={() => handleSelect(item)}>
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="lt-auto-complete">
      <Input value={inputValue} onChange={handleChange} {...restProps} />
      {loading && (
        <ul>
          <Icon icon="spinner" spin />
        </ul>
      )}
      {suggestions.length > 0 && generateDropdown()}
    </div>
  );
};

export default AutoComplete;
