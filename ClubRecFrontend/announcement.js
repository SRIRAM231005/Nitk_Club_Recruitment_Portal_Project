const announcementArea = document.querySelector('.announcementArea');
const registrationArea = document.querySelector('.registrationArea');

//Functions To Display Announcments of every Clubs ----------------------------------------------------- 
//Function to make announcement Cards
async function DisplayAnn(){
    const response = await fetch('http://localhost:8006/student/ann');
    result4 = await response.json();
    console.log(result4);
    result4.forEach(element => {
        const poke3 = document.createElement('div');
        poke3.classList.add('poke3');
        let dateObj = new Date(element.Dates);
        let formattedDate = dateObj.toLocaleString();
        poke3.innerHTML = `<div>
                            <div style="color:rgb(251, 162, 9);">${element.clubName}</div>
                            <div style="color:rgb(251, 162, 9);">${element.clubSigName}</div>
                            <div class="description">${element.description}</div>
                            <div style="font-size:17px;">Imp links:</div>
                            <div><a href="${element.links}">${element.links}</a></div>
                            <div style="font-size:17px;">Date:</div>
                            <div>${formattedDate}</div>
                           </div>`;
        announcementArea.appendChild(poke3);

        dialogueForAnn(poke3,element,formattedDate);
    });
}

DisplayAnn();

//Function to make a dialogue for Announcements
function dialogueForAnn(poke3,element,formattedDate){
        poke3.addEventListener("click",()=>{
            let dialogue = document.querySelector('.d2');
            if(!dialogue){
                const body = document.body;
                dialogue = document.createElement('dialog');
                dialogue.classList.add('d2');
                body.appendChild(dialogue);
            }
            dialogue.innerHTML = `<div>
                                    <div style="color:rgb(251, 162, 9);">${element.clubName}</div>
                                    <div style="color:rgb(251, 162, 9);">${element.clubSigName}</div>
                                    <div>${element.description}</div>
                                    <div style="font-size:17px;">Imp links:</div>
                                    <a href="${element.links}">${element.links}</a>
                                    <div style="font-size:17px;">Date:</div>
                                    <div>${formattedDate}</div>
                                    <button class="close">OK</button>
                                </div>`;
            dialogue.showModal();  
            
            document.querySelector('.close').addEventListener("click",()=>{
                dialogue.close();
            })
    })
}

//Functions to Display the registration forms for all Clubs ---------------------------------------------
//Function to make a Dialogue for the Registration Form 
let dialogue;
let result6;
let selectedSigs = [];
async function DisplayRegForm(){
    const response = await fetch('http://localhost:8006/student/getreg');
    result6 = await response.json();
    let poke7;
    result6.forEach(element2 => {
        if(!element2.description){
            return 0;
        }
        poke7 = document.createElement('div');
        poke7.classList.add('poke7');
        poke7.innerHTML = `<div class="poke7div">
                                <div class="line"></div>
                                <div style="display:grid;gap: 10px;">
                                    <div style="color:rgb(251, 162, 9);">${element2.clubName}</div>
                                    <div class="description">${element2.description}</div> 
                                </div> 
                           </div>`;
        registrationArea.appendChild(poke7); 
        
        dialogueRegForm(poke7,element2);
    })
    
}

DisplayRegForm();

//This Dialogue box for registration also has a feature to select the Sigs preference
function dialogueRegForm(poke7,element){
    poke7.addEventListener('click', ()=>{
            dialogue = document.querySelector('.d3');
            if(!dialogue){
                const body = document.body;
                dialogue = document.createElement('dialog');
                dialogue.classList.add('d3');
                body.appendChild(dialogue);
            }
            dialogue.innerHTML = ``;
            const poke4 = document.createElement('div');
            poke4.classList.add('poke4');
            poke4.innerHTML = `<div class="dialogHead">
                                <div>Registration Form</div>
                                <div><img src="images/cross_close.png" onclick="dialogueClose();"></div>
                               </div>
                               <div class="addDiv">
                                <div style="color:rgb(251, 162, 9);">${element.clubName}</div>
                                <div class="inp des">${element.description}</div>
                                <div class="inp"><input type="text" id="username" class="InputID" placeholder="User Name"><br><br></div>
                                <div class="inp"><input type="text" id="rollnum" class="InputID" placeholder="Roll Number"><br><br></div>
                                <div class="inp"><input type="text" id="email" class="InputID" placeholder="Email ID"><br><br></div>
                                <div class="inp"><input type="number" id="phoneNum2" class="InputID" placeholder="Contact Number"><br><br></div>
                                <div class="inp" style="font-size:19px;">Select your Sigs According to Preference Order</div>
                               </div>`;
            dialogue.appendChild(poke4);
            const addDiv = document.querySelector('.addDiv');
            element.clubSigs.forEach(element1 => {
                const poke5 = document.createElement('div');
                poke5.classList.add('poke5');
                poke5.innerHTML = `<div class="orderDiv">
                                   <input type="checkbox" id="checkSig" class="InputID" onclick="checkBox();" name="clubSigs1" value="${element1.clubSigName}">
                                   <div>${element1.clubSigName}</div>
                                   </div>`;
                addDiv.appendChild(poke5);                   
            });

            let number = 0;
            element.questions.forEach((element2 , index) => {
                const poke17 = document.createElement('div');
                poke17.classList.add('poke17');
                poke17.innerHTML = `<div class="questionDiv">
                                    <div>${element2}</div>
                                    <div><textarea rows="10" cols="50" id="answer${index}" class="InputID" placeholder="Enter Answer"></textarea><br><br></div>
                                   </div>`;
                addDiv.appendChild(poke17);
                number++;
            })

            const poke6 = document.createElement('div');
            poke6.classList.add('poke6');
            poke6.innerHTML = `<button type="submit" class="button6" onclick="red2('${element.clubName}',${number});" style="margin-top: 10px;">Submit</button>`;
            dialogue.appendChild(poke6);

        dialogue.showModal();
    })  
}

//function to check the order in which the clubs are Checked
function checkBox(){
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            if (checkbox.checked) {
                if (!selectedSigs.includes(checkbox.value)) {
                    selectedSigs.push(checkbox.value);
                }
            } else {
                const index = selectedSigs.indexOf(checkbox.value);
                if (index > -1) {
                    selectedSigs.splice(index, 1);
                }
            }
            console.log('hi2:',selectedSigs);
    });
}

//function to set the details of the registred student
async function red2(clubName,number){
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const rollnum = document.getElementById('rollnum').value;
        const phoneNum = document.getElementById('phoneNum2').value;

        const ans = [];
        for (let i = 0; i < number; i++) {
            ans.push(document.getElementById(`answer${i}`).value);
        }

        const group1 = {username: username, email: email, rollnum: rollnum, phoneNum: phoneNum, questionans: ans};

        const data = {
            clubName: clubName,
            selectedSigs: selectedSigs,
            group1: group1  
          };

        try {
            const response = await fetch('http://localhost:8006/student/setdata', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result7 = await response.json();
            console.log(result7);
        }catch (error) {
            console.error('Error:', error);
        } 

        //this is for data of SigPreferenceOrder
        const sigPreferenceArr = selectedSigs;
        const data2 = {
            username: username,
            email:email,
            sigPreferenceArr: sigPreferenceArr
        };

        try {
            const response = await fetch('http://localhost:8006/student/sigPref', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data2),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result13 = await response.json();
            console.log(result13);
        }catch (error) {
            console.error('Error:', error);
        } 
        dialogue.close();
}

//Functions for Clubs Preference Form -----------------------------------------------------------------
//Function to make the preference form
async function PreferenceOrder(){
    const response = await fetch('http://localhost:8006/student/getreg');
    let result10 = await response.json();
    let length1 = result10.length;
    console.log(length1);
    const preferenceForm = document.querySelector('.preferenceFormBody');
    const poke13 = document.createElement('div');
    poke13.classList.add('poke13');
    poke13.innerHTML = `<input type="text" id="username2" class="InputID" placeholder="User Name"><br><br>
                        <input type="text" id="email2" class="InputID" placeholder="Email ID"><br><br>
                        `;
    preferenceForm.appendChild(poke13);
    const poke14 = document.createElement('div');
    poke14.classList.add('poke14');
    for(let i=0; i<length1; i++){
        poke14.innerHTML += `<input type="text" id="preference${i}" class="InputID" placeholder="Club Name"><br><br>`;
    }
    preferenceForm.appendChild(poke14);
    
    const poke15 = document.createElement('div');
    poke15.classList.add('poke15');
    poke15.innerHTML = `<button onclick="red3(${length1});">Submit Preference</button>`;
    preferenceForm.appendChild(poke15);

}

PreferenceOrder();

//Function to post the preference order of a particular student
async function red3(length1){
    const username = document.getElementById('username2').value;
    const email = document.getElementById('email2').value;

    let preferenceOrderArr = [];
    for(let i=0; i<length1; i++){
        let pref = document.getElementById(`preference${i}`).value;
        preferenceOrderArr[i] = pref;
    }

    const data = {
        username: username,
        email: email,
        preferenceOrder: preferenceOrderArr   
    };

    try {
        const response = await fetch('http://localhost:8006/admin/details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    }catch (error) {
        console.error('Error:', error);
    }
}

function dialogueClose(){
    dialogue.close();
}
