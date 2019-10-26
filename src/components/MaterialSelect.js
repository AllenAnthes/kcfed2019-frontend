import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import Async from 'react-select/async';
import makeAnimated from 'react-select/animated';
import { MenuItem, Typography, TextField, Chip, Paper, makeStyles } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles';
import classnames from 'classnames';
import { getIn } from 'formik';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
    minHeight: 56,
    cursor: 'pointer',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
    paddingLeft: theme.spacing(2),
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  chipFocused: {
    backgroundColor: emphasize(theme.palette.chip.focused, 0.08),
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
  },
  singleValue: {
    fontSize: theme.typography.htmlFontSize,
  },
  placeholder: {
    position: 'absolute',
    left: 20,
    bottom: 16,
    fontSize: theme.typography.htmlFontSize,
  },
  paper: {
    position: 'absolute',
    zIndex: 10,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
  menuItem: {
    fontSize: theme.typography.htmlFontSize,
    color: theme.palette.text.secondary,
  },
}));

const NoOptionsMessage = ({ children, selectProps, innerProps }) => (
  <Typography
    color="textSecondary"
    className={selectProps.classes.noOptionsMessage}
    {...innerProps}
  >
    {children}
  </Typography>
);

NoOptionsMessage.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
};

const inputComponent = ({ inputRef, ...props }) => {
  return <div ref={inputRef} {...props} />;
};

inputComponent.propTypes = {
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired,
    }),
  ]),
};

const Control = ({
  children,
  innerProps,
  innerRef,
  selectProps: { classes, TextFieldProps, variant },
}) => (
  <TextField
    fullWidth
    variant={variant}
    {...TextFieldProps}
    InputProps={{
      inputComponent,
      inputProps: {
        className: classes.input,
        ref: innerRef,
        children,
        ...innerProps,
      },
      ...TextFieldProps.InputProps,
    }}
  />
);

Control.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.shape({
    onMouseDown: PropTypes.func.isRequired,
  }).isRequired,
  innerRef: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired,
    }),
  ]).isRequired,
  selectProps: PropTypes.object.isRequired,
};

const Option = ({ children, innerRef, isSelected, innerProps, selectProps: { classes } }) => {
  return (
    <MenuItem
      ref={innerRef}
      selected={isSelected}
      component="div"
      className={classes.menuItem}
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
      {...innerProps}
    >
      {children}
    </MenuItem>
  );
};

Option.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.shape({
    id: PropTypes.string.isRequired,
    key: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    onMouseMove: PropTypes.func.isRequired,
    onMouseOver: PropTypes.func.isRequired,
    tabIndex: PropTypes.number.isRequired,
  }).isRequired,
  innerRef: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired,
    }),
  ]),
  isFocused: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  selectProps: PropTypes.shape({
    classes: PropTypes.shape({
      menuItem: PropTypes.string,
    }),
  }),
};

const Placeholder = ({ selectProps, innerProps = {}, children }) => {
  return (
    <Typography color="textSecondary" className={selectProps.classes.placeholder} {...innerProps}>
      {children}
    </Typography>
  );
};

Placeholder.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
};

const SingleValue = ({ selectProps, innerProps, children }) => {
  return (
    <Typography className={selectProps.classes.singleValue} {...innerProps}>
      {children}
    </Typography>
  );
};

SingleValue.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.any,
  selectProps: PropTypes.object.isRequired,
};

const ValueContainer = ({ selectProps, children }) => {
  return <div className={selectProps.classes.valueContainer}>{children}</div>;
};

ValueContainer.propTypes = {
  children: PropTypes.node,
  selectProps: PropTypes.object.isRequired,
};

const MultiValue = ({ children, selectProps, removeProps, isFocused }) => {
  return (
    <Chip
      tabIndex={-1}
      label={children}
      className={classnames(selectProps.classes.chip, {
        [selectProps.classes.chipFocused]: isFocused,
      })}
      onDelete={removeProps.onClick}
      deleteIcon={<CancelIcon {...removeProps} />}
    />
  );
};

MultiValue.propTypes = {
  children: PropTypes.node,
  isFocused: PropTypes.bool.isRequired,
  removeProps: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onTouchEnd: PropTypes.func.isRequired,
  }).isRequired,
  selectProps: PropTypes.object.isRequired,
};

const Menu = ({ children, selectProps, innerProps }) => {
  return (
    <Paper square className={selectProps.classes.paper} {...innerProps}>
      {children}
    </Paper>
  );
};

Menu.propTypes = {
  children: PropTypes.element.isRequired,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
};

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

const animatedComponents = makeAnimated(components);

/**
 * If the provided value is an object like {value: "val", label: "lbl"}
 * or an array like [{value: "val", label: "lbl"}] in the case of multiSelect
 * we pull out the actual value(s) so we can match them up with the correct
 * options.
 */
const parseValueObject = possibleObject => {
  if (possibleObject.hasOwnProperty('value')) {
    return possibleObject.value;
  }

  if (
    Array.isArray(possibleObject) &&
    possibleObject.length &&
    possibleObject[0].hasOwnProperty('value')
  ) {
    return possibleObject.map(val => val.value);
  }
  return possibleObject;
};

function getValue(value, options, isMulti, isCreatable) {
  if (value) {
    // NOTE: This assumes there are NO options that are not created.
    // this will have to be changed if we want to implement default options
    // and the ability to create more
    if (isCreatable) {
      return value.map(v => ({ label: v, value: v }));
    }

    // pull out the values if it's currently an object
    const parsedValue = parseValueObject(value);

    // if we have a value and no options just use the value for
    // the label so we can show something
    if (!options || !options.length) {
      // if no options and the passed in value (likely valueOverride)
      // has both value and label, return it
      if (value.hasOwnProperty('value') && value.hasOwnProperty('label')) {
        return value;
      }

      if (isMulti) {
        return parsedValue.map(val => ({ label: val, value: val }));
      }

      return {
        label: value,
        value: parsedValue,
      };
    }

    return isMulti
      ? options.filter(option => parsedValue.includes(option.value))
      : options.find(option => option.value === parsedValue);
  }
  return isMulti ? [] : '';
}

const getSelectComponent = ({ isCreatable, isAsync }) => {
  if (isCreatable) return Creatable;
  if (isAsync) return Async;
  return Select;
};

const MaterialSelect = ({
  classes = {},
  options = [],
  defaultOptions = [],
  id,
  onChange: onChangeOverride,
  form = {},
  field: { onChange, value, name, ...field } = {},
  value: valueOverride,
  label: labelProp,
  animateMulti = true,
  isMulti,
  isCreatable,
  isAsync,
  disableUnderline,
  ...props
}) => {
  const SelectComponent = getSelectComponent({ isCreatable, isAsync });
  const InputProps = disableUnderline ? { disableUnderline } : {};
  const baseClasses = useStyles();

  const onBlur = () => form.setFieldTouched && form.setFieldTouched(name);
  const error = getIn(form.touched, name) && Boolean(getIn(form.errors, name));
  const label = (getIn(form.touched, name) && getIn(form.errors, name)) || labelProp;

  const mergedOptions = [...defaultOptions, ...options];

  const formattedValue = getValue(valueOverride || value, mergedOptions, isMulti, isCreatable);

  // default loadOptions function used for async selects, can be overridden
  const loadOptions = (input, cb) =>
    cb(defaultOptions.filter(op => op.label.toLowerCase().includes(input.toLowerCase())));

  const handleOnChange = newSelection => {
    // handle standard case if we're inside a Formik form
    if (form.setFieldValue && name) {
      if (isMulti) {
        form.setFieldValue(name, newSelection ? newSelection.map(s => s.value) : []);
      } else {
        form.setFieldValue(name, newSelection.value);
      }
    } else if (onChange) {
      onChange(newSelection);
    }

    // call the directly passed in onChange if present
    if (onChangeOverride) {
      onChangeOverride(newSelection);
    }
  };
  return (
    <div className={classes.root || baseClasses.root}>
      <SelectComponent
        classes={{ ...baseClasses, ...classes }}
        components={animateMulti ? animatedComponents : components}
        name={name}
        value={formattedValue}
        options={options}
        isMulti={isMulti}
        inputId={id || name}
        onChange={handleOnChange}
        defaultOptions={defaultOptions}
        loadOptions={loadOptions}
        TextFieldProps={{
          InputLabelProps: {
            htmlFor: id || name,
            shrink: true,
          },
          InputProps,
          onBlur,
          error,
          label,
        }}
        {...field}
        {...props}
      />
    </div>
  );
};

MaterialSelect.propTypes = {
  classes: PropTypes.object,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.string,
    })
  ),
  defaultOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.string,
    })
  ),
  isMulti: PropTypes.bool,
  onChange: PropTypes.func,
  form: PropTypes.object,
  field: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.any,
    name: PropTypes.string,
  }),
  value: PropTypes.any,
  label: PropTypes.string,
  id: PropTypes.string,
  animateMulti: PropTypes.bool,
  isCreatable: PropTypes.bool,
  isAsync: PropTypes.bool,
  disableUnderline: PropTypes.bool,
};

export default MaterialSelect;
