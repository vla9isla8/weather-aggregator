import { Box, Card, CardContent, CardHeader, CssBaseline, FormGroup, Grid, TextField, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from 'react';
import Weather from './entities/Weather';
import OpenWeatherProvider from './providers/OpenWeatherProvider';
const providers = [
  new OpenWeatherProvider("6d0e27996f99802be89d9575a5dfb7ca")
];

function App() {
  const [datas, setDatas] = useState<{[key: string]:Weather[]}>({});
  const [city, setCity] = useState<string>(localStorage.getItem("city") || "");

  const onChangeCity:  React.ChangeEventHandler<HTMLInputElement> = useCallback(({target: {value}}) => {
    localStorage.setItem("city",value);
    setCity(value);
  },[]);

  useEffect(() => {
    let breaked = false;
    const get = async () => {
      for (const provider of providers) {
        // eslint-disable-next-line
        provider.getWeather(city).then(value=> {
          if (!breaked) {
            setDatas(datas=> ({
                ...datas,
                [provider.name]: value || []
            }));
          }
        });
      }
    };
    get();
    return () => {
      breaked = true;
    }
  },[city]);
  return (
    <>
      <CssBaseline/>
      <Box display="flex" flexDirection="column" height={1} overflow="hidden">
        <Box padding={3}>  
          <FormGroup>
            <TextField name="city" label="Город" value={city} onChange={onChangeCity}/>
          </FormGroup>
        </Box>
        <Box flex={1} overflow="auto">
            {Object.keys(datas).map((provider)=> (
                <Box key={provider} padding={3}>
                  <Typography variant="h4">{provider}</Typography>
                  <Box paddingTop={3}>
                    <Grid container spacing={2} >
                      {datas[provider].map((data,idx) => (
                        <Grid item key={idx}>
                          <Card>
                            <CardHeader title={data.date.toLocaleDateString()}/>
                            <CardContent>
                              <Typography variant="subtitle1">{data.description}</Typography>
                              <Typography variant="subtitle2">Днем: {data.tempreratureDay}</Typography>
                              <Typography variant="subtitle2">Ночью: {data.tempreratureNight}</Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Box>
            ))}
        </Box>
      </Box>
    </>
  );
}

export default App;
