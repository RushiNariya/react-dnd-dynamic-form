import React from 'react';

function textareaField({ data }) {
  return (
    <div>
      <label htmlFor={data.inputId}>{data.label}</label>
      <textarea
        rows={4}
        id={data.inputId}
        name={data.name}
        placeholder={data.placeHolder}
      />
    </div>
  );
}

export default textareaField;
