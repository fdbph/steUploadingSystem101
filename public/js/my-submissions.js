// Load all learner submissions
async function loadSubmissions() {

    try {

        const response = await fetch("/api/submissions/my-activities");

        // Session expired
        if (response.status === 401) {

            window.location.href = "login.html";
            return;

        }

        const data = await response.json();

        const tbody = document.querySelector("#submissionTable tbody");
        const submissionCount = document.getElementById("submissionCount");

        tbody.innerHTML = "";

        // Unable to load submissions
        if (!data.success) {

            submissionCount.textContent = "";

            tbody.innerHTML = `
                <tr>
                    <td colspan="6">
                        Unable to load submissions.
                    </td>
                </tr>
            `;

            return;

        }

        // Display total submissions
        submissionCount.textContent =
            `Total Uploaded Activities: ${data.submissions.length}`;

        // No submissions
        if (data.submissions.length === 0) {

            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align:center; padding:30px;">
                        No uploaded activities yet.<br><br>
                        Click <strong>Upload Activity</strong> to submit your first file.
                    </td>
                </tr>
            `;

            return;

        }

        // Populate table
        data.submissions.forEach(submission => {

            let fileSize = "-";

            if (submission.fileSize) {

                if (submission.fileSize >= 1024 * 1024) {

                    fileSize =
                        (submission.fileSize / (1024 * 1024)).toFixed(2) + " MB";

                } else {

                    fileSize =
                        (submission.fileSize / 1024).toFixed(2) + " KB";

                }

            }

            const submittedDate = new Date(
                submission.createdAt
            ).toLocaleString();

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${submission.activityTitle}</td>

                <td>${submission.subject}</td>

                <td>${submission.originalName}</td>

                <td>${fileSize}</td>

                <td>${submittedDate}</td>

                <td>

                    <a
                        class="download-btn"
                        href="/api/submissions/download/${submission._id}">

                        Download

                    </a>

                    <button
                        class="delete-btn"
                        onclick="deleteSubmission('${submission._id}')">

                        Delete

                    </button>

                </td>
            `;

            tbody.appendChild(row);

        });

    }

    catch (err) {

        console.error(err);

        const tbody = document.querySelector("#submissionTable tbody");

        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">
                    Unable to connect to the server.
                </td>
            </tr>
        `;

    }

}

// Delete submission
async function deleteSubmission(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this submission?"
    );

    if (!confirmed) {

        return;

    }

    try {

        const response = await fetch(`/api/submissions/${id}`, {

            method: "DELETE"

        });

        const data = await response.json();

        if (data.success) {

            alert("Submission deleted successfully.");

            loadSubmissions();

        } else {

            alert(data.message);

        }

    }

    catch (err) {

        console.error(err);

        alert("Unable to delete the submission.");

    }

}

// Load page
loadSubmissions();