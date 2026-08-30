async function loadProfile(){

    try{

        const response = await fetch("/api/me");

        if(response.status === 401){

            window.location.href = "login.html";
            return;

        }

        const user = await response.json();

        document.getElementById("fullname").textContent =
            user.fullname;

        document.getElementById("role").textContent =
            user.role;

    }

    catch(err){

        console.error(err);

    }

}

async function loadProfile() {

    const user = await checkSession();

    if (!user) return;

    document.getElementById("fullname").textContent =
        user.fullname;

    document.getElementById("role").textContent =
        user.role;

}

loadProfile();