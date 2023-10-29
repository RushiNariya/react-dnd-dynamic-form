import React, { useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { ROW } from './constants';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectedFormField } from './redux/actions';
import FormFieldModal from './FormFieldModal';

const style = {};
const Row = ({ data, components, handleDrop, path }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state);
  const [open, setOpen] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ROW,
      id: data.id,
      path,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editHandler = (row) => {
    dispatch(selectedFormField(data));
    handleClickOpen();
  };

  const deleteHandler = (row) => {};

  const updateFormFieldHandler = {};

  return (
    <>
      <div
        ref={ref}
        style={{ ...style, opacity }}
        className="base draggable row row_style"
      >
        <div>
          {data.label} - {data.placeHolder} - {data.default}
        </div>
        <div>
          <Icon
            icon="uil:edit"
            className="icon"
            width={25}
            height={25}
            onClick={() => editHandler(data)}
          />
          <Icon
            icon="carbon:delete"
            width={25}
            height={25}
            onClick={() => deleteHandler(data)}
          />
        </div>
      </div>
      {open ? (
        <FormFieldModal
          handleClose={handleClose}
          open={open}
          updateFormFieldHandler={updateFormFieldHandler}
        />
      ) : null}
    </>
  );
};
export default Row;
