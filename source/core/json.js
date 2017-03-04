/**
 *  json
 */
function json() {
    return facade(
        this, json, array(arguments)
    );
}

json.encode = JSON.stringify;

json.decode = JSON.parse;

flex.json   = json;
