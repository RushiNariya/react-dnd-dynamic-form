import shortid from 'shortid';
import { ROW } from '../constants';
import {
  SELECTED_FORM_FIELD,
  SET_INITIAL_LAYOUT,
  SET_LAYOUT,
  UPDATE_FORM_FIELD,
} from './types';

const initialState = {
  selectedFormField: null,
  layout: [
    {
      type: ROW,
      id: shortid.generate(),
      srNo: 1,
      inputType: 'text',
      isTextArea: false,
      label: 'Form Title',
      placeHolder: 'form title here',
      default: '',
      name: '',
      inputId: '',
      allowedRoles: [],
    },
  ],
};

const reducer = (state = initialState, action) => {
  console.log('reducer', action);
  switch (action.type) {
    case SELECTED_FORM_FIELD:
      return {
        ...state,
        selectedFormField: action.payload,
      };

    case SET_LAYOUT:
      return {
        ...state,
        layout: action.payload,
      };

    case SET_INITIAL_LAYOUT:
      return {
        ...state,
        layout: [...state, ...action.payload],
      };

    case UPDATE_FORM_FIELD:
      return {
        ...state,
        layout: state.layout.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload.data;
          }
          return item;
        }),
      };
    default:
      return state;
  }
};

export default reducer;
