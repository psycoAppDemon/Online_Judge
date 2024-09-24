import React, { useEffect } from "react";
import "./style.css";

const CustomResizableBox = () => {
  useEffect(() => {
    const resizer = document.querySelector('.resizer');
    const sidebar = document.querySelector('.sidebar');
    
    let isResizing = false;

    const handleMouseDown = (mousedownEvent) => {
      isResizing = true;
      const initialWidth = sidebar.getBoundingClientRect().width;
      const initialX = mousedownEvent.clientX;

      const handleMouseMove = (mousemoveEvent) => {
        if (!isResizing) return;
        const offset = mousemoveEvent.clientX - initialX;
        const newWidth = initialWidth + offset;
        sidebar.style.width = `${newWidth}px`;
      };

      const handleMouseUp = () => {
        isResizing = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    resizer.addEventListener('mousedown', handleMouseDown);

    return () => {
      resizer.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <div className="sb-cover">
      <div className="sidebar">
        <div className="resizer"></div>
        <div className="header">
          <h3>Sidebar Menu</h3>
        </div>
        <ul>
          <li>Sidebar menu list 1</li>
          <li>Sidebar menu list 2</li>
          <li>Sidebar menu list 3</li>
          <li>Sidebar menu list 4</li>
          <li>Sidebar menu list 5</li>
          <li>Sidebar menu list 6</li>
          <li>Sidebar menu list 7</li>
          <li>Sidebar menu list 8</li>
          <li>Sidebar menu list 9</li>
        </ul>
      </div>
      <div className="rs-content">
        <h1>Let's create a resizable sidebar menu</h1>
      </div>
    </div>
  );
};

export default CustomResizableBox;
