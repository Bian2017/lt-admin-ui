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
