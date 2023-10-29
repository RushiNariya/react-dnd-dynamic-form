import { COMPONENT, ROW, COLUMN, SIDEBAR_ITEM } from './constants';
import shortid from 'shortid';

const initialData = {
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
    // {
    //   type: ROW,
    //   id: 'row0',
    //   srNo: 'r1',
    // },
    // {
    //   type: ROW,
    //   id: 'row1',
    //   srNo: 'r2',
    // },
  ],
  components: {
    component0: { id: 'component0', type: 'input', content: 'Some input' },
    component1: { id: 'component1', type: 'image', content: 'Some image' },
    component2: { id: 'component2', type: 'email', content: 'Some email' },
    component3: { id: 'component3', type: 'name', content: 'Some name' },
    component4: { id: 'component4', type: 'phone', content: 'Some phone' },
  },
};

export default initialData;
