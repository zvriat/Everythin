const loginSection = document.getElementById("loginSection");
const profileSection = document.getElementById("profileSection");

const avatar = document.getElementById("avatar");
const nameText = document.getElementById("name");

document.getElementById("loginBtn").onclick = () => {

    const CLIENT_ID =
        "793965405144-a1akoa0tfq4n75grpu1hnrfujkaldaht.apps.googleusercontent.com";

    const REDIRECT_URI =
        "https://zvriat.github.io/Everythin/callback.html";

    const scope = encodeURIComponent("openid email profile");

    window.location.href =
        "https://accounts.google.com/o/oauth2/v2/auth" +
        "?client_id=" + CLIENT_ID +
        "&redirect_uri=" + encodeURIComponent(REDIRECT_URI) +
        "&response_type=token" +
        "&scope=" + scope;
};

// 🍪 READ COOKIE FUNCTION
function getCookie(name) {
    const value =
        "; " + document.cookie;

    const parts =
        value.split("; " + name + "=");

    if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }
    return null;
}

// LOAD USER FROM COOKIE
function loadUser() {

    const cookie = getCookie("google_user");

    if (cookie) {

        const user = JSON.parse(decodeURIComponent(cookie));

        loginSection.style.display = "none";
        profileSection.style.display = "block";

        avatar.src = user.picture;
        nameText.innerText = user.name;

    } else {

        loginSection.style.display = "block";
        profileSection.style.display = "none";

    }
}

// LOGOUT
document.getElementById("logoutBtn").onclick = () => {

    document.cookie =
        "google_user=; path=/; max-age=0";

    loadUser();

};

loadUser();