import React from 'react';

const GridBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-[#020202] overflow-hidden">
      {/* Mesh Gradients - Darker */}
      <div 
        className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" 
        style={{ animationDuration: '4s' }} 
      />
      <div 
        className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] mix-blend-screen" 
      />
      <div 
        className="absolute top-[40%] left-[-10%] w-[400px] h-[400px] bg-blue-500/05 rounded-full blur-[100px] mix-blend-screen" 
      />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{ 
          backgroundImage: 'linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} 
      />
    </div>
  );
};

export default GridBackground;