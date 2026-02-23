let totalJobs = 0;
let interviewList = [];
let rejectedList = [];

let currentStatus = "all-filter-btn";

const outOfCount = document.getElementById("outOfCount");
let total = document.getElementById("total");
let interview = document.getElementById("interviewCount");
let rejected = document.getElementById("rejectedCount");


const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");



const allCardSection = document.getElementById("allCards");
const mainContainer = document.querySelector("main");
const filterSection = document.getElementById("filter-section");


const emptyAll = document.getElementById("emptyAll");
const emptyInterview = document.getElementById("emptyInterview");
const emptyRejected = document.getElementById("emptyRejected");


function calculate() {

    const totalCards = allCardSection.querySelectorAll(".card").length;
    const interviewCount = interviewList.length;
    const rejectedCount = rejectedList.length;

    total.innerText = totalCards;
    interview.innerText = interviewCount;
    rejected.innerText = rejectedCount;


    if (currentStatus === "all-filter-btn") {
        const moved = interviewCount + rejectedCount;
        outOfCount.innerText = `${moved} out of ${totalCards} jobs`;
    }
    else if (currentStatus === "interview-filter-btn") {
        outOfCount.innerText = `${interviewCount} jobs`;
    }
    else if (currentStatus === "rejected-filter-btn") {
        outOfCount.innerText = `${rejectedCount} jobs`;
    }
}
calculate();


function toggleStyle(id) {
    allFilterBtn.classList.remove("bg-blue-500", "text-amber-50");
    interviewFilterBtn.classList.remove("bg-blue-500", "text-amber-50");
    rejectedFilterBtn.classList.remove("bg-blue-500", "text-amber-50");


    allFilterBtn.classList.add("bg-[#FFFFFF]", "text-[#64748B]");
    interviewFilterBtn.classList.add("bg-[#FFFFFF]", "text-[#64748B]");
    rejectedFilterBtn.classList.add("bg-[#FFFFFF]", "text-[#64748B]");



    const selected = document.getElementById(id)

    currentStatus = id;

    selected.classList.remove("bg-[#FFFFFF]", "text-[#64748B]");
    selected.classList.add("bg-blue-500", "text-amber-50");

    if (id == "interview-filter-btn") {
        allCardSection.classList.add("hidden");
        filterSection.classList.remove("hidden");
        renderInterview();
    }
    else if (id == "all-filter-btn") {
        allCardSection.classList.remove("hidden");
        filterSection.classList.add("hidden");
    }
    else if (id == "rejected-filter-btn") {
        allCardSection.classList.add("hidden");
        filterSection.classList.remove("hidden");
        renderRejected();
    }
    calculate();
}


mainContainer.addEventListener("click", function (event) {


    // NOTE: The status color matching feature below was implemented for testing purposes.
    // It was not part of the assignment requirements, so it has been commented out.
    const card = event.target.closest(".card");
    if (!card) return;
    const statusElement = card.querySelector(".status");
    if (event.target.closest(".interview-btn")) {
        card.classList.remove(
            "border-l-red-500", "border-l-gray-300",
            "border-t-red-500", "border-t-gray-300",
            "border-b-red-500", "border-b-gray-300"
        );
        card.classList.add(
            "border-l-green-500",
            "border-t-green-500",
            "border-b-green-500"
        );
        statusElement.innerText = "Interview";
        statusElement.classList.remove(
            "bg-[#EEF4FF]", "text-[#002C5C]",
            "bg-red-100", "text-red-600"
        );

        statusElement.classList.add("bg-green-100", "text-green-600");
        const companyName = card.querySelector(".companyName").innerText;
        const positionName = card.querySelector(".position").innerText;
        const jobName = card.querySelector(".job").innerText;
        const notes = card.querySelector(".notes").innerText;
        card.querySelector(".status").innerText = "Interview";



        const cardInfo = {
            companyName,
            positionName,
            jobName,
            status: 'Interview',
            notes
        }

        const existingCompany = interviewList.find(item => item.companyName == cardInfo.companyName);

        if (!existingCompany) {
            interviewList.push(cardInfo);
        }

        rejectedList = rejectedList.filter(item => item.companyName != cardInfo.companyName);
        if (currentStatus == "rejected-filter-btn") {
            renderRejected();
        }
        calculate();

    }

    // NOTE: The status color matching feature below was implemented for testing purposes.
    // It was not part of the assignment requirements, so it has been commented out.
    else if (event.target.classList.contains("rejected-btn")) {
        const card = event.target.closest(".card");
        card.classList.remove("border-l-green-500", "border-l-gray-300",
            "border-t-green-500", "border-t-gray-300", "border-b-green-500", "border-b-gray-300"
        );
        card.classList.add("border-l-red-500", "border-t-red-500", "border-b-red-500");
        statusElement.innerText = "Rejected";
        statusElement.classList.remove(
            "bg-[#EEF4FF]", "text-[#002C5C]",
            "bg-green-100", "text-green-600"
        );
        statusElement.classList.add("bg-red-100", "text-red-600");
        const companyName = card.querySelector(".companyName").innerText;
        const positionName = card.querySelector(".position").innerText;
        const jobName = card.querySelector(".job").innerText;
        const notes = card.querySelector(".notes").innerText;
        card.querySelector(".status").innerText = "Rejected";



        const cardInfo = {
            companyName,
            positionName,
            jobName,
            status: 'Rejected',
            notes
        }

        const existingCompany = rejectedList.find(item => item.companyName == cardInfo.companyName);

        if (!existingCompany) {
            rejectedList.push(cardInfo);
        }

        interviewList = interviewList.filter(item => item.companyName != cardInfo.companyName);

        if (currentStatus == "interview-filter-btn") {
            renderInterview();
        }

        calculate();
    }

    else if (event.target.closest(".btn-delete")) {

        const parentNode = event.target.closest(".card");
        const companyName = parentNode.querySelector(".companyName").innerText;


        interviewList = interviewList.filter(item => item.companyName != companyName);


        rejectedList = rejectedList.filter(item => item.companyName != companyName);


        parentNode.remove();

        if (currentStatus == "interview-filter-btn") {
            renderInterview();
        }
        else if (currentStatus == "rejected-filter-btn") {
            renderRejected();
        }


        checkAllEmpty();
        calculate();


    }
})

function checkAllEmpty() {
    if (allCardSection.children.length === 0) {
        emptyAll.classList.remove("hidden");
    } else {
        emptyAll.classList.add("hidden");
    }
}

function renderInterview() {
    filterSection.innerHTML = "";

    emptyInterview.classList.add("hidden");

    if (interviewList.length === 0) {
        filterSection.appendChild(emptyInterview);
        emptyInterview.classList.remove("hidden");
        return;
    }

    for (let item of interviewList) {
        console.log(item);
        let div = document.createElement("div");
        div.className = "card flex flex-col md:flex-row md:justify-between border border-[#F1F2F4] bg-white rounded-2xl p-6 md:p-8 gap-6";

        div.innerHTML = `
        
                    <div class=" space-y-6">
                        <div>
                            <p class="companyName text-[#002C5C] text-xl md:text-2xl font-semibold">${item.companyName}
                            </p>
                            <p class="position text-[#64748B] mt-3">${item.positionName}</p>
                        </div>
                        <div>
                            <p class="job text-[#64748B]">${item.jobName}</p>
                        </div>
                        <div>
                            <p class="status text-[#002C5C] bg-[#EEF4FF] w-[120px] py-2 text-center rounded-md">${item.status}
                            </p>
                            <p class="notes text-[#323B49]">${item.notes}</p>

                        </div>

                        <div class=" flex gap-5">
                            <button class="interview-btn px-4 py-2 rounded-md  text-green-500 border">INTERVIEW
                            </button>
                            <button class="rejected-btn px-4 py-2  rounded-md text-red-500 border">REJECTED</button>
                        </div>
                    </div>
                    <div>
                        <button class="btn-delete bg-[#F1F2F4] rounded-full px-3 py-2"><i
                                class=" text-[#64748B] fa-regular fa-trash-can"></i></button>
                    </div>
        
        `;
        filterSection.appendChild(div);
    }
}

function renderRejected() {
    filterSection.innerHTML = "";
    emptyRejected.classList.add("hidden");
    if (rejectedList.length === 0) {
        filterSection.appendChild(emptyRejected);
        emptyRejected.classList.remove("hidden");
        return;
    }

    for (let item of rejectedList) {
        let div = document.createElement("div");
        div.className = "card flex flex-col md:flex-row md:justify-between border border-[#F1F2F4] bg-white rounded-2xl p-6 md:p-8 gap-6";

        div.innerHTML = `
        
                    <div class=" space-y-6">
                        <div>
                            <p class="companyName text-[#002C5C] text-xl md:text-2xl font-semibold">${item.companyName}
                            </p>
                            <p class="position text-[#64748B] mt-3">${item.positionName}</p>
                        </div>
                        <div>
                            <p class="job text-[#64748B]">${item.jobName}</p>
                        </div>
                        <div>
                            <p class="status text-[#002C5C] bg-[#EEF4FF] w-[120px] py-2 text-center rounded-md">${item.status}
                            </p>
                            <p class="notes text-[#323B49]">${item.notes}</p>

                        </div>

                        <div class=" flex gap-5">
                            <button class="interview-btn px-4 py-2 rounded-md  text-green-500 border">INTERVIEW
                            </button>
                            <button class="rejected-btn px-4 py-2  rounded-md text-red-500 border">REJECTED</button>
                        </div>
                    </div>
                    <div>
                        <button class="btn-delete bg-[#F1F2F4] rounded-full px-3 py-2"><i
                                class=" text-[#64748B] fa-regular fa-trash-can"></i></button>
                    </div>
        
        `;
        filterSection.appendChild(div);
    }
}