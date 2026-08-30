const form = document.getElementById("uploadForm");

const fileInput = document.getElementById("activityFile");

const uploadBtn = document.getElementById("uploadBtn");

const message = document.getElementById("message");

const selectedFile = document.getElementById("selectedFile");

fileInput.addEventListener("change", () => {

    if(fileInput.files.length > 0){

        selectedFile.textContent =
            fileInput.files[0].name;

    }else{

        selectedFile.textContent =
            "No file selected";

    }

});

form.addEventListener("submit", async(e)=>{

    e.preventDefault();

    message.innerHTML = "";

    const title =
        document.getElementById("activityTitle").value.trim();

    const subject =
        document.getElementById("subject").value.trim();

    const file =
        fileInput.files[0];

    if(title === ""){

        message.className = "error";

        message.textContent =
            "Please enter an activity title.";

        return;

    }

    if(subject === ""){

        message.className = "error";

        message.textContent =
            "Please enter a subject.";

        return;

    }

    if(!file){

        message.className = "error";

        message.textContent =
            "Please select a file.";

        return;

    }

    const formData = new FormData();

    formData.append("activityTitle", title);

    formData.append("subject", subject);

    formData.append("file", file);

    uploadBtn.disabled = true;

    uploadBtn.textContent = "Uploading...";

    try{

        const response = await fetch(

            "/api/submissions/upload",

            {

                method:"POST",

                body:formData

            }

        );

        const data = await response.json();

        if(data.success){

            message.className = "success";

            message.textContent =
                "Activity uploaded successfully.";

            form.reset();

            selectedFile.textContent =
                "No file selected";

            setTimeout(()=>{

                window.location.href =
                    "my-submissions.html";

            },1500);

        }

        else{

            message.className = "error";

            message.textContent =
                data.message;

        }

    }

    catch(err){

        console.error(err);

        message.className = "error";

        message.textContent =
            "Unable to connect to the server.";

    }

    uploadBtn.disabled = false;

    uploadBtn.textContent = "Upload Activity";

});