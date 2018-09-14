import Constants from "./const.json"


class Logging {

    static debug(msg) {
        if (Constants.settings.debug) {
            console.log(msg)
        }
    };
}

export default Logging