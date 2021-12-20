import { Chip, Stack } from '@mui/material';

export interface ChipListProps {
  chips: { id: string; name: string }[];
  color?: 'primary' | 'secondary';
  /**
   * Set to `true` to wrap items on smaller screens.
   * This will also apply a bottom margin to each chip so they don't overlap.
   */
  wrap?: boolean;
}

export const ChipList = (props: ChipListProps) => {
  const { chips, color, wrap } = props;

  return (
    <Stack direction="row" flexWrap={wrap ? 'wrap' : undefined}>
      {chips.map((chip) => (
        <Chip
          key={chip.id}
          label={chip.name}
          color={color}
          size="small"
          sx={{ marginBottom: wrap ? 1 : 0, marginRight: 1 }}
        />
      ))}
    </Stack>
  );
};
