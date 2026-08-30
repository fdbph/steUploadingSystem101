async function initializeDashboard() {

    const user = await checkSession();

    if (!user) return;

    const welcome = document.getElementById("welcomeMessage");

    if (welcome) {

        welcome.textContent =
            `Welcome, ${user.fullname}`;

    }

    try {

        const response = await fetch("/api/submissions/dashboard");

        const data = await response.json();

        if (!data.success) return;

        document.getElementById("totalUploads").textContent =
            data.totalUploads;

        document.getElementById("gradedActivities").textContent =
            data.graded;

        document.getElementById("pendingActivities").textContent =
            data.pending;

    }

    catch(err){

        console.error(err);

    }

}

initializeDashboard();