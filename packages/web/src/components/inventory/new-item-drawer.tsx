import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material';
import { UpsertItemDto } from '@unfrl/usufruct-sdk';
import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../hooks';
import { tryParseRestError } from '../../utils';
import {
  ComboBox,
  ComboBoxValue,
  FormActions,
  ResponsiveDrawer,
  UploadButton,
} from '../common';
import { Content } from '../layout';
import { CategorySelection } from './category-selection';
import { LabelSelection } from './label-selection';

const GridItem = (props: { children: JSX.Element; width?: number }) => (
  <Grid item xs={props.width ?? 12}>
    {props.children}
  </Grid>
);

const GridItemDivider = (props: { title: string }) => {
  return (
    <GridItem>
      <Divider>{props.title}</Divider>
    </GridItem>
  );
};

const TextField = (props: MuiTextFieldProps) => {
  return <MuiTextField {...props} size="small" fullWidth />;
};

const DEFAULT_ITEM_DTO: UpsertItemDto = {
  name: '',
  description: '',
  categoryNames: [],
  labelNames: [],
};

export interface NewItemDrawerProps {
  open: boolean;
  onClose: () => void;
  initialItem?: UpsertItemDto;
}

export const NewItemDrawer = observer((props: NewItemDrawerProps) => {
  const { inventory, toasts } = useStores();
  const { open, onClose, initialItem } = props;
  const [saving, setSaving] = React.useState(false);
  const [field, setField] = React.useState<ComboBoxValue>(null);
  const [item, setItem] = React.useState<UpsertItemDto>(
    initialItem ?? DEFAULT_ITEM_DTO,
  );

  // items can have multiple categories, but restricting selection just to one right now
  const selectedCategory = item.categoryNames?.length
    ? { title: item.categoryNames[0] }
    : null;
  const selectedLabels = item.labelNames?.map((l) => ({ title: l })) ?? [];

  const handleSave = async () => {
    try {
      setSaving(true);

      const newItem = await inventory.createItem(item);

      toasts.success(`${newItem.name} added!`);

      setItem(DEFAULT_ITEM_DTO);
      onClose();
    } catch (error) {
      toasts.error(tryParseRestError(error));
    } finally {
      setSaving(false);
    }
  };

  const handleChange = <K extends keyof UpsertItemDto>(
    key: K,
    value: UpsertItemDto[K],
  ) => {
    setItem({ ...item, [key]: value });
  };

  const handleSelect = (key: keyof UpsertItemDto) => (value: ComboBoxValue) => {
    if (!value) {
      return handleChange(key, []);
    }

    if (Array.isArray(value)) {
      return handleChange(
        key,
        value.map((v) => v.title),
      );
    }

    handleChange(key, [value.title]);
  };

  return (
    <ResponsiveDrawer
      open={open}
      onClose={onClose}
      title="New item"
      anchor="right"
      headerOptions={
        <FormActions
          onCancel={onClose}
          onSave={handleSave}
          saveDisabled={!item.name}
          saving={saving}
        />
      }
    >
      <Content>
        <Grid container spacing={2}>
          <GridItem>
            <TextField
              required
              label="Name"
              value={item.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </GridItem>
          <GridItem>
            <TextField
              multiline
              minRows={2}
              label="Description"
              value={item.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </GridItem>

          <GridItemDivider title="Images" />
          <GridItem>
            <ImageList cols={3} rowHeight={164} sx={{ margin: 0 }}>
              {DEMO_IMAGES.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </GridItem>
          <GridItem>
            <UploadButton
              accept="image/*"
              onUpload={(files) =>
                console.log('todo handle file upload', files)
              }
            />
          </GridItem>

          <GridItemDivider title="Category" />
          <GridItem>
            <CategorySelection
              selected={selectedCategory}
              onChange={handleSelect('categoryNames')}
            />
          </GridItem>
          <GridItem>
            <LabelSelection
              selected={selectedLabels}
              onChange={handleSelect('labelNames')}
            />
          </GridItem>

          <GridItemDivider title="Custom fields" />
          <GridItem width={6}>
            <ComboBox
              filterSelectedOptions
              options={DEMO_CUSTOM_FIELDS}
              label="Field"
              value={field}
              onChange={setField}
            />
          </GridItem>
          <GridItem width={6}>
            <TextField label="Value" />
          </GridItem>
          <GridItem>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<AddIcon />}
              size="small"
            >
              Add field
            </Button>
          </GridItem>
        </Grid>
      </Content>
    </ResponsiveDrawer>
  );
});

const DEMO_IMAGES = [
  {
    img: 'https://images.unsplash.com/photo-1581621293775-7aac902d7032',
    title: 'Screwdriver',
  },
  {
    img: 'https://images.unsplash.com/photo-1524224313114-ebd9c49dde82',
    title: 'Screwdriver 2',
  },
  {
    img: 'https://images.unsplash.com/photo-1586187543416-b1e5669978b3',
    title: 'Small screwdriver',
  },
];

const DEMO_CUSTOM_FIELDS = [
  { id: 1, title: 'Type' },
  { id: 2, title: 'Size' },
  { id: 3, title: 'Color' },
];
