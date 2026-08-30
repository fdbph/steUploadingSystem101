async function initializeTeacherDashboard() {

    try {

        const response =
            await fetch("/api/me");


        if (response.status === 401) {

            window.location.href =
                "login.html";

            return;

        }


        const user =
            await response.json();


        // Make sure only teachers
        // can access this page

        if (user.role !== "teacher") {

            window.location.href =
                "learner-dashboard.html";

            return;

        }


        const welcome =
            document.getElementById(
                "welcomeMessage"
            );


        if (welcome) {

            welcome.textContent =
                `Welcome, ${user.fullname}`;

        }

    }

    catch (error) {

        console.error(
            "Teacher dashboard error:",
            error
        );

    }

}


initializeTeacherDashboard();