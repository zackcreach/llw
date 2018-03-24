import request from "superagent";
import config from "./config";
import { getUser, deleteUser, deleteUserToken, checkLoginState } from "./users";
import { get } from "lodash";

export function apiRequest(endpoint, type, params, token, callback) {
    var url = config.custom.api_url + endpoint;

    var req = request(type, url);
    if (token) req.set("Authorization", "Bearer " + token);
    if (params) {
        if (type == "GET") {
            req.query(params);
        } else {
            // Check if any of the params are a file
            var paramsKeys = Object.keys(params);
            var hasFiles = false;
            for (var i = 0; i < paramsKeys.length; i++) {
                var paramValue = params[paramsKeys[i]];
                var hasFiles = _.get(paramValue, "constructor.name") == "File";
                if (hasFiles) break;
            }

            // Send multipart form request
            if (hasFiles) {
                for (var i = 0; i < paramsKeys.length; i++) {
                    var paramKey = paramsKeys[i];
                    var paramValue = params[paramKey];
                    if (paramValue != null && paramValue != undefined)
                        req.field(paramKey, paramValue);
                }
            } else {
                req.send(params);
            }
        }
    }

    req.end(function(error, response) {
        // Session expired --> log user out
        if (response && response.status == 401) {
            if (users.getUser()) {
                users.deleteUser();
                users.deleteUserToken();

                alert("Your current session has expired. Please log in again");

                users.checkLoginState();
                return;
            }
        }

        if (callback) {
            var success = response && response.status == 200;
            callback(_.get(response, "body"), success, error);
        }
    });
}
