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
}

export const ComboBox = (props: ComboBoxProps) => {
  const {
    label,
    options,
    value,
    onChange,
    textFieldProps,
    loading,
    multiple,
    filterSelectedOptions,
  } = props;

  return (
    <Autocomplete
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      freeSolo
      loading={loading}
      multiple={multiple}
      filterSelectedOptions={filterSelectedOptions}
      value={value}
      onChange={(_event, newValue) => {
        if (Array.isArray(newValue)) {
          const values = newValue.map((val) =>
            typeof val === 'string' ? { title: val } : val,
          );

          return onChange(values);
        }

        if (typeof newValue === 'string') {
          return onChange({ title: newValue });
        }

        if (newValue?.inputValue) {
          // Create a new value from the user input
          return onChange({ title: newValue.inputValue });
        }

        onChange(newValue);
      }}
      filterOptions={(options, params) => {
        const { inputValue } = params;
        const filtered = filter(options, params);
        const isExisting = options.some(
          (option) => inputValue === option.title,
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
