import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex={0} onSelect={index => console.log(index)} mode={'vertical'}>
          <MenuItem index={0}>cool link</MenuItem>
          <MenuItem index={1}>cool link 2</MenuItem>
          <MenuItem index={2}>cool link 3</MenuItem>
        </Menu>
        <Button>Default</Button>
        <Button disabled>Default Disabled</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          Large Primary
        </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
          Danger Small
        </Button>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com" target="_blank">
          Link
        </Button>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com" disabled>
          Link Disabled
        </Button>
      </header>
    </div>
  );
}

export default App;
