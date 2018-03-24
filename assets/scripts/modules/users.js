// Load packages
import { getCookie, setCookie, deleteCookie } from "./cookies";
import { apiRequest } from "./api";

// Constants
const USER_LOCAL_STORAGE_NAME = "disc_loggedin_user";
const USER_TOKEN_COOKIE_NAME = "disc_loggedin_user_token";

// Check login state and redirect to appropriate view
export function checkLoginState() {
    var token = getUserToken();
    var user = getUser();
    var view = null;

    // No logged in user
    if (!token || !user) {
        deleteUser();
        deleteUserToken();

        if (window.location.pathname != "/") {
            // view = "/";
        }
    }

    // Set the view
    if (view && window.location.pathname != view) {
        window.location = view;
    }
}

export function saveUser(user) {
    localStorage.setItem(USER_LOCAL_STORAGE_NAME, JSON.stringify(user));
}

export function getUser() {
    var user = null;
    var userJSON = localStorage.getItem(USER_LOCAL_STORAGE_NAME);
    if (userJSON) user = JSON.parse(userJSON);
    return user;
}

export function getUpdatedUser(callback) {
    if (getUser() && getUserToken()) {
        apiRequest(
            "/members/subscribers",
            "GET",
            null,
            false,
            getUserToken(),
            (response, success, error) => {
                // Save the updated user
                if (success && !error && response.data) {
                    saveUser(response.data);
                }

                if (callback) {
                    callback(response, success, error);
                }
            },
        );
    } else {
        if (callback) {
            callback(null, false, null);
        }
    }
}

export function deleteUser() {
    localStorage.removeItem(USER_LOCAL_STORAGE_NAME);
}

export function saveUserToken(token, expires) {
    return setCookie(USER_TOKEN_COOKIE_NAME, token, expires);
}

export function getUserToken() {
    return getCookie(USER_TOKEN_COOKIE_NAME);
}

export function deleteUserToken() {
    return deleteCookie(USER_TOKEN_COOKIE_NAME);
}
