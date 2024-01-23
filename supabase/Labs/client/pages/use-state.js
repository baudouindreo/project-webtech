import { useState } from 'react';
import DefLayout from '/components/DefLayout';


export default function UseStatePage() {
  const [count, setCount] = useState(0);

  return (
    <DefLayout>
        <div className="h-full bg-orange-200">
            <h1>Counter: {count}</h1>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    </DefLayout>
    
  );
}
