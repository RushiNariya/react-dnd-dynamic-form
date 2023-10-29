import React from "react";
import { useDrag } from "react-dnd";
import { ROW } from "./constants";

const SideBarItem = ({ data }) => {
  const [{ opacity }, drag] = useDrag({
    type: ROW,
    item: data,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  });
  
  return (
    <div className="sideBarItem" ref={drag} style={{ opacity }}>
      {data.inputType}
    </div>
  );
};
export default SideBarItem;
