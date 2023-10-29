import React, { useState, useCallback, useEffect } from 'react';

import DropZone from './DropZone';
import SideBarItem from './SideBarItem';
import Row from './Row';
import initialData from './initial-data';
import {
  handleMoveWithinParent,
  handleMoveSidebarComponentIntoParent,
} from './helpers';

import { SIDEBAR_ITEMS, SIDEBAR_ITEM, COMPONENT, COLUMN } from './constants';
import shortid from 'shortid';
import { useDispatch, useSelector } from 'react-redux';
import { setLayout } from './redux/actions';

const Container = () => {
  const initialLayout = initialData.layout;
  const initialComponents = initialData.components;
  // const [layout, setLayout] = useState(initialLayout);
  const [components, setComponents] = useState(initialComponents);
  const dispatch = useDispatch();

  const layout = useSelector((state) => state.layout);

  console.log(layout);

  const handleDrop = useCallback(
    (dropZone, item) => {
      console.log('dropZone', dropZone);
      console.log('item', item);

      const splitDropZonePath = dropZone.path.split('-');
      const pathToDropZone = splitDropZonePath.slice(0, -1).join('-');

      const newItem = { id: item.id, type: item.type };

      // sidebar into
      if (item.type === SIDEBAR_ITEM) {
        // 1. Move sidebar item into page
        const newComponent = {
          id: shortid.generate(),
          ...item,
        };
        const newItem = {
          id: newComponent.id,
          type: COMPONENT,
        };
        setComponents({
          ...components,
          [newComponent.id]: newComponent,
        });
        dispatch(
          setLayout(
            handleMoveSidebarComponentIntoParent(
              layout,
              splitDropZonePath,
              newComponent
            )
          )
        );
        return;
      }

      // move down here since sidebar items dont have path
      const splitItemPath = item.path.split('-');
      const pathToItem = splitItemPath.slice(0, -1).join('-');

      // 2. Pure move (no create)
      if (splitItemPath.length === splitDropZonePath.length) {
        // 2.a. move within parent
        if (pathToItem === pathToDropZone) {
          dispatch(
            setLayout(
              handleMoveWithinParent(layout, splitDropZonePath, splitItemPath)
            )
          );
          return;
        }

        return;
      }
    },
    [layout, components]
  );

  const renderRow = (row, currentPath) => {
    return (
      <Row
        key={row.id}
        data={row}
        handleDrop={handleDrop}
        components={components}
        path={currentPath}
      />
    );
  };

  // useEffect(() => {
  //   console.log('inside effect');
  //   dispatch(setLayout(initialLayout));
  // }, []);

  console.log(layout, components);

  // dont use index for key when mapping over items
  // causes this issue - https://github.com/react-dnd/react-dnd/issues/342
  return (
    <div className="body">
      <div className="sideBar">
        {Object.values(SIDEBAR_ITEMS).map((sideBarItem, index) => (
          <SideBarItem key={sideBarItem.id} data={sideBarItem} />
        ))}
      </div>
      <div className="pageContainer">
        <div className="page">
          {layout.map((row, index) => {
            const currentPath = `${index}`;

            return (
              <React.Fragment key={row.id}>
                <DropZone
                  data={{
                    path: currentPath,
                    childrenCount: layout.length,
                  }}
                  onDrop={handleDrop}
                  path={currentPath}
                />
                {renderRow(row, currentPath)}
                <DropZone
                  data={{
                    path: currentPath,
                    childrenCount: layout.length,
                  }}
                  onDrop={handleDrop}
                  path={currentPath}
                />

                <hr />
              </React.Fragment>
            );
          })}
          <DropZone
            data={{
              path: `${layout.length}`,
              childrenCount: layout.length,
            }}
            onDrop={handleDrop}
            isLast
          />
        </div>
      </div>
    </div>
  );
};
export default Container;
