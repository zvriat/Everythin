// =============================
// SUPABASE CONFIG
// =============================

const SUPABASE_URL = "https://vkoamillslahnpezzwkr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrb2FtaWxsc2xhaG5wZXp6d2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NTIzNjIsImV4cCI6MjA5NDQyODM2Mn0.k4wH2qThA_K2DaIukx--7VydjGolQPYVZzR5mwVTfXw";

const supabaseClient =
    window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =============================
// ELEMENTS
// =============================

const loginSection = document.getElementById("loginSection");
const profileSection = document.getElementById("profileSection");

const loginBtn = document.getElementById("loginBtn");

const avatar = document.getElementById("avatar");
const nameText = document.getElementById("name");
const emailText = document.getElementById("email");

const logoutBtn = document.getElementById("logoutBtn");

// =============================
// INIT (IMPORTANT FIX FOR YOUR ISSUE)
// =============================

async function initAuth() {

    // THIS IS THE KEY FIX (handles OAuth redirect + session restore)
    const { data: { session }, error } =
        await supabaseClient.auth.getSession();

    loadUser();
}

initAuth();

// =============================
// AUTH LISTENER (keeps UI synced)
// =============================

supabaseClient.auth.onAuthStateChange(
    (event, session) => {
        loadUser();
    }
);

// =============================
// LOGIN (GOOGLE)
// =============================

loginBtn.onclick = async () => {

    const { data, error } =
        await supabaseClient.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: "http://127.0.0.1:5500/"
            }
        });
};

// =============================
// LOAD USER (FIXED)
// =============================

async function loadUser() {

    const { data: { session } } =
        await supabaseClient.auth.getSession();

    console.log("SESSION:", session);

    if (!session || !session.user) {
        loginSection.style.display = "block";
        profileSection.style.display = "none";
        return;
    }

    const user = session.user;
    const meta = user.user_metadata || {};

    loginSection.style.display = "none";
    profileSection.style.display = "block";

    avatar.src = meta.avatar_url || "";

    nameText.innerText =
        meta.full_name ||
        meta.name ||
        "No Name";

    emailText.innerText = user.email;
}

// =============================
// LOGOUT
// =============================

logoutBtn.onclick = async () => {
    await supabaseClient.auth.signOut();
    loadUser();
};

async function loadPage(page) {
    try {
        const response = await fetch(page);

        if (!response.ok) {
            throw new Error("Page not found: " + page);
        }

        const html = await response.text();

        document.getElementById("contentArea").innerHTML = html;

    }
    finally{

    }
 }


// Load default page
loadPage("pages/notes.html");