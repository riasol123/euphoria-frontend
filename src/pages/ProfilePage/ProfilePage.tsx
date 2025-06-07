import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { styles } from './ProfilePageStyle';
import { EditUserForm } from '../../components/EditUserForm/EditUserForm';
import { AccountSetting } from '../../components/AccountSetting/AccountSetting';
import { BookingHistory } from '../../components/BookingHistory/BookingHistory';
import { OrganizerForm } from '../../components/OrganizerForm/OrganizerForm';
import { OrganizerTours } from '../../components/OrganizerTours/OrganizerTours';
import { CreateTourForm } from '../../components/CreateTourForm/CreateTourForm';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={styles.tabPanelBox}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function ProfilePage() {
  const [value, setValue] = React.useState(0);
  const isOrganizer = true; // This should come from your auth context/state

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={styles.container}>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={styles.tab}
      >
        <Tab label="Личные данные" {...a11yProps(0)} />
        <Tab label="История бронирования" {...a11yProps(1)} />
        {isOrganizer ? (
            <Tab label="Мои туры" {...a11yProps(2)} />
        ) : (
        <Tab label="Стать организатором" {...a11yProps(2)} />
        )}
        {isOrganizer && <Tab label="Создать тур" {...a11yProps(3)} />}
        <Tab label="Настройки аккаунта" {...a11yProps(isOrganizer ? 4 : 3)} />
      </Tabs>
      <Box sx={styles.panel}>
        <TabPanel value={value} index={0}><EditUserForm /></TabPanel>
        <TabPanel value={value} index={1}><BookingHistory /></TabPanel>
        <TabPanel value={value} index={2}>
          {isOrganizer ? <OrganizerTours /> : <OrganizerForm />}
        </TabPanel>
        {isOrganizer && (
          <TabPanel value={value} index={3}>
            <CreateTourForm />
          </TabPanel>
        )}
        <TabPanel value={value} index={isOrganizer ? 4 : 3}><AccountSetting /></TabPanel>
      </Box>
    </Box>
  );
}
