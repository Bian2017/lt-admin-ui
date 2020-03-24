import React from 'react';
import './App.css';
import Button, { ButtonSize, ButtonType } from './components/Button/button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button disabled>按钮</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          按钮
        </Button>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com">
          百度链接
        </Button>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
