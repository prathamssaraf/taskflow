import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'system-ui, sans-serif',
      textAlign: 'center',
      background: '#f8fafc',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#1f2937', marginBottom: '20px' }}>
        🎉 TaskFlow Test
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '30px' }}>
        React is working! Click the button below.
      </p>
      <button 
        onClick={() => setCount(count + 1)}
        style={{
          background: '#f59e0b',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Count: {count}
      </button>
      <div style={{ marginTop: '30px', fontSize: '14px', color: '#9ca3af' }}>
        If you can see this and the button works, React is functioning properly.
        <br />
        The issue is in our TaskFlow component complexity.
      </div>
    </div>
  );
}

export default App;