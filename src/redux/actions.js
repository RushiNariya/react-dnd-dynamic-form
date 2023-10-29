import {
  SELECTED_FORM_FIELD,
  SET_INITIAL_LAYOUT,
  SET_LAYOUT,
  UPDATE_FORM_FIELD,
} from './types';

export const selectedFormField = (data) => {
  return {
    type: SELECTED_FORM_FIELD,
    payload: data,
  };
};

export const setLayout = (data) => {
  console.log(data);
  return {
    type: SET_LAYOUT,
    payload: data,
  };
};

export const setInitialLayout = (data) => {
  return {
    type: SET_INITIAL_LAYOUT,
    payload: data,
  };
};

export const updateFormField = (id, data) => {
  return {
    type: UPDATE_FORM_FIELD,
    payload: { id, data },
  };
};
