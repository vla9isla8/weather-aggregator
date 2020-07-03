import Weather from "../entities/Weather";

export default interface IProvider {
    readonly name: string
    getWeather: (city: string) => Promise<Weather[] | undefined>
}
