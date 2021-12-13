import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../hooks';
import { tryParseRestError } from '../../utils';
import { ComboBox, ComboBoxValue } from '../common';

export interface CategorySelectionProps {
  selected: { title: string } | null;
  onChange: (value: ComboBoxValue) => void;
}

export const CategorySelection = observer((props: CategorySelectionProps) => {
  const { inventory, toasts } = useStores();
  const { selected, onChange } = props;
  const [loading, setLoading] = React.useState(false);
  const options = inventory.categories.map((c) => ({ title: c.name }));

  React.useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        await inventory.loadCategories();
      } catch (error) {
        toasts.error(tryParseRestError(error));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <ComboBox
      label="Category"
      options={options}
      value={selected}
      onChange={onChange}
      loading={loading}
    />
  );
});
