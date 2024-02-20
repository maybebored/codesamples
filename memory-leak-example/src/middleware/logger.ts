import config from '../config/config';

// minimalistic implementation of a logger class which could potentially cause a memory leak
export class Logger {
    private static logLevels: any = {
        'DEBUG': 0,
        'INFO': 1,
        'WARN': 2,
        'ERROR': 3,
    };
    
    private logLevel;
    private logBufferUntilLevel;
    private buffer: any[] = [];
    private bufferOpen = false;

    constructor() {
        this.logLevel  = Logger.logLevels[config.logLevel?.toUpperCase() ?? 'DEBUG'];
        console.log('loglevel', this.logLevel);
        this.logBufferUntilLevel = Logger.logLevels[config.logBufferUntilLevel?.toUpperCase() ?? 'DEBUG'];
        this.bufferOpen = false;
    }

    public debug(...args: any[]) {
        this.print(Logger.logLevels['DEBUG'], args);
    };

    public info(...args: any[]) {
        this.print(Logger.logLevels['INFO'], args);
    };

    public warn(...args: any[]) {
        this.print(Logger.logLevels['WARN'], args);
    };

    public error(...args: any[]) {
        this.print(Logger.logLevels['ERROR'], args);
    };

    public flushLogs() {
        this.bufferOpen = true;
        while (this.buffer.length) {
            console.log(...this.buffer.shift());
        }
    }

    private print(level: number, args: any[]) {
        // to simulate a large log object
        args.push("Deserunt non veniam aute cupidatat ullamco dolore minim duis deserunt occaecat culpa ex. Velit qui incididunt id occaecat velit exercitation ut. In excepteur aute duis elit laborum dolor ipsum adipisicing. Laboris ad sit anim nisi ipsum reprehenderit ullamco ea incididunt nulla incididunt ipsum. Eu amet labore exercitation ea.\r\nConsectetur adipisicing cillum dolor reprehenderit officia tempor nulla dolor incididunt aliquip incididunt. Aliqua sunt officia id laboris laborum esse in pariatur cillum laborum duis officia. Consequat non anim ex Lorem excepteur ullamco aute dolore cillum aute irure. Do ullamco laboris ad minim fugiat minim labore. Nostrud irure amet ut adipisicing consequat sint.\r\nConsequat irure reprehenderit enim dolore adipisicing ad consequat eiusmod do velit veniam do. Est voluptate id irure consequat aliquip esse enim. Consequat non sunt duis dolor sint aliquip et id nulla ea. Duis magna velit reprehenderit excepteur.\r\nSit est adipisicing amet tempor magna culpa est duis sit exercitation non. Cillum commodo duis ipsum deserunt duis. Enim in in velit deserunt dolore sint proident ad amet cupidatat consectetur. Exercitation laborum labore voluptate eiusmod dolor ut consequat duis ipsum pariatur. Ex in veniam laborum ea anim incididunt quis dolore officia occaecat ipsum do elit nostrud. Dolore consequat anim veniam magna officia. Dolor do in et id mollit.\r\nConsequat eu ut sint elit et nostrud dolore velit officia consequat dolore. Consequat ut officia esse enim laborum commodo exercitation magna dolor ullamco pariatur velit. Anim proident pariatur do occaecat velit dolore eu officia id sunt mollit voluptate. Proident tempor anim aliquip et qui esse ea occaecat aute tempor voluptate incididunt. Qui culpa aute esse adipisicing qui cillum incididunt laboris consectetur esse deserunt nisi officia. Cupidatat do qui cupidatat veniam magna excepteur laboris sit. Eiusmod voluptate nulla nostrud sunt ex deserunt voluptate amet esse velit occaecat ex occaecat.\r\n"); // to make the buffer size big
        if (level >= this.logLevel!) {
            if (this.bufferOpen) {
                const now = new Date();
                console.log(JSON.stringify([now.toLocaleString(), ...args]));
            } else {
                if (level >= this.logBufferUntilLevel) {
                    const now = new Date();
                    this.buffer.push(JSON.stringify([now.toLocaleString(), ...args]));
                    this.flushLogs();
                } else {
                    const now = new Date();
                    this.buffer.push(JSON.stringify([now.toLocaleString(), ...args]));
                }
            }
        }
        // console.log(':::INTERNAL DEBUG LOG:::', {level, logLevel, logBufferUntilLevel, bufferOpen, buffer});
    };


}
