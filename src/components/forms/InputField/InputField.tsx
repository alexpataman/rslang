import { ChangeEvent } from 'react';

import classNames from 'classnames';
import './InputField.scss';

interface IInputField {
  name: string;
  value: string;
  type: string;
  label?: string;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

export const InputField = ({
  name,
  value,
  type,
  handleChange,
  label,
  error,
}: IInputField) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (handleChange) {
      handleChange(event);
    }
  };

  return (
    <>
      {label && <label htmlFor={name}>{label}: </label>}
      <input
        type={type}
        value={value}
        name={name}
        onChange={(e) => onChange(e)}
        className={classNames('Input', { error })}
      />
    </>
  );
};
