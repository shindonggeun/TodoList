import React from 'react';
import TodoContainer from './containers/Todo/TodoContainers';

function App() {
  return (
    <div className="App">
      {/* TodoContainer를 호출하여 Todo 기능을 화면에 렌더링 */}
      <TodoContainer />
    </div>
  );
}

export default App;
