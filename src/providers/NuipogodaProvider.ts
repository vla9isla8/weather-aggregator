import IProvider from "./IProvider";
type GetCityResponce = [
    number,
    [
        [
            [
                string,
                string
            ],
            "//nizhnyaya-poyma.nuipogoda.ru",
            [21.639954,0,0,true],
            string
        ],
    ]
];

async function getCity(city: string) {
    const resp = await fetch(encodeURI(`http://nuipogoda.ru/?a=s&q=${city}&zx=a4zelui9g0ou`), {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    })
    const data = await resp.json() as GetCityResponce;
    console.log(data[1][0][1])
    return data;
}

export default class NuipogodaProvider implements IProvider {
    name = "Ну и погода";
    async getWeather(city: string) {
        try {
            const data = await getCity(city);
        } catch(e) {
            console.error(e);
        }
        return null;
    };
}
