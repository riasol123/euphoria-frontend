import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { setSearchData } from "../../redux/actions/search";
import DropDown from "../../assets/dropdown.svg";
import { getCategoriesRequest } from '../../redux/actions/categories';
import { getFoodCategoriesRequest } from "../../redux/actions/foodCategories";

interface CuisineType {
  id: number;
  title: string;
}

interface CategoryType {
  id: number;
  title: string;
}

export function FilterBar() {
  const [duration, setDuration] = useState<[number, number]>([1, 30]);
  const [accommodation, setAccommodation] = useState(false);
  const [selectedCuisines, setSelectedCuisines] = useState<CuisineType[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>([]);
  const { categories } = useSelector((state: any) => state.categories);
  const dispatch = useDispatch();

  const { categories: foodCategories } = useSelector((state: any) => state.foodCategories);

  const [durationInput, setDurationInput] = useState<[string, string]>([
    String(duration[0]),
    String(duration[1])
  ]);

  useEffect(() => {
    dispatch(getCategoriesRequest());
    dispatch(getFoodCategoriesRequest());
  }, [dispatch]);

  const handleSliderChange = (_: any, newValue: number | number[]) => {
    setDuration(newValue as [number, number]);
    setDurationInput([
      String((newValue as [number, number])[0]),
      String((newValue as [number, number])[1])
    ]);
    dispatch(setSearchData({ 
      city: '',
      dateRange: { start: null, end: null },
      adults: 2,
      children: 0,
      durationFrom: (newValue as [number, number])[0], 
      durationTo: (newValue as [number, number])[1] 
    }));
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
    dispatch(setSearchData({ 
      city: '',
      dateRange: { start: null, end: null },
      adults: 2,
      children: 0,
      durationFrom: newDuration[0],
      durationTo: newDuration[1]
    }));
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setAccommodation(checked);
    dispatch(setSearchData({ 
      city: '',
      dateRange: { start: null, end: null },
      adults: 2,
      children: 0,
      durationFrom: duration[0],
      durationTo: duration[1]
    }));
  };

  const handleCuisineChange = (_: any, newValue: CuisineType[]) => {
    if (newValue.length <= 3) {
      setSelectedCuisines(newValue);
      dispatch(setSearchData({ cuisineTypes: newValue.map(cuisine => cuisine.id) } as any));
    }
  };

  const handleCategoryChange = (_: any, newValue: CategoryType[]) => {
    if (newValue.length <= 5) {
      setSelectedCategories(newValue);
      dispatch(setSearchData({ categoryTypes: newValue.map(category => category.id) } as any));
    }
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

      <Divider sx={itemStyles.divider} />

      <FormControlLabel
        label="Проживание включено"
        labelPlacement="start"
        sx={itemStyles.accommodation}
        control={
          <Switch
            checked={accommodation}
            size="small"
            onChange={handleCheck}
          />
        }
      />

      <Divider sx={itemStyles.divider} />
      <Typography>Тип кухни</Typography>
      <Autocomplete
        multiple
        options={foodCategories || []}
        disableCloseOnSelect
        value={selectedCuisines}
        onChange={handleCuisineChange}
        getOptionLabel={(option) => option.title}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        sx={itemStyles.popper}
        popupIcon={<img src={DropDown} alt="dropdown" className="custom-dropdown-icon" style={{ width: 20, height: 20, opacity: 0.7, transition: 'transform 0.2s' }} />}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox checked={selected} />
            {option.title}
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

      <Divider sx={itemStyles.divider} />
      <Typography>Категории</Typography>
      <Autocomplete
        multiple
        options={categories || []}
        disableCloseOnSelect
        value={selectedCategories}
        onChange={handleCategoryChange}
        getOptionLabel={(option) => option.title}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        sx={itemStyles.popper}
        popupIcon={<img src={DropDown} alt="dropdown" className="custom-dropdown-icon" style={{ width: 20, height: 20, opacity: 0.7, transition: 'transform 0.2s' }} />}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox checked={selected} />
            {option.title}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={itemStyles.textField}
            placeholder={selectedCategories.length === 0 ? "Не выбран" : ""}
          />
        )}
      />
    </Box>
  );
}
