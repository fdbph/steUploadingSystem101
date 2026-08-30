const logoutBtn = document.getElementById("logoutBtn");

if(logoutBtn){

    logoutBtn.addEventListener("click", async(e)=>{

        e.preventDefault();

        try{

            await fetch("/api/logout",{

                method:"POST"

            });

            window.location.href="login.html";

        }

        catch(err){

            console.error(err);

        }

    });

}