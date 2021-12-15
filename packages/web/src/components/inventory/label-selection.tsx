import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../hooks';
import { tryParseRestError } from '../../utils';
import { ComboBox, ComboBoxValue } from '../common';

export interface LabelSelectionProps {
  selected: ComboBoxValue;
  onChange: (value: ComboBoxValue) => void;
}

export const LabelSelection = observer((props: LabelSelectionProps) => {
  const { inventory, toasts } = useStores();
  const { selected, onChange } = props;
  const [loading, setLoading] = React.useState(false);
  const options = inventory.labels.map((c) => ({ title: c.name }));

  React.useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        await inventory.loadLabels();
      } catch (error) {
        toasts.error(tryParseRestError(error));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);
  // TODO: shouldn't be able to select the same label multiple times -- filterSelectedOptions impl might be wonky
  return (
    <ComboBox
      multiple
      filterSelectedOptions
      label="Labels"
      options={options}
      value={selected}
      onChange={onChange}
      loading={loading}
    />
  );
});
