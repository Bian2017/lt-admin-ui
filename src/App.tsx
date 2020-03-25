import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button>Default</Button>
        <Button disabled>Default Disabled</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          Large Primary
        </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
          Danger Small
        </Button>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com">
          百度链接
        </Button>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com" disabled>
          百度链接
        </Button>
      </header>
    </div>
  );
}

export default App;
