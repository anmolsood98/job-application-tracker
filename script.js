let jobApplications=[
    {
        applicationId: crypto.randomUUID(),
        company: "Tech Giant",
        jobTitle: "Front-end Developer",
        location: "Toronto",
        workType: "Remote",
        dateApplied: "2026-09-25",
        status: "Applied",
        followUpDate: "2026-10-02"
    },
    {
        applicationId: crypto.randomUUID(),
        company: "Techno.Inc",
        jobTitle: "Junior Developer",
        location: "Mississauga",
        workType: "Hybrid",
        dateApplied: "2026-09-27",
        status: "Interview",
        followUpDate: "2026-10-01"
    },
    {
        applicationId: crypto.randomUUID(),
        company: "Java",
        jobTitle: "Full Stack Developer",
        location: "Oakville",
        workType: "On-site",
        dateApplied: null,
        status: "Saved",
        followUpDate: null
    }

];

const jobCardsContainer = document.querySelector("#job-cards");


function renderApplications(applicationArray){
    jobCardsContainer.innerHTML = "";

    applicationArray.forEach((application)=>{
        const jobCard = document.createElement("div");
        const jobTitle = document.createElement("p");
        const companyName = document.createElement("h2");
        const locationElement = document.createElement("p");
        const statusElement = document.createElement("p");
        const workTypeElement = document.createElement("p");
        const dateAppliedElement = document.createElement("p");
        const followUpDateElement = document.createElement("p");
        const deleteButton = document.createElement("button");
        const editButton = document.createElement("button");
        
        jobCard.classList.add("job-card");

        jobTitle.textContent = application.jobTitle;
        companyName.textContent = application.company;
        locationElement.textContent = application.location;
        statusElement.textContent = `Status: ${application.status}`;
        workTypeElement.textContent = `Work Type: ${application.workType}`;
        deleteButton.textContent = "Delete";
        editButton.textContent = "Edit";

            let companyEditInput;
            let jobTitleEditInput;
            let locationEditInput;
            let workTypeEditSelect;
            let statusEditSelect;
            let dateAppliedEditInput;
            let followUpEditInput;
        
        editButton.addEventListener("click", ()=>{

            if (editButton.textContent === "Edit"){
                companyEditInput = document.createElement("input");
                jobTitleEditInput = document.createElement("input");
                locationEditInput = document.createElement("input");
                workTypeEditSelect = document.createElement("select");
                statusEditSelect = document.createElement("select");
                dateAppliedEditInput = document.createElement("input");
                followUpEditInput = document.createElement("input");
            
                const remoteOption = document.createElement("option");
                const hybridOption = document.createElement("option");
                const onSiteOption = document.createElement("option");
            
                const savedOption = document.createElement("option");
                const appliedOption = document.createElement("option");
                const interviewOption = document.createElement("option");
                const offerOption = document.createElement("option");
                const rejectedOption = document.createElement("option");
            

                dateAppliedEditInput.type = "date";
                followUpEditInput.type = "date";

                companyEditInput.value = application.company;
                jobTitleEditInput.value = application.jobTitle;
                locationEditInput.value = application.location;
                dateAppliedEditInput.value = application.dateApplied || "";
                followUpEditInput.value = application.followUpDate || "";

                remoteOption.value = "Remote";
                remoteOption.textContent = "Remote";
                hybridOption.value = "Hybrid";
                hybridOption.textContent = "Hybrid";
                onSiteOption.value = "On-site";
                onSiteOption.textContent = "On-site";

                savedOption.value = "Saved";
                savedOption.textContent = "Saved";
                appliedOption.value = "Applied";
                appliedOption.textContent = "Applied";
                interviewOption.value = "Interview";
                interviewOption.textContent = "Interview";
                offerOption.value = "Offer";
                offerOption.textContent = "Offer";
                rejectedOption.value = "Rejected";
                rejectedOption.textContent = "Rejected";


                workTypeEditSelect.appendChild(remoteOption);
                workTypeEditSelect.appendChild(hybridOption);
                workTypeEditSelect.appendChild(onSiteOption);

                statusEditSelect.appendChild(savedOption);
                statusEditSelect.appendChild(appliedOption);
                statusEditSelect.appendChild(interviewOption);
                statusEditSelect.appendChild(offerOption);
                statusEditSelect.appendChild(rejectedOption);


                workTypeEditSelect.value = application.workType;
                statusEditSelect.value = application.status;

                jobCard.replaceChild(companyEditInput,companyName);
                jobCard.replaceChild(jobTitleEditInput, jobTitle);
                jobCard.replaceChild(locationEditInput, locationElement);
                jobCard.replaceChild(workTypeEditSelect, workTypeElement);
                jobCard.replaceChild(statusEditSelect, statusElement);
                jobCard.replaceChild(dateAppliedEditInput, dateAppliedElement);
                jobCard.replaceChild(followUpEditInput,followUpDateElement);

                editButton.textContent = "Save";
            } else {
                application.company = companyEditInput.value;
                application.jobTitle = jobTitleEditInput.value;
                application.location = locationEditInput.value;
                application.workType = workTypeEditSelect.value;
                application.status = statusEditSelect.value;
                application.dateApplied = dateAppliedEditInput.value || null;
                application.followUpDate = followUpEditInput.value || null;

                updateDisplayedApplications();
            }

        });

        deleteButton.addEventListener("click", ()=>{
            const remainingApplications = jobApplications.filter((job) =>{
                return job.applicationId !== application.applicationId;
            });
            jobApplications = remainingApplications;

            updateDisplayedApplications();
        });

        if (application.dateApplied === null){
            dateAppliedElement.textContent = "Date Applied: Not applied yet";
        } else{
            dateAppliedElement.textContent = `Date Applied: ${application.dateApplied}`;
        }

        if(application.followUpDate === null){
            followUpDateElement.textContent = "Follow-Up Date: No follow-up scheduled";
        } else{
            followUpDateElement.textContent = `Follow-Up Date: ${application.followUpDate}`;
        }

        jobCard.appendChild(companyName);
        jobCard.appendChild(jobTitle);
        jobCard.appendChild(locationElement);
        jobCard.appendChild(workTypeElement);
        jobCard.appendChild(statusElement);
        jobCard.appendChild(dateAppliedElement);
        jobCard.appendChild(followUpDateElement);
        jobCard.appendChild(editButton);
        jobCard.appendChild(deleteButton);

        jobCardsContainer.appendChild(jobCard);
    });
}

renderApplications(jobApplications);

const applicationForm = document.querySelector("#job-application-form");

applicationForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    const companyInput = document.querySelector("#company-name");
    const jobTitleInput = document.querySelector("#job-title");
    const locationInput = document.querySelector("#location");
    const workTypeInput = document.querySelector("#work-type");
    const dateAppliedInput = document.querySelector("#date-applied");
    const statusInput = document.querySelector("#status");
    const followUpDateInput = document.querySelector("#follow-up-date");

    const company = companyInput.value;
    const jobTitle = jobTitleInput.value;
    const location = locationInput.value;
    const workType = workTypeInput.value;
    const dateApplied = dateAppliedInput.value || null;
    const status = statusInput.value;
    const followUpDate = followUpDateInput.value || null;

    const applicationId = crypto.randomUUID();

    const newApplication = {
        applicationId,
        company,
        jobTitle,
        location,
        workType,
        dateApplied,
        status,
        followUpDate
    }
    jobApplications.push(newApplication);
    renderApplications(jobApplications);
    applicationForm.reset();
});

const searchInput = document.querySelector("#job-search");
const searchMessage = document.querySelector("#search-message");
const statusFilter = document.querySelector("#status-search");

function updateDisplayedApplications(){
    const searchTerm = searchInput.value.toLowerCase();
    const selectedStatus = statusFilter.value;

    const filteredApplications = jobApplications.filter((application)=>{
        const matchesSearch = 
            application.company.toLowerCase().includes(searchTerm) ||
            application.jobTitle.toLowerCase().includes(searchTerm);
        
        const matchesStatus = selectedStatus === "all"|| 
                              application.status.toLowerCase() === selectedStatus;

        return matchesSearch && matchesStatus;        
    });
    renderApplications(filteredApplications);

    if(filteredApplications.length === 0){
        searchMessage.textContent = "No match found";
    }else {
        searchMessage.textContent = "";
    }
}

searchInput.addEventListener("input", ()=>{
    updateDisplayedApplications();
});

statusFilter.addEventListener("change", ()=>{
    updateDisplayedApplications();
});


