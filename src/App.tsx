import {
  AppBar, Box, Card, CardContent, CardHeader,
  Checkbox, createStyles, CssBaseline,
  FormControlLabel, FormGroup, IconButton, Paper,
  SwipeableDrawer,
  Tab, Tabs, TextField, Theme, Toolbar,
  Typography, WithStyles, withStyles
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import moment from "moment";
import "moment/locale/ru";
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Weather from './entities/Weather';
import IProvider from "./providers/IProvider";
import MsnProvider from "./providers/MsnProvider";
import OpenWeatherProvider from './providers/OpenWeatherProvider';

const providers: IProvider[] = [
  new OpenWeatherProvider("6d0e27996f99802be89d9575a5dfb7ca"),
  new MsnProvider()
];

moment.locale("ru-RU");

const drawerWidth = 240;

const styles = (theme: Theme) => createStyles({
  root: {
    paddingTop: 128
  },
  field: {
    flex: 1
  },
  providerHeader: {
    display: "inline-block",
    position: 'sticky', 
    top: 0,
    backgroundColor: theme.palette.background.default,
    opacity: 0.6
  },
  weather: {
    position: 'sticky', 
    top: 0
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  }
})

type DataType = {
  provider: string, 
  data: {
    [
      /**
       * Iso date
       */
      key: string
    ]: Weather
  }
};

//@ts-ignore
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
function App({classes}: WithStyles<typeof styles>) {
  const [datas, setDatas] = useState<DataType[]>([]);
  const [selectedProviders, setSelectedProviders] = useState<{[key: string]:boolean}>({});
  const [city, setCity] = useState<string>("");

  const onChangeCity:  React.ChangeEventHandler<HTMLInputElement> = useCallback(({target: {value}}) => {
    localStorage.setItem("city",value);
    setCity(value);
  },[]);

  useEffect(()=>{
    const storedProviders = localStorage.getItem("selectedProviders");
    const storedCity = localStorage.getItem("city");
    if (storedProviders){
      setSelectedProviders(JSON.parse(storedProviders));
    }
    if (storedCity){
      setCity(storedCity);
    }
  },[]);


  useEffect(() => {
    let breaked = {v:false};
    const get = async () => {
      const data: DataType[] = [];
      const filteredProviders = providers.filter(
        ({ name }) => selectedProviders[name] === undefined ? true : selectedProviders[name]
      );
      if (filteredProviders.length > 0) {
        for (const provider of filteredProviders) {
          provider.getWeather(city).then((value: Weather[] = []) => {
            const valuesMap = value.reduce((prev, next) => ({
              ...prev,
              [next.date.getDate()]: next
            }), {} as DataType["data"]);
            data.push({
              data: valuesMap,
              provider: provider.name
            });
            if (!breaked.v) {
              setDatas([...data]);
            }
          });
        }
      } else {
        setDatas([]);
      }
    };
    get();
    return () => {
      breaked.v = true;
    }
  }, [city, selectedProviders]);

  const [open, setOpen] = React.useState(false);

  const toggleDrawerOpen = useCallback(() => {
    setOpen(open=>!open);
  },[]);

  useEffect(()=>{
    localStorage.setItem("selectedProviders",JSON.stringify(selectedProviders));
  },[selectedProviders]);

  const [tab, setTab] = React.useState(moment().date());

  const tabs = useMemo(() => new Array(5).fill(null).map((_,idx)=>moment().add("day",idx)),[]);

  return (
    <>
      <CssBaseline/>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawerOpen}
            edge="start"
            className={classes.menuButton}
          >
            <Menu/>
          </IconButton>
          <Paper className={classes.field}>
            <Box paddingLeft={1} paddingRight={1}>
              <TextField
                fullWidth
                name="city" 
                label="Город" 
                value={city}
                onChange={onChangeCity}
              />
            </Box>
          </Paper>
        </Toolbar>
        <Box flex={1} overflow="hidden">
            <Tabs value={tab} onChange={(_,v)=>setTab(v)} variant="scrollable" >
                {tabs.map(v=> (
                  <Tab value={v.date()} label={v.format("dddd, L")} />
                ))}
            </Tabs>
          </Box>
      </AppBar>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        className={classes.drawer}
        anchor="left"
        open={open}
        onClose={toggleDrawerOpen}
        onOpen={toggleDrawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Box padding={1}>
          <Typography variant="h6">Провайдеры</Typography>
          <FormGroup >
            {providers.map(({name})=>(
              <FormControlLabel label={name} control={
                <Checkbox
                  name={`checked${name}`}
                  color="primary"
                  checked={selectedProviders[name] === undefined ? true : selectedProviders[name]}
                  onChange={(_,checked)=> setSelectedProviders(selectedProviders=> ({
                    ...selectedProviders,
                    [name]: checked
                  }))}
                />
              }/>
            ))}
          </FormGroup>
        </Box>
      </SwipeableDrawer>
      <Box className={classes.root}>
          {datas.map(({provider,data})=> (
            <Box display="inline-block" paddingTop={1} paddingBottom={1} key={provider} >
                {data[tab] && (
                  <Box
                    flex={1} 
                    padding={1}
                  >
                    <Box component={Card} height={1} >
                      <CardHeader title={provider} />
                      <CardContent>
                        <Typography variant="subtitle2">Днем: <b>{data[tab].tempreratureDay}&#176;</b></Typography>
                        <Typography variant="subtitle2">Ночью: <b>{data[tab].tempreratureNight}&#176;</b></Typography>
                        <Typography variant="subtitle1">{data[tab].description}</Typography>
                      </CardContent>
                    </Box>
                  </Box>
                )}
            </Box>          
        ))}
      </Box>
    </>
  );
}

export default withStyles(styles)(App);
