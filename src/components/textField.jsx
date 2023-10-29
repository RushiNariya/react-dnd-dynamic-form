import React from 'react';

function textField({ data }) {
  return (
    <div>
      <label htmlFor={data.inputId}>{data.label}</label>
      <input
        type={data.inputType}
        id={data.inputId}
        name={data.name}
        placeholder={data.placeHolder}
      />
    </div>
  );
}

export default textField;
