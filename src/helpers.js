import shortid from 'shortid';
import { ROW, COLUMN, COMPONENT } from './constants';

// a little function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed); // inserting task in new index

  return result;
};

export const insert = (arr, index, newItem) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index),
];

export const reorderChildren = (children, splitDropZonePath, splitItemPath) => {
  if (splitDropZonePath.length === 1) {
    const dropZoneIndex = Number(splitDropZonePath[0]);
    const itemIndex = Number(splitItemPath[0]);
    return reorder(children, itemIndex, dropZoneIndex);
  }

  const updatedChildren = [...children];

  const curIndex = Number(splitDropZonePath.slice(0, 1));

  // Update the specific node's children
  const splitDropZoneChildrenPath = splitDropZonePath.slice(1);
  const splitItemChildrenPath = splitItemPath.slice(1);
  const nodeChildren = updatedChildren[curIndex];
  updatedChildren[curIndex] = {
    ...nodeChildren,
    children: reorderChildren(
      nodeChildren.children,
      splitDropZoneChildrenPath,
      splitItemChildrenPath
    ),
  };

  return updatedChildren;
};

export const addChildToChildren = (children, splitDropZonePath, item) => {
  const dropZoneIndex = Number(splitDropZonePath[0]);
  return insert(children, dropZoneIndex, item);
};

export const handleMoveWithinParent = (
  layout,
  splitDropZonePath,
  splitItemPath
) => {
  console.log('move within parent');
  return reorderChildren(layout, splitDropZonePath, splitItemPath);
};

export const handleMoveSidebarComponentIntoParent = (
  layout,
  splitDropZonePath,
  item
) => {
  console.log(splitDropZonePath.length, splitDropZonePath);
  let newLayoutStructure;
  switch (splitDropZonePath.length) {
    case 1: {
      newLayoutStructure = {
        ...item,
        type: ROW,
        id: shortid.generate(),
      };
      break;
    }

    default: {
      newLayoutStructure = item;
    }
  }

  return addChildToChildren(layout, splitDropZonePath, newLayoutStructure);
};
