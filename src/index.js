import React from 'react';
import ReactDOM from 'react-dom';
// import {ChangeButton} from '../dist/change-button';
import ChangeButton from './components/change_button';

const App = () => {
  return (
    <div>
      <ChangeButton />
    </div>
  )
}

//要实现局部热更新，必须要添加此句
if (module.hot) {module.hot.accept()}

ReactDOM.render(<App />, document.getElementById('root'));

