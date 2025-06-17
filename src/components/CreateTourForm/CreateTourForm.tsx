import React, { useState, useRef } from 'react';
import { Box, Button, TextField, Typography, Stepper, Step, StepLabel, Divider, InputAdornment, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TitleIcon from '@mui/icons-material/Title';
import SubtitleIcon from '@mui/icons-material/Subtitles';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { styles } from './CreateTourFormStyle';
import { ConfigProvider, Calendar, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
import 'dayjs/locale/ru';
dayjs.locale('ru');
import { Input as MuiInput } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from 'react-redux';
import { createTourRequest } from '../../redux/actions/tour';

const steps = ['Основная информация', 'Описание', 'Даты'];

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export const CreateTourForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState('');
  const [duration, setDuration] = useState('1');
  const [dateRanges, setDateRanges] = useState<{ start: Dayjs; end: Dayjs }[]>([]);
  const [price, setPrice] = useState('');
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [categories, setCategories] = useState<{ title: string; category: string }[]>([]);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(0, 10));
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new window.Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleDateSelect = (date: Dayjs) => {
    const days = parseInt(duration, 10);
    if (!isNaN(days) && days > 0) {
      const end = date.clone().add(days - 1, 'day');
      setDateRanges([...dateRanges, { start: date, end }]);
    }
  };

  const handleRemoveDateRange = (idx: number) => {
    setDateRanges(dateRanges.filter((_, i) => i !== idx));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Если вводится 0 и поле пустое, игнорируем ввод
    if (value === '0') {
      return;
    }
    const formattedValue = formatPrice(value);
    setPrice(formattedValue);
  };

  const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value === '' || Number(value) > 0) {
      setCapacity(value);
    }
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return (
          // fileList.length > 0 &&
          name.trim() !== '' &&
          capacity.trim() !== '' &&
          Number(capacity) > 0 &&
          price.trim() !== '' &&
          Number(price.replace(/\s/g, '')) > 0
        );
      case 1:
        return description.trim() !== '';
      case 2:
        return dateRanges.length > 0;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepValid()) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStepValid()) {
      // Формируем данные для создания тура
      const tourData = {
        title: name,
        description,
        isAccommodation: true,
        address: 'string',
        duration: Number(duration),
        city: 'string',
        categoryIds: categories.map((_: any, i: number) => i),
        flows: dateRanges.map(range => ({
          startDate: range.start.toISOString(),
          endDate: range.end.toISOString(),
          participant: Number(capacity),
          currentPrice: Number(price.replace(/\s/g, '')),
        })),
      };
      dispatch(createTourRequest(tourData));
    }
  };

  const formatText = (format: 'title' | 'subtitle' | 'list') => {
    const textarea = descriptionRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = description.substring(start, end);
    const textBefore = description.substring(0, start);
    const textAfter = description.substring(end);
    
    // Проверяем, находится ли текст уже на отдельной строке
    const isOnNewLine = (text: string) => {
      const lastChar = text[text.length - 1];
      return lastChar === '\n' || text.length === 0;
    };
    
    const needsNewLineBefore = !isOnNewLine(textBefore);
    const needsNewLineAfter = textAfter.length > 0 && textAfter[0] !== '\n';

    let newText = '';
    const beforeNewLine = needsNewLineBefore ? '\n' : '';
    const afterNewLine = needsNewLineAfter ? '\n' : '';

    if (format === 'title' || format === 'subtitle') {
      // Если выделена не вся строка, переносим остаток на новую строку без пробелов
      const beforeNewLine = needsNewLineBefore ? '\n' : '';
      const afterNewLine = needsNewLineAfter ? '\n' : '';
      let formatted = '';
      if (start !== end && selectedText.indexOf('\n') === -1) {
        const lineStart = description.lastIndexOf('\n', start - 1) + 1;
        const lineEnd = description.indexOf('\n', end);
        const fullLine = description.substring(lineStart, lineEnd === -1 ? description.length : lineEnd);
        const beforeSel = fullLine.substring(0, start - lineStart);
        const afterSel = fullLine.substring(end - lineStart);
        formatted =
          textBefore.substring(0, lineStart) +
          beforeSel +
          (format === 'title' ? '***' : '**') + selectedText.trim() + (format === 'title' ? '***' : '**') +
          '\n' +
          afterSel.trimStart() +
          textAfter.substring(lineEnd === -1 ? description.length : lineEnd);
      } else {
        formatted = textBefore + beforeNewLine + (format === 'title' ? '***' : '**') + selectedText.trim() + (format === 'title' ? '***' : '**') + afterNewLine + textAfter;
      }
      newText = formatted;
    } else if (format === 'list') {
      // Аналогичная логика для списка
      if (start !== end && selectedText.indexOf('\n') === -1) {
        const lineStart = description.lastIndexOf('\n', start - 1) + 1;
        const lineEnd = description.indexOf('\n', end);
        const fullLine = description.substring(lineStart, lineEnd === -1 ? description.length : lineEnd);
        const beforeSel = fullLine.substring(0, start - lineStart);
        const afterSel = fullLine.substring(end - lineStart);
        newText =
          textBefore.substring(0, lineStart) +
          beforeSel +
          '· ' + selectedText.trim() +
          '\n' +
          afterSel.trimStart() +
          textAfter.substring(lineEnd === -1 ? description.length : lineEnd);
      } else {
        const lines = selectedText.split('\n');
        const formattedLines = lines.map(line => '· ' + line.trim()).join('\n');
        newText = textBefore + beforeNewLine + formattedLines + afterNewLine + textAfter;
      }
    }

    setDescription(newText);
  };

  const formatPrice = (value: string) => {
    // Удаляем все нецифровые символы
    const numericValue = value.replace(/\D/g, '');
    // Если первая цифра 0, удаляем её
    const cleanValue = numericValue.startsWith('0') ? numericValue.slice(1) : numericValue;
    // Форматируем число с разделителями разрядов
    return new Intl.NumberFormat('ru-RU').format(Number(cleanValue));
  };

  // Данные для автоселектов
  const cuisineOptions = [
    'Итальянская', 'Французская', 'Японская', 'Грузинская', 'Русская', 'Тайская', 'Мексиканская', 'Китайская', 'Индийская', 'Испанская',
  ];
  const categoryOptions = [
    { title: 'Активный отдых', category: 'Активности' },
    { title: 'Экскурсии', category: 'Культура' },
    { title: 'Гастрономия', category: 'Еда' },
    { title: 'Культура', category: 'Культура' },
    { title: 'Природа', category: 'Природа' },
    { title: 'Мастер-классы', category: 'Обучение' },
    { title: 'Велопрогулки', category: 'Активности' },
    { title: 'Пляжный отдых', category: 'Природа' },
    { title: 'История', category: 'Культура' },
  ];

  return (
    <Box component="form" onSubmit={handleSubmit} sx={styles.outerContainer}>
      <Box sx={styles.headerBox}>
        <Typography sx={styles.title}>Создание тура</Typography>
        <Stepper activeStep={activeStep} alternativeLabel sx={styles.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box sx={styles.mainBox}>
        {/* Step 1: Main info */}
        {activeStep === 0 && (
          <Box sx={styles.stepBox}>
            <Box sx={styles.photoUploadRow}>
              <Box sx={styles.photoUploadColumn}>
                <Box sx={styles.photoCount}>{fileList.length} / 10 фото</Box>
                <ConfigProvider locale={ruRU} theme={styles.datePickerTheme}>
                  <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                    maxCount={10}
                  >
                    {fileList.length < 10 && '+ Загрузить'}
                  </Upload>
                </ConfigProvider>
              </Box>
            </Box>
            <Box sx={styles.formColumns}>
              <Box sx={{ ...styles.formColumn, ...styles.formColumnCentered}}>
                <TextField
                  label="Название тура"
                  name="name"
                  fullWidth
                  sx={{ ...styles.input, ...styles.inputAdaptive }}
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <Box sx={styles.textFieldContainer}>
                  <TextField
                    label="Кол-во участников"
                    name="capacity"
                    type="text"
                    value={capacity}
                    onChange={handleCapacityChange}
                    inputProps={{
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                      style: { appearance: 'textfield' }
                    }}
                    sx={{ ...styles.textFieldLeft }}
                  />
                  <TextField
                    label="Цена"
                    name="price"
                    type="text"
                    value={price}
                    onChange={handlePriceChange}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">₽</InputAdornment>,
                    }}
                    inputProps={{
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                      style: { appearance: 'textfield' }
                    }}
                    sx={{ ...styles.textFieldRight }}
                  />
                </Box>
                <Autocomplete
                  multiple
                  options={cuisineOptions}
                  value={cuisines}
                  onChange={(_, newValue) => {
                    if (newValue.length <= 3) setCuisines(newValue);
                  }}
                  disableCloseOnSelect
                  limitTags={3}
                  getOptionDisabled={() => cuisines.length >= 3}
                  disableClearable
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Тип кухни"
                      placeholder="Выберите до 3"
                      sx={{ ...styles.input, ...styles.autoCompleteTextField }}
                      InputProps={{ ...params.InputProps, endAdornment: null }}
                    />
                  )}
                  sx={styles.inputAdaptive}
                />
                <Autocomplete
                  multiple
                  freeSolo
                  options={categoryOptions}
                  getOptionLabel={option => typeof option === 'string' ? option : option.title}
                  value={categories}
                  onChange={(_, newValue) => {
                    if (newValue.length <= 5) setCategories(newValue as any);
                  }}
                  limitTags={5}
                  renderInput={(params) => (
                    <TextField {...params} label="Категории" placeholder="Выберите или добавьте до 5" sx={{ ...styles.input, ...styles.autoCompleteTextField }} />
                  )}
                  sx={styles.inputAdaptive}
                />
              </Box>
            </Box>
          </Box>
        )}
        {/* Step 2: Description */}
        {activeStep === 1 && (
          <Box sx={styles.stepBox}>
            <Box sx={styles.descriptionContainer}>
              <Box sx={styles.formattingButtons}>
                <Button
                  onClick={() => formatText('title')}
                  sx={styles.formatButton}
                  startIcon={<TitleIcon />}
                >
                  Заголовок
                </Button>
                <Button
                  onClick={() => formatText('subtitle')}
                  sx={styles.formatButton}
                  startIcon={<SubtitleIcon />}
                >
                  Подзаголовок
                </Button>
                <Button
                  onClick={() => formatText('list')}
                  sx={styles.formatButton}
                  startIcon={<FormatListNumberedIcon />}
                >
                  Нумерация
                </Button>
              </Box>
              <TextField
                label="Описание"
                name="description"
                fullWidth
                multiline
                value={description}
                onChange={e => setDescription(e.target.value)}
                inputRef={descriptionRef}
                sx={styles.descriptionTextField}
              />
            </Box>
          </Box>
        )}
        {/* Step 3: Duration & Dates */}
        {activeStep === 2 && (
          <Box sx={styles.stepBox}>
            <Box sx={styles.formColumns}>
              <Box sx={{ ...styles.formColumn, gap: '0px' }}>
                <MuiInput
                  value={duration}
                  onChange={e => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
                    setDuration(val);
                  }}
                  inputProps={{ min: 1, maxLength: 2, style: { textAlign: 'center' } }}
                  startAdornment={<InputAdornment position="start" sx={styles.durationPrefix}>Продолжительность</InputAdornment>}
                  endAdornment={<InputAdornment position="end" sx={styles.durationSuffix}>дней</InputAdornment>}
                  sx={styles.durationInput}
                />
                <Box sx={styles.datesBox}>
                  <ConfigProvider locale={ruRU} theme={styles.datePickerTheme}>
                    <Box sx={styles.calendarSmallBox}>
                      <Calendar
                        onSelect={handleDateSelect}
                        disabledDate={(current: Dayjs) =>
                          current &&
                          (current < dayjs().startOf('day') ||
                            dateRanges.some(r =>
                              (current.isAfter(r.start, 'day') || current.isSame(r.start, 'day')) &&
                              (current.isBefore(r.end, 'day') || current.isSame(r.end, 'day'))
                            ))
                        }
                      />
                    </Box>
                  </ConfigProvider>
                </Box>
              </Box>
              <Box sx={styles.formColumn}>
                <Box sx={styles.datesListBox}>
                  {dateRanges.length === 0 && (
                    <Typography sx={styles.noDatesText}>Нет выбранных дат</Typography>
                  )}
                  {dateRanges.map((range, idx) => (
                    <React.Fragment key={idx}>
                      <Box sx={styles.dateListItemBox}>
                        <Typography sx={styles.dateListItemText}>
                          {range.start.format('D MMMM YYYY')} — {range.end.format('D MMMM YYYY')}
                        </Typography>
                        <IconButton size="small" onClick={() => handleRemoveDateRange(idx)} sx={styles.removeDateBtn}>
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      {idx < dateRanges.length - 1 && <Divider sx={styles.dateListDivider} />}
                    </React.Fragment>
                  ))}
                </Box>
                {dateRanges.length > 0 && (
                  <Button onClick={() => setDateRanges([])} variant="outlined" sx={styles.deleteAllButton}>
                    Удалить все
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <Box sx={styles.footerBox}>
        <Box sx={styles.buttonsBox}>
          {activeStep > 0 && (
            <Button onClick={handleBack} variant="text" sx={styles.backButton}>
              Назад
            </Button>
          )}
          <Box sx={{ flex: 1 }} />
          {activeStep < steps.length - 1 && (
            <Button 
              onClick={handleNext} 
              variant="text" 
              sx={styles.backButton} 
              disableElevation
              disabled={!isStepValid()}
            >
              Далее
            </Button>
          )}
          {activeStep === steps.length - 1 && (
            <Button 
              type="submit" 
              variant="outlined" 
              sx={styles.saveButton} 
              disableElevation
              disabled={!isStepValid()}
            >
              Создать тур
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}; 