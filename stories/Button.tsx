import React from 'react';
import './button.css';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  readonly primary?: boolean;
  /**
   * What background color to use
   */
  readonly backgroundColor?: string;
  /**
   * How large should the button be?
   */
  readonly size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  readonly children: React.ReactNode;
  /**
   * Optional click handler
   */
  readonly onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  children,
  ...props
}: ButtonProps) => {
  const mode = primary
    ? 'storybook-button--primary'
    : 'storybook-button--secondary';
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(
        ' ',
      )}
      style={{ backgroundColor }}
      {...props}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  primary: false,
  size: 'medium',
  backgroundColor: undefined,
  onClick: undefined,
};

export default Button;
