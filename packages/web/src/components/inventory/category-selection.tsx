import { Category } from '@unfrl/usufruct-sdk';
import { observer } from 'mobx-react';
import React from 'react';
import { client } from '../../api';
import { useStores } from '../../hooks';
import { ComboBox, ComboBoxValue } from '../common';

export interface CategorySelectionProps {
  selected: { title: string } | null;
  onChange: (value: ComboBoxValue) => void;
}

export const CategorySelection = observer((props: CategorySelectionProps) => {
  const { toasts } = useStores();
  const { selected, onChange } = props;
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    const load = async () => {
      try {
        setCategories(await client.categories.getCategories());
      } catch (error) {
        toasts.error((error as any).message);
      }
    };

    load();
  }, []);

  return (
    <ComboBox
      label="Category"
      options={categories.map((c) => ({ title: c.name }))}
      value={selected}
      onChange={onChange}
    />
  );
});
