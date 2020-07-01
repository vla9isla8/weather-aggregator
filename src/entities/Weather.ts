export default class Weather {
    constructor(
        public readonly date: Date,
        public readonly tempreratureDay: number,
        public readonly tempreratureNight: number,
        public readonly description: string,
    ) {}
}
