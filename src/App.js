// MODERN FUNCTIONAL STYLE
import React, { useState } from 'react';

function App() {
  // We replace this.state with the useState hook
  const [count, setCount] = useState(0);

  // We replace class methods with simple functions
  const handleIncrement = () => {
    setCount(count + 1);
  };

  // We return the JSX directly (no render() method)
  return (
    <div className="App">
      <h1>{count}</h1>
      <button onClick={handleIncrement}>Add</button>
    </div>
  );
}

export default App;