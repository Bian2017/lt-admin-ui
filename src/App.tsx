import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, fas } from '@fortawesome/free-solid-svg-icons';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import Transition from './components/Transition/transition';

// 通过创建library来引用Icons
// library.add(faCoffee);
library.add(fas); // fas 所有图表的集合

function App() {
  const [show, setShow] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <Icon icon="coffee" theme="primary" size="10x" />
        <Menu defaultIndex="0" onSelect={index => console.log(index)} mode={'vertical'}>
          <MenuItem>cool link</MenuItem>
          <MenuItem>cool link 2</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>dropdown1</MenuItem>
            <MenuItem>dropdown2</MenuItem>
            <MenuItem>dropdown3</MenuItem>
          </SubMenu>
          <MenuItem>cool link 3</MenuItem>
        </Menu>
        <Button size="lg" onClick={() => setShow(!show)}>
          Toggle
        </Button>

        <Transition in={show} timeout={300} animation="zoom-in-left">
          <div>
            <p>Test Transition</p>
            <Button>Default</Button>
            <Button disabled>Default Disabled</Button>
            <Button btnType="primary" size="lg">
              Large Primary
            </Button>
            <Button btnType="danger" size="sm">
              Danger Small
            </Button>
            <Button btnType="link" href="https://www.baidu.com" target="_blank">
              Link
            </Button>
            <Button btnType="link" href="https://www.baidu.com" disabled>
              Link Disabled
            </Button>
          </div>
        </Transition>
        <Transition in={show} timeout={300} animation="zoom-in-bottom" wrapper={true}>
          <Button>Default</Button>
        </Transition>
      </header>
    </div>
  );
}

export default App;
