import { Label } from '@unfrl/usufruct-sdk-new';
import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../hooks';
import { client, tryParseRestError } from '../../utils';
import { ComboBox, ComboBoxValue } from '../common';

export interface LabelSelectionProps {
  selected: ComboBoxValue;
  onChange: (value: ComboBoxValue) => void;
}

export const LabelSelection = observer((props: LabelSelectionProps) => {
  const { toasts } = useStores();
  const { selected, onChange } = props;
  const [labels, setLabels] = React.useState<Label[]>([]);

  React.useEffect(() => {
    const load = async () => {
      try {
        setLabels(await client.labels.getLabels());
      } catch (error) {
        toasts.error(tryParseRestError(error));
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
      options={labels.map((c) => ({ title: c.name }))}
      value={selected}
      onChange={onChange}
    />
  );
});
