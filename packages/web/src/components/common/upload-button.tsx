import UploadIcon from '@mui/icons-material/Upload';
import { Button, ButtonProps, styled } from '@mui/material';
import React from 'react';

const Input = styled('input')({
  display: 'none',
});

export interface UploadButtonProps extends ButtonProps {
  /**
   * Allowed file types, defaults to '*'.
   */
  accept?: string;

  /**
   * Set to true to allow multiple files to be selected, default is false.
   */
  multiple?: boolean;

  /**
   * Callback to upload files after selection. If `multiple` is `false`, then the array will only have a single element.
   */
  onUpload: (upload: File[]) => void;
}

export const UploadButton = (props: UploadButtonProps) => {
  const { accept, multiple, children, onUpload, ...rest } = props;
  const inputId = props.id ?? 'upload-file-button';

  const handleFilesPicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target?.files;
    if (!fileList?.length) {
      return;
    }

    const files: File[] = [];
    for (const file of fileList) {
      files.push(file);
    }

    onUpload(files);
  };

  return (
    <label htmlFor={inputId}>
      <Input
        multiple={multiple}
        accept={accept}
        id={inputId}
        type="file"
        onChange={handleFilesPicked}
      />
      <Button
        startIcon={<UploadIcon />}
        size="small"
        component="span"
        variant="outlined"
        color="inherit"
        {...rest}
      >
        {children ?? 'Upload'}
      </Button>
    </label>
  );
};
