import * as Promise from "bluebird";
import CachedChecker from "./CachedChecker";
import * as moment from "moment";

export default class ZoomCheck extends CachedChecker {
    pollingPeriod = moment.duration(1, "seconds");

    fetch() : Promise {
        return new Promise((resolve, reject) => {
            require('child_process').exec(`tasklist`, (err: Error, stdout: string, stderr: string) => {
                if (err) reject(err)
                resolve(stdout.toLowerCase().indexOf("CptHost.exe".toLowerCase()) > -1)
            })
        })
            .tap((isRunning : boolean) => {
                let message = isRunning ?
                    "Currently in Zoom Meeting" :
                    "Not in Zoom Meeting";

                console.log(new Date(), message);
            });
    };
}