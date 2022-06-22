import React from 'react';

export type TDataSelect = {
    key: string,
    value: string
  };

type TSelect = {
  label: string;
  data: TDataSelect[];
}

const Select = ({data, label}: TSelect): React.ReactElement => {
  return (
    <div>
      <label>{label}</label>
      <select>{label}
        {data.map(({ key, value}) => (
        <option key={key} value={key}>{value}</option>))}
    </select>
    </div>
  )
}

export default Select;