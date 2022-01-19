import { Label } from '@unfrl/usufruct-sdk';
import { observer } from 'mobx-react';
import React from 'react';
import { client } from '../../api';
import { useStores } from '../../hooks';
import { ComboBox, ComboBoxValue } from '../common';

export interface LabelSelectionProps {
  selected: ComboBoxValue;
  onChange: (value: ComboBoxValue) => void;
}

export const LabelSelection = observer((props: LabelSelectionProps) => {
  const { library, toasts } = useStores();
  const { selected, onChange } = props;
  const [labels, setLabels] = React.useState<Label[]>([]);

  React.useEffect(() => {
    const load = async () => {
      try {
        setLabels(await client.labels.getLabels(library.activeLibraryId));
      } catch (error) {
        toasts.error((error as any).message);
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
