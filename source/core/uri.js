/**
 *  json
 */
 /**
  *  json
  */
function uri() {
    return facade(
        this, uri, array(arguments)
    );
}

uri.encode = encodeURI;

uri.decode = decodeURI;

flex.uri    = uri;
