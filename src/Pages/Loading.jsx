 import React from 'react';
 
 const Loading = () => {
    return (
        <div>
             <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column'
    }}>
      <div className="spinner"></div>
      <p>Loading...</p>

      {/* Simple CSS spinner */}
      <style>{`
        .spinner {
          border: 8px solid #f3f3f3;
          border-top: 8px solid #3498db;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
        </div>
    );
 };
 
 export default Loading;