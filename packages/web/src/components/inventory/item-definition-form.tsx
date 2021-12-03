import AddIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/Upload';
import {
  Autocomplete,
  Button,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  styled,
  TextField,
} from '@mui/material';

const Input = styled('input')({
  display: 'none',
});

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

export const ItemDefinitionForm = () => {
  return (
    <Grid container spacing={2}>
      <GridItem>
        <TextField fullWidth label="Name" />
      </GridItem>
      <GridItem>
        <TextField fullWidth multiline minRows={2} label="Description" />
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
        <label htmlFor="upload-file">
          <Input accept="image/*" id="upload-file" type="file" />
          <Button
            variant="outlined"
            color="inherit"
            component="span"
            startIcon={<UploadIcon />}
            size="small"
          >
            Upload
          </Button>
        </label>
      </GridItem>

      <GridItemDivider title="Category" />
      <GridItem>
        <Autocomplete
          options={DEMO_CATEGORIES}
          renderInput={(params) => <TextField {...params} label="Category" />}
        />
      </GridItem>
      <GridItem>
        <Autocomplete
          multiple
          filterSelectedOptions
          options={DEMO_LABELS}
          renderInput={(params) => <TextField {...params} label="Labels" />}
        />
      </GridItem>

      <GridItemDivider title="Custom fields" />
      <GridItem width={6}>
        <Autocomplete
          filterSelectedOptions
          options={DEMO_CUSTOM_FIELDS}
          renderInput={(params) => <TextField {...params} label="Field" />}
        />
      </GridItem>
      <GridItem width={6}>
        <TextField fullWidth label="Value" />
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
  );
};

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

const DEMO_CATEGORIES = [
  { id: 1, label: 'Tools' },
  { id: 2, label: 'Services' },
];

const DEMO_LABELS = [
  { id: 1, label: 'Automotive' },
  { id: 2, label: 'Electronics' },
  { id: 3, label: 'Electrical' },
  { id: 4, label: 'Gardening' },
];

const DEMO_CUSTOM_FIELDS = [
  { id: 1, label: 'Type' },
  { id: 2, label: 'Size' },
  { id: 3, label: 'Color' },
];
