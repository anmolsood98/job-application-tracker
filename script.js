const jobApplications=[
    {
        company: "Tech Giant",
        jobTitle: "Front-end Developer",
        location: "Toronto",
        workType: "Remote",
        dateApplied: "2026-09-25",
        status: "Applied",
        followUpDate: "2026-10-02"
    },
    {
        company: "Techno.Inc",
        jobTitle: "Junior Developer",
        location: "Mississauga",
        workType: "Hybrid",
        dateApplied: "2026-09-27",
        status: "Interview",
        followUpDate: "2026-10-01"
    },
    {
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


function renderApplications(){
    jobCardsContainer.innerHTML = "";

    jobApplications.forEach((application)=>{
    const jobCard = document.createElement("div");
    const jobTitle = document.createElement("p");
    const companyName = document.createElement("h2");
    const locationElement = document.createElement("p");
    const statusElement = document.createElement("p");
    const workTypeElement = document.createElement("p");
    const dateAppliedElement = document.createElement("p");
    const followUpDateElement = document.createElement("p");
    
    jobCard.classList.add("job-card");

    jobTitle.textContent = application.jobTitle;
    companyName.textContent = application.company;
    locationElement.textContent = application.location;
    statusElement.textContent = `Status: ${application.status}`;
    workTypeElement.textContent = `Work Type: ${application.workType}`;

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

    jobCardsContainer.appendChild(jobCard);
    });
}

renderApplications();

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

    const newApplication = {
        company,
        jobTitle,
        location,
        workType,
        dateApplied,
        status,
        followUpDate
    }
    jobApplications.push(newApplication);
    renderApplications();
    applicationForm.reset();
});





