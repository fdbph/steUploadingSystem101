async function loadUser(){

    const response = await fetch("/api/me");

    if(response.status===401){

        location.href="/";

        return;

    }

    const user = await response.json();

    document.getElementById("welcome").innerHTML =
        `Welcome, ${user.fullname}`;

    document.getElementById("role").innerHTML =
        `Role : ${user.role}`;

}

loadUser();

document
.getElementById("logoutBtn")
.addEventListener("click", async()=>{

    await fetch("/api/logout",{

        method:"POST"

    });

    location.href="/";

});