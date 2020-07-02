import {
  AppBar, Box, Card, CardContent, CardHeader,
  Checkbox, createStyles, CssBaseline, Divider,
  FormControlLabel, FormGroup, IconButton, Paper,
  SwipeableDrawer, TextField, Theme, Toolbar,
  Typography, WithStyles, withStyles
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import moment from "moment";
import "moment/locale/ru";
import React, { useCallback, useEffect, useState } from 'react';
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
    paddingTop: 64
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
//@ts-ignore
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
function App({classes}: WithStyles<typeof styles>) {
  const [datas, setDatas] = useState<{[key: string]:Weather[]}>({});
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
      const data: {[key: string]: Weather[]} = {};
      const filteredProviders = providers.filter(({ name }) => selectedProviders[name] === undefined ? true : selectedProviders[name]);
      if (filteredProviders.length > 0) {
        for (const provider of filteredProviders) {
          provider.getWeather(city).then(value=> {
            data[provider.name] = value || [];
            if (!breaked.v) {
              setDatas({...data});
            }
          });
        }
      } else {
        setDatas({});
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
          <Paper>
            <Box padding={1}>
              <TextField
                name="city" 
                label="Город" 
                value={city}
                onChange={onChangeCity}
              />
            </Box>
          </Paper>
        </Toolbar>
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
      <Box display="flex" flexDirection="column" height={1} overflow="hidden" className={classes.root}>
        <Box flex={1} overflow="auto">
            {Object.keys(datas).map((provider)=> (
                <Box key={provider} padding={3}>
                  <Typography variant="h4" className={classes.providerHeader} >{provider}</Typography>
                  <Box paddingTop={3} paddingBottom={3}>
                    <Box display="flex" flexDirection='row' flexWrap="wrap" >
                      {datas[provider].map((data,idx) => (
                        <Box
                          key={idx}
                          flex={1} 
                          padding={1}
                        >
                          <Box component={Card} height={1} >
                            <CardHeader title={moment(data.date).format("dddd, LD")}/>
                            <CardContent>
                              <Typography variant="subtitle2">Днем: <b>{data.tempreratureDay}&#176;</b></Typography>
                              <Typography variant="subtitle2">Ночью: <b>{data.tempreratureNight}&#176;</b></Typography>
                              <Typography variant="subtitle1">{data.description}</Typography>
                            </CardContent>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                  <Divider/>
                </Box>
            ))}
        </Box>
      </Box>
    </>
  );
}

export default withStyles(styles)(App);
