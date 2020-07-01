import IProvider from "./IProvider";
import Weather from "../entities/Weather";

type OpenWeatherData = {
    city:{
        "id": number,
        "name": string,
        "coord": {
          "lon": number,
          "lat": number
        },
        "country": string,
        "population": number,
        "timezone": number
      },
    list: {
        "dt": number,
        "sunrise": number,
        "sunset": number,
        "temp": {
          "day": number,
          "min": number,
          "max": number,
          "night": number,
          "eve": number,
          "morn": number
        },
        "feels_like": {
          "day": number,
          "night": number,
          "eve": number,
          "morn": number
        },
        "pressure": number,
        "humidity": number,
        "weather": [
          {
            "id": number,
            "main": string,
            "description": string,
            "icon": string
          }
        ],
        "speed": number,
        "deg": number,
        "clouds": number
    }[]
    cod:number,
    cnt: number
}

async function getData(city: string, apiKey: string): Promise<OpenWeatherData> {
    //@ts-ignore-next-line
    const weather = await import('openweather-apis');
    weather.setLang('ru');
    weather.setUnits('metric');
    weather.setCity(city);
    weather.setAPPID(apiKey);
    return new Promise((resolve, reject) => weather.getWeatherForecastForDays(7, function(err: string, obj: OpenWeatherData){
        if (!err) {
            console.log(obj);
            resolve(obj);
        } else {
            reject(err)
        }
    }));
}

export default class OpenWeatherProvider implements IProvider {
    public readonly name: string = "OpenWeather";
    constructor(private readonly apiKey: string) { }
    async getWeather(city: string) {
        try {
            const {list} = await getData(city,this.apiKey);
            return list.map((next) => new Weather(
                new Date(parseInt(`${next.dt}000`)),
                next.temp.day,
                next.temp.night,
                next.weather[0].description
            ));
        } catch(e) {
            console.error(e);
            return null;
        }
    }
}