import {
  Autocomplete,
  createFilterOptions,
  TextField,
  TextFieldProps,
} from '@mui/material';

const filter = createFilterOptions<ComboBoxOption>();

export interface ComboBoxOption {
  title: string;
  inputValue?: string;
}

export type ComboBoxValue = ComboBoxOption | ComboBoxOption[] | null;

export interface ComboBoxProps {
  label: string;
  options: ComboBoxOption[];
  value: ComboBoxValue;
  onChange: (newValue: ComboBoxValue) => void;
  textFieldProps?: TextFieldProps;
  multiple?: boolean;
  filterSelectedOptions?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export const ComboBox = (props: ComboBoxProps) => {
  const { label, options, value, onChange, textFieldProps, ...rest } = props;

  const normalizeNewValue = (newValue: any) => {
    if (typeof newValue === 'string') {
      return { title: newValue };
    }

    if (newValue?.inputValue) {
      return { title: newValue.inputValue };
    }

    return newValue;
  };

  return (
    <Autocomplete
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      freeSolo
      {...rest}
      value={value}
      onChange={(_event, newValue) => {
        if (Array.isArray(newValue)) {
          return onChange(newValue.map(normalizeNewValue));
        }

        onChange(normalizeNewValue(newValue));
      }}
      filterOptions={(options, params) => {
        const { inputValue } = params;
        const filtered = filter(options, params);
        const isExisting = options.some(
          (option) => option.title === inputValue,
        );

        if (inputValue && !isExisting) {
          filtered.push({
            inputValue,
            title: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      options={options}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }

        if (option.inputValue) {
          return option.inputValue;
        }

        return option.title;
      }}
      renderOption={(props, option) => <li {...props}>{option.title}</li>}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          size="small"
          fullWidth
          {...textFieldProps}
        />
      )}
      ChipProps={{
        size: 'small',
      }}
    />
  );
};
