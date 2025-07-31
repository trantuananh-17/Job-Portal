import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return <h2 className='p-2 text-2xl text-blue-500'>Hello world</h2>;
}

export default App;
