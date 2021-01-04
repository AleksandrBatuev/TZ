import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classname';

const Button = ({
  children, onClick, className, disabled, active, id,
}) => {
  const classes = classNames(
    className,
    { active },
  );

  return (
    <button
      className = {classes}
      disabled = {disabled}
      onClick = {onClick}
      id = {id}
    >{children}</button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onCllick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  id: PropTypes.number
};

Button.defaultProps = {
  children: 'default button',
  onClick: () => {},
  className: '',
  disabled: false,
  active: false,
  id: null,
};

export default Button;
