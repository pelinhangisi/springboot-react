import { TextField } from '@mui/material';

export function Input(props) {
  const { id, label, error, onChange, type = 'text' } = props;

  return (
    <TextField
      id={id}
      label={label}
      error={Boolean(error)}
      helperText={error}
      onChange={onChange}
      type={type}
      margin="normal"
      fullWidth
      variant="outlined"
    />
  );
}
