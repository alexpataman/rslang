import classNames from 'classnames';
import './Button.scss';

interface IButton {
  name?: string;
  value?: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  children?: string;
}

export const Button = ({
  value,
  children,
  name,
  disabled,
  className,
  onClick,
}: IButton) => (
  <button
    className={classNames(['Button', className])}
    value={value}
    disabled={disabled}
    name={name}
    onClick={onClick}
  >
    {children}
  </button>
);
