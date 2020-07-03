import IProvider from "./IProvider";
import Weather from "../entities/Weather";
import xml2js from "xml2js";

type MsnData = {
    "location": {
    "name": "San Francisco, CA",
    "lat": "37.777",
    "long": "-122.42",
    "timezone": "-7",
    "alert": "",
    "degreetype": "F",
    "imagerelativeurl": "http://blob.weather.microsoft.com/static/weather4/en-us/"
    },
    "current": {
    "temperature": "70",
    "skycode": "32",
    "skytext": "Sunny",
    "date": "2017-03-14",
    "observationtime": "13:15:00",
    "observationpoint": "San Francisco, California",
    "feelslike": "70",
    "humidity": "59",
    "winddisplay": "3 mph West",
    "day": "Tuesday",
    "shortday": "Tue",
    "windspeed": "3 mph",
    "imageUrl": "http://blob.weather.microsoft.com/static/weather4/en-us/law/32.gif"
    },
    "forecast": [
        {
            "low": "52",
            "high": "69",
            "skycodeday": "31",
            "skytextday": "Clear",
            "date": "2017-03-13",
            "day": "Monday",
            "shortday": "Mon",
            "precip": ""
        },
        {
            "low": "52",
            "high": "70",
            "skycodeday": "34",
            "skytextday": "Mostly Sunny",
            "date": "2017-03-14",
            "day": "Tuesday",
            "shortday": "Tue",
            "precip": "10"
        },
        {
            "low": "56",
            "high": "63",
            "skycodeday": "26",
            "skytextday": "Cloudy",
            "date": "2017-03-15",
            "day": "Wednesday",
            "shortday": "Wed",
            "precip": "20"
        },
        {
            "low": "50",
            "high": "64",
            "skycodeday": "28",
            "skytextday": "Mostly Cloudy",
            "date": "2017-03-16",
            "day": "Thursday",
            "shortday": "Thu",
            "precip": "10"
        },
        {
            "low": "53",
            "high": "67",
            "skycodeday": "32",
            "skytextday": "Sunny",
            "date": "2017-03-17",
            "day": "Friday",
            "shortday": "Fri",
            "precip": "10"
        }
    ]
}

async function getData(city: string) {
    const resp = await fetch(
        encodeURI(
            `https://weather.service.msn.com/data.aspx?weasearchstr=${city}&culture=ru-RU&weadegreetype=C&src=outlook`
        )
    );
    const values = await xml2js.parseStringPromise(await resp.text(), { charkey: 'C$', attrkey: 'A$', explicitArray: true, mergeAttrs: true });
    return values.weatherdata.weather[0] as MsnData;
}

export default class MsnProvider implements IProvider {
    name: string = "MSN";
    async getWeather(city: string) {
        try {
            const data = await getData(city);
            return data.forecast.map(data => new Weather(
                new Date(data.date[0]),
                parseFloat(data.high[0]),
                parseFloat(data.low[0]),
                data.skytextday[0]
            ));
        } catch(e) {
            console.error(e);
            return undefined;
        }
    };
}
