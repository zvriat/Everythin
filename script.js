// =============================
// SUPABASE CONFIG
// =============================

const SUPABASE_URL =
    "sb_publishable_3nYQcrIOXSsudH_QF8457Q_wlCixDtx";

const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrb2FtaWxsc2xhaG5wZXp6d2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NTIzNjIsImV4cCI6MjA5NDQyODM2Mn0.k4wH2qThA_K2DaIukx--7VydjGolQPYVZzR5mwVTfXw";

// IMPORTANT:
// DON'T NAME IT "supabase"
const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );

// =============================
// HTML ELEMENTS
// =============================

const loginBtn =
    document.getElementById("loginBtn");

const profile =
    document.getElementById("profile");

const avatar =
    document.getElementById("avatar");

const nameText =
    document.getElementById("name");

const emailText =
    document.getElementById("email");

const logoutBtn =
    document.getElementById("logoutBtn");

// =============================
// LOGIN
// =============================

loginBtn.onclick = async () => {

    await supabaseClient.auth.signInWithOAuth({
        provider: "google"
    });

};

// =============================
// LOAD USER
// =============================

async function loadUser() {

    const {
        data: { session },
        error
    } = await supabaseClient.auth.getSession();

    console.log(session);

    if (session) {

        const user = session.user;

        loginBtn.style.display = "none";

        profile.style.display = "block";

        avatar.src =
            user.user_metadata.avatar_url;

        nameText.innerText =
            user.user_metadata.full_name;

        emailText.innerText =
            user.email;

    } else {

        loginBtn.style.display =
            "inline-block";

        profile.style.display =
            "none";

    }

}

// =============================
// LOGOUT
// =============================

logoutBtn.onclick = async () => {

    await supabaseClient.auth.signOut();

    loadUser();

};

async function loadPage(page) {

    const response = await fetch(page);

    const html = await response.text();

    document.getElementById("contentArea").innerHTML = html;
}

/* DEFAULT PAGE */
loadPage("pages/notes.html");

loadUser();