setTimeout(() => {
    const loader = document.querySelector('.loader');
    loader.classList.add("loader-hidden");
    loader.addEventListener('transitionend', ()=>{
        document.body.removeChild(loader);
    });
}, 2000);

let result10;
let Status = "Pending";
async function GetClubsData(){
    console.log('hi');
    const response = await fetch('http://localhost:8006/admin/displayclubs');
    result10 = await response.json();
    console.log(result10);
    DisplayClubs();
    
}

GetClubsData();

function DisplayClubs(){
    const DisplayClubs = document.querySelector('.DisplayClubs');
    result10.forEach(element => {
        const poke23 = document.createElement('div');
        poke23.classList.add('poke23');
        poke23.innerHTML = `<div class="pokeBox">
                                <div><img src="${element.imageURL}"></div>
                                <div class="content">
                                    <div class="clubName">${element.clubName}</div>
                                    <div style="margin:5px;">Club Type: ${element.clubType}</div>
                                    <div style="margin:5px;">Number of Rounds: ${element.rounds}</div>
                                    <div class="Decision">
                                        <div>Recruitment Status:</div>
                                        <div class="Status">${Status}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="Menu">&#10247;</div>`;
        DisplayClubs.appendChild(poke23);
    });
}

let dialog;
function PreferenceForm(){
    if(!dialog){
        const body = document.body;
        dialog = document.createElement('dialog');
        dialog.classList.add('d11');
        body.appendChild(dialog);
    }
    dialog = document.querySelector('.d11');
    dialog.innerHTML = ``;
    const poke24 = document.createElement('div');
    poke24.classList.add('poke24');
    poke24.innerHTML = `<div class="dialogHead">
                            <div>Preference Form</div>
                            <div><img src="images/cross_close.png" onclick="dialogueClose();"></div>
                        </div>
                        <div>Description:</div>
                        <div><input type="text" class="Description InputID" placeHolder="Enter Description"></div>
                        <div class="button6" onclick="PrefForm();"><button>Submit</button></div>`;
    dialog.appendChild(poke24);
    dialog.showModal();
}
async function PrefForm(){
    const Description = document.querySelector(".Description").value;
    try {
        const response = await fetch('http://localhost:8006/admin/description', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `Description=${encodeURIComponent(Description)}`,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        result1 = await response.json();
        console.log('result1:',result1);
        dialogueClose();
    } catch (error) {
        console.error('Error:', error);
    }
}

function dialogueClose(){
    dialog.close();
}