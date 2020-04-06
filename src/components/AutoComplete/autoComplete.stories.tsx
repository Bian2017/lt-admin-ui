import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AutoComplete, { DataSourceType } from './autoComplete';

interface LakerPlayerProps {
  value: string;
  number: number;
}

interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}

const SimpleComplete = () => {
  const lakers = [
    'bradley',
    'pope',
    'caruso',
    'cook',
    'cousins',
    'james',
    'AD',
    'green',
    'howard',
    'kuzma',
    'McGee',
    'rando',
  ];

  const lakersWithNumber = [
    { value: 'bradley', number: 11 },
    { value: 'pope', number: 1 },
    { value: 'caruso', number: 4 },
    { value: 'cook', number: 2 },
    { value: 'cousins', number: 15 },
    { value: 'james', number: 23 },
    { value: 'AD', number: 3 },
    { value: 'green', number: 14 },
    { value: 'howard', number: 39 },
    { value: 'kuzma', number: 0 },
  ];

  const handleFetch = (query: string) => {
    return (
      fetch(`https://api.github.com/search/users?q=${query}`)
        // 将Response对象转化成json
        .then((res) => res.json())
        .then(({ items }) => {
          return items.slice(0, 10).map((item: GithubUserProps) => ({ value: item.login, ...item }));
        })
    );
  };

  // const handleFetch = (query: string) => {
  //   return lakers.filter((name) => name.includes(query));
  // };

  // const handleFetch = (query: string) => {
  //   return lakersWithNumber.filter((player) => player.value.includes(query));
  // };

  const renderOption = (item: DataSourceType<GithubUserProps>) => {
    return (
      <>
        <span>昵称: {item.login}</span>
        <img src={item.avatar_url} style={{ width: '20px', height: '20px' }} alt="头像" />
      </>
    );
  };

  return <AutoComplete fetchSuggestions={handleFetch} onSelect={action('selected')} renderOption={renderOption} />;
};

storiesOf('AutoComplete Component', module).add('AutoComplete', SimpleComplete);
