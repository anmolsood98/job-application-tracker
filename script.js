// ====================
// DATA & STORAGE
// ====================

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
    },
    {
        applicationId: crypto.randomUUID(),
        company: "Apple",
        jobTitle: "CSR",
        location: "Ottawa",
        workType: "Hybrid",
        dateApplied: "2026-09-25",
        status: "Offer",
        followUpDate: "2026-10-15"
    },
    {
        applicationId: crypto.randomUUID(),
        company: "Microsoft",
        jobTitle: "Data Management",
        location: "Burlington",
        workType: "Remote",
        dateApplied: "2026-10-10",
        status: "Rejected",
        followUpDate: null
    }

];

const savedApplications = localStorage.getItem("jobApplications");

if(savedApplications !== null){
    jobApplications = JSON.parse(savedApplications);
}

function saveApplications(){
    localStorage.setItem("jobApplications", JSON.stringify(jobApplications));
}

// ====================
// DOM ELEMENTS
// ====================

const jobCardsContainer = document.querySelector("#job-cards");
const applicationForm = document.querySelector("#job-application-form");
const searchInput = document.querySelector("#job-search");
const searchMessage = document.querySelector("#search-message");
const statusFilter = document.querySelector("#status-search");
const totalApplicationsCount = document.querySelector("#total-applications-count");
const interviewCount = document.querySelector("#interview-count");
const offerCount = document.querySelector("#offer-count");
const rejectedCount = document.querySelector("#rejected-count");


// ====================
// HELPER FUNCTIONS
// ====================

function createEditField(labelText, inputElement, inputId){
    const editGroup = document.createElement("div");
    const editLabel = document.createElement("label");
    
    editGroup.classList.add("edit-field");
    editLabel.textContent = labelText;

    inputElement.id = inputId;
    editLabel.htmlFor = inputId;
    
    editGroup.appendChild(editLabel);
    editGroup.appendChild(inputElement);

    return editGroup;
}

function createOption(optionValue, selectElement){
    const optionElement = document.createElement("option");
    optionElement.value = optionValue;
    optionElement.textContent = optionValue;

    selectElement.appendChild(optionElement);
}

function enterEditMode (jobCard, application, displayElements){
    jobCard.classList.add("editing");

    const companyEditInput = document.createElement("input");
    const jobTitleEditInput = document.createElement("input");
    const locationEditInput = document.createElement("input");

    const workTypeEditSelect = document.createElement("select");
    const statusEditSelect = document.createElement("select");
    const dateAppliedEditInput = document.createElement("input");
    const followUpEditInput = document.createElement("input");
    
    const editInputs ={
        companyEditInput,
        jobTitleEditInput,
        locationEditInput,
        workTypeEditSelect,
        statusEditSelect,
        dateAppliedEditInput,
        followUpEditInput
    }

    const companyEditGroup = 
        createEditField("Company", editInputs.companyEditInput , `company-${application.applicationId}`);
    const titleEditGroup = 
        createEditField("Job Title", editInputs.jobTitleEditInput, `job-title-${application.applicationId}`);
    const locationEditGroup = 
        createEditField("Location", editInputs.locationEditInput, `location-${application.applicationId}`);
    const workTypeEditGroup = 
        createEditField("Work Type", editInputs.workTypeEditSelect, `work-type-${application.applicationId}`);
    const statusEditGroup = 
        createEditField("Status", editInputs.statusEditSelect, `status-${application.applicationId}`);
    const dateAppliedEditGroup = 
        createEditField("Date Applied", editInputs.dateAppliedEditInput, `date-applied-${application.applicationId}`);
    const followUpDateEditGroup = 
        createEditField("Follow-Up Date", editInputs.followUpEditInput, `follow-up-date-${application.applicationId}`);

    createOption("Remote", editInputs.workTypeEditSelect);
    createOption("Hybrid", editInputs.workTypeEditSelect);
    createOption("On-site", editInputs.workTypeEditSelect);
    
    createOption("Saved", editInputs.statusEditSelect);
    createOption("Applied", editInputs.statusEditSelect);
    createOption("Interview", editInputs.statusEditSelect);
    createOption("Offer", editInputs.statusEditSelect);
    createOption("Rejected", editInputs.statusEditSelect);

    editInputs.dateAppliedEditInput.type = "date";
    editInputs.followUpEditInput.type = "date";

    editInputs.companyEditInput.value = application.company;
    editInputs.jobTitleEditInput.value = application.jobTitle;
    editInputs.locationEditInput.value = application.location;
    editInputs.dateAppliedEditInput.value = application.dateApplied || "";
    editInputs.followUpEditInput.value = application.followUpDate || "";

    editInputs.workTypeEditSelect.value = application.workType;
    editInputs.statusEditSelect.value = application.status;

    jobCard.replaceChild(companyEditGroup,displayElements.companyName);
    jobCard.replaceChild(titleEditGroup, displayElements.jobTitle);
    jobCard.replaceChild(locationEditGroup, displayElements.locationElement);
    jobCard.replaceChild(workTypeEditGroup, displayElements.workTypeElement);
    jobCard.replaceChild(statusEditGroup, displayElements.statusElement);
    jobCard.replaceChild(dateAppliedEditGroup, displayElements.dateAppliedElement);
    jobCard.replaceChild(followUpDateEditGroup,displayElements.followUpDateElement);


    return editInputs;

}

function saveEditedApplication(application, editInputs){
    application.company = editInputs.companyEditInput.value;
    application.jobTitle = editInputs.jobTitleEditInput.value;
    application.location = editInputs.locationEditInput.value;
    application.workType = editInputs.workTypeEditSelect.value;
    application.status = editInputs.statusEditSelect.value;
    application.dateApplied = editInputs.dateAppliedEditInput.value || null;
    application.followUpDate = editInputs.followUpEditInput.value || null;
}

function deleteApplication(applicationId){
    // DATA — remove the selected application
    const remainingApplications = 
        jobApplications.filter((job) =>{
            return job.applicationId !== applicationId;
    });
    jobApplications = remainingApplications;
}

function updateDashboard(){
    const totalApplications = jobApplications.length;
    const numberOfInterviews =  jobApplications.filter ((application)=>{
        return application.status === "Interview";
    }).length;
    const numberOfOffers =  jobApplications.filter ((application)=>{
        return application.status === "Offer";
    }).length;
    const numberOfRejected =  jobApplications.filter ((application)=>{
        return application.status === "Rejected";
    }).length;

    totalApplicationsCount.textContent = totalApplications;
    interviewCount.textContent = numberOfInterviews;
    offerCount.textContent = numberOfOffers;
    rejectedCount.textContent = numberOfRejected;
}
// ====================
// APPLICATION RENDERING
// ====================

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

        let editInputs;

        const displayElements = {
            companyName,
            jobTitle,
            locationElement,
            workTypeElement,
            statusElement,
            dateAppliedElement,
            followUpDateElement
        }

        editButton.classList.add("edit-button");
        deleteButton.classList.add("delete-button");        
        jobCard.classList.add("job-card");
        statusElement.classList.add("status-badge");
        statusElement.classList.add(application.status.toLowerCase());

        jobTitle.textContent = application.jobTitle;
        companyName.textContent = application.company;
        locationElement.textContent = application.location;
        statusElement.textContent = `Status: ${application.status}`;
        workTypeElement.textContent = `Work Type: ${application.workType}`;
        deleteButton.textContent = "Delete";
        editButton.textContent = "Edit";

        
        editButton.addEventListener("click", ()=>{

            if (editButton.textContent === "Edit"){

                editInputs = enterEditMode(jobCard,application,displayElements);
                editButton.textContent = "Save";

            } else {
                saveEditedApplication(application, editInputs);
                saveApplications();
                updateDisplayedApplications();
                updateDashboard();
            }

        });

        deleteButton.addEventListener("click", ()=>{
            // Function to delete application
            deleteApplication(application.applicationId);

            // PERSISTENCE — save updated data
            saveApplications();

            // UI — update what the user sees
            updateDisplayedApplications();

            // UI - dashboard cards info update
            updateDashboard();
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


// ====================
// FORM HANDLING
// ====================

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
    saveApplications();
    updateDisplayedApplications();
    updateDashboard();
    applicationForm.reset();
});

// ====================
// SEARCH & FILTERING
// ====================

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

// ====================
// EVENT LISTENERS
// ====================

searchInput.addEventListener("input", ()=>{
    updateDisplayedApplications();
});

statusFilter.addEventListener("change", ()=>{
    updateDisplayedApplications();
});

// ====================
// INITIAL RENDER
// ====================
renderApplications(jobApplications);
updateDashboard();


