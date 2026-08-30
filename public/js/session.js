async function checkSession() {

    try {

        const response = await fetch("/api/me");

        if (response.status === 401) {

            window.location.href = "login.html";
            return null;

        }

        return await response.json();

    }

    catch (err) {

        console.error(err);

        window.location.href = "login.html";

    }

}