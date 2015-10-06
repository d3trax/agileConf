const GameTime = 30;

export class Challenge {
    private _name:string;
    private _distance:number;
    private _lastDistanceDiff:number;
    private _maxSpeed:number;
    private _events:number;
    private _speed:number;
    private _timeLeft:number;
    private _started:boolean;
    private _revolutionsStarted:number;
    private _revolutionsEnded:number;
    private _rnd:number;

    constructor(
        name:string,
        distance:number,
        maxSpeed:number,
        speed:number,
        timeLeft:number,
        events:number,
        started:boolean,
        rnd:number
    ) {
        this._name = name.trim();
        this._distance = distance;
        this._maxSpeed = maxSpeed;
        this._speed = speed;
        this._timeLeft = timeLeft;
        this._events = events;
        this._started = started;
        this._rnd = rnd;
    }

    public static createNew(name:string):Challenge {
        return new Challenge(name, 0, 0, 0, GameTime, 0, false, 0);
    }

    public static unmarshal(obj:any):Challenge {
        return new Challenge(
            obj._name,
            obj._distance,
            obj._maxSpeed,
            0,
            0,
            obj._events,
            true,
            obj._rnd
        );
    }

    public markAsStarted() {
        this._started = true;
    }

    public get started():boolean {
        return this._started;
    }

    public get name():string {
        return this._name;
    }

    public get place():number {
        return this.distance;
    }

    public get distance():number {
        return this._distance;
    }

    public get maxSpeed():number {
        return this._maxSpeed;
    }

    public get speed():number {
        return this._speed;
    }

    public set speed(value:number) {
        this._speed = Math.round(value);
    }

    public get timeLeft():number {
        return this._timeLeft;
    }

    public set timeLeft(value:number) {
        this._timeLeft = value;
    }

    public get revolutionsStarted():number {
        return this._revolutionsStarted;
    }

    public set revolutionsStarted(value:number) {
        this._revolutionsStarted = value;
    }

    public get revolutionsEnded():number {
        return this._revolutionsEnded;
    }

    public set revolutionsEnded(value:number) {
        this._revolutionsEnded = value;
    }

    public set distance(value:number) {
        this._distance = value;
    }

    public set maxSpeed(value:number) {
        this._maxSpeed = value;
    }

    public get events():number {
        return this._events;
    }

    public set events(value:number) {
        this._events = value;
    }

    public get lastDistanceDiff():number {
        return this._lastDistanceDiff;
    }

    public set lastDistanceDiff(value:number) {
        this._lastDistanceDiff = value;
    }

    public get rnd():number {
        return this._rnd;
    }

    public set rnd(value:number) {
        this._rnd = value;
    }
}