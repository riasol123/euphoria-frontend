import { useState } from "react";
import {
  Box,
  Slider,
  TextField,
  Typography,
  Divider,
  Switch,
  FormControlLabel,
  Autocomplete,
  Checkbox,
  InputAdornment,
} from "@mui/material";
import { itemStyles } from "./FilterBarStyle";

const cuisineOptions = [
  "Итальянская",
  "Французская",
  "Японская",
  "Мексиканская",
  "Вегетарианская"
];

export function FilterBar() {
  const [duration, setDuration] = useState<[number, number]>([3, 10]);
  const [accommodation, setAccommodation] = useState(false);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

  const [durationInput, setDurationInput] = useState<[string, string]>([
    String(duration[0]),
    String(duration[1])
  ]);
  
  const handleSliderChange = (_: any, newValue: number | number[]) => {
    setDuration(newValue as [number, number]);
    setDurationInput([
      String((newValue as [number, number])[0]),
      String((newValue as [number, number])[1])
    ]);
  };
  
  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...durationInput] as [string, string];
    newInputs[index] = value;
    setDurationInput(newInputs);
  };
  
  const handleInputBlur = (index: number) => {
    const newInputs = [...durationInput] as [string, string];
    let val = parseInt(newInputs[index], 10);
  
    if (isNaN(val) || val < 1) val = 1;
  
    const newDuration = [...duration] as [number, number];
    newDuration[index] = val;

    if (index === 1 && val < newDuration[0]) {
      newDuration[1] = newDuration[0];
      newInputs[1] = String(newDuration[0]);
    }
  
    if (index === 0 && val > newDuration[1]) {
      newDuration[0] = newDuration[1];
      newInputs[0] = String(newDuration[1]);
    }
  
    newInputs[index] = String(newDuration[index]);
    setDuration(newDuration);
    setDurationInput(newInputs);
  };

  return (
    <Box sx={itemStyles.container}>
      <Typography>Длительность</Typography>
      <Slider
        value={duration}
        onChange={handleSliderChange}
        min={1}
        max={30}
        step={1}
        size="small"
      />
      <Box sx={itemStyles.durabilityTextFieldContainer}>
      <TextField
        label="От"
        type="number"
        value={durationInput[0]}
        onChange={(e) => handleInputChange(0, e.target.value)}
        onBlur={() => handleInputBlur(0)}
        InputProps={{
          endAdornment: <InputAdornment position="end">дней</InputAdornment>,
        }}
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*',
          style: {
            appearance: 'textfield',
          },
        }}
        sx={itemStyles.textFieldFrom}
      />

      <TextField
        label="До"
        type="number"
        value={durationInput[1]}
        onChange={(e) => handleInputChange(1, e.target.value)}
        onBlur={() => handleInputBlur(1)}
        InputProps={{
          endAdornment: <InputAdornment position="end">дней</InputAdornment>,
        }}
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*',
          style: {
            appearance: 'textfield',
          },
        }}
        sx={itemStyles.textFieldTo}

      />
      </Box>

      <Divider sx={itemStyles.divider}/>

      <FormControlLabel
        label="Проживание включено"
        labelPlacement="start"
        sx={itemStyles.accommodation}
        control={
          <Switch
            checked={accommodation}
            size="small"
            onChange={(e) => setAccommodation(e.target.checked)}
          />
        }
      />

      <Divider sx={itemStyles.divider}/>
      <Typography>Тип кухни</Typography>
      <Autocomplete
        multiple
        options={cuisineOptions}
        disableCloseOnSelect
        value={selectedCuisines}
        onChange={(_, value) => setSelectedCuisines(value)}
        getOptionLabel={(option) => option}
        sx={itemStyles.popper}
        renderOption={(props, option, { selected }) => (
          <li {...props} style={itemStyles.popper}>
            <Checkbox checked={selected} />
            {option}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={itemStyles.textField}
            placeholder={selectedCuisines.length === 0 ? "Не выбран" : ""}
          />
        )}
      />
    </Box>
  );
}
