import React, { useState } from 'react';

export default function Sidebar() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      
    </>
  );
}
