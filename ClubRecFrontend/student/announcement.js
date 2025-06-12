const announcementArea = document.querySelector('.announcementArea');
const registrationArea = document.querySelector('.registrationArea');
let studentDetails = JSON.parse(localStorage.getItem("resultMain"));
console.log(studentDetails);

lucide.createIcons();

//Functions To Display Announcments of every Clubs ----------------------------------------------------- 
//Function to make announcement Cards
async function DisplayAnn(){
    const response = await fetch('http://localhost:8006/student/ann');
    result4 = await response.json();
    console.log(result4);
    result4.reverse().forEach((element,index) => {
        if(index >= 10){
            return;
        }
        const poke3 = document.createElement('div');
        poke3.classList.add('poke3');
        let dateObj = new Date(element.Dates);
        let formattedDate = dateObj.toLocaleDateString();
        let formattedTime = dateObj.toLocaleTimeString(undefined,{
            hour: '2-digit',
            minute: '2-digit',
            hourCycle: 'h12',
        })
        poke3.innerHTML = `<div class="announcementCardInfo">
                                <div class="announcementCardInfoHeader">
                                    <div style="color:rgb(251, 162, 9);">${element.clubName}</div>
                                    <div style="color:rgb(251, 162, 9);">${element.clubSigName}</div>
                                </div>
                                <div class="description">${element.description}</div>
                                <div class="announcementCardInfoLink">
                                    <div style="color: #969494; padding-bottom: 5px;">IMP LINKS:</div>
                                    <div><a href="${element.links}">${element.links}</a></div>
                                </div>
                            </div>
                            <div class="announcementCardDateTime">
                                <div><span>Date:</span><br> ${formattedDate}</div>
                                <div><span>Time:</span><br> ${formattedTime}</div>
                            </div>
                           </div>`;
        announcementArea.appendChild(poke3);

        dialogueForAnn(poke3,element,formattedDate,formattedTime);
    });
}

DisplayAnn();

//Function to make a dialogue for Announcements
function dialogueForAnn(poke3,element,formattedDate,formattedTime){
        poke3.addEventListener("click",()=>{
            let dialogue = document.querySelector('.announcementCardDialog');
            if(!dialogue){
                const body = document.body;
                dialogue = document.createElement('dialog');
                dialogue.classList.add('announcementCardDialog');
                body.appendChild(dialogue);
            }
            dialogue.innerHTML = `<div>
                                    <div class="announcementCardDialogHeader">
                                    <div style="color:rgb(251, 162, 9);">${element.clubName} - ${element.clubSigName}</div>
                                    <i class="lucidicons close" data-lucide="x" style="color: white; cursor: pointer;"></i>
                                    </div>
                                    <div class="announcementCardDialogDescription">${element.description}</div>
                                    <div class="announcementCardInfoLink" style="padding:20px;">
                                        <div style="color: #969494; padding-bottom: 5px;">IMP LINKS:</div>
                                        <div><a href="${element.links}">${element.links}</a></div>
                                    </div>
                                    <div class="announcementDialogDateTime">
                                        <div><span>Date:</span><br> ${formattedDate}</div>
                                        <div><span>Time:</span><br> ${formattedTime}</div>
                                    </div>
                                    <div class="announcementCardDateTime"><button class="closebutton">Close</button></div>
                                </div>`;
            dialogue.showModal();
            lucide.createIcons();  
            
            document.querySelector('.close').addEventListener("click",()=>{
                dialogue.close();
            })
            document.querySelector('.closebutton').addEventListener("click",()=>{
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
    result6.forEach((element2, index) => {
        // Donot touch this condition
        if((!element2.description) || index >=2){
            return 0;
        }
        poke7 = document.createElement('div');
        poke7.classList.add('poke7');
        poke7.innerHTML = `<div class="poke7div">
                                <div class="line"></div>
                                <div style="display:grid;gap: 10px;padding: 10px 0; padding-right: 20px;">
                                    <div style="display: flex; align-items:center;">
                                        <div class="registrationClubTag">${element2.clubName}</div>
                                        <div>${element2.clubName} Club Recruitment Started</div>
                                    </div>
                                    <div style="padding-left: 70px;">
                                        <div class="description" style="color: #bebbbb; height: 44px; font-size: 16px;">${element2.description}</div>
                                        <div style="margin-top: 10px;"><button class="registerButton">Register Now</button></div>
                                    </div> 
                                </div> 
                           </div>`;
        registrationArea.appendChild(poke7); 

        const registerButton = poke7.querySelector('.registerButton');
        dialogueRegForm(registerButton,element2);

        element2.clubSigs.forEach((childelement) =>{
            poke7 = document.createElement('div');
            poke7.classList.add('poke7');
            poke7.innerHTML = `<div class="poke7div">
                                    <div class="line"></div>
                                    <div style="display:grid;gap: 10px;padding: 10px 0; padding-right: 20px;">
                                        <div style="display: flex; align-items:center;">
                                            <div class="registrationClubTag">${element2.clubName}</div>
                                            <div>${element2.clubName} - ${childelement.clubSigName} Assingment Form </div>
                                        </div>
                                        <div style="padding-left: 70px;">
                                            <div class="description" style="color: #bebbbb; height: 44px; font-size: 16px;">${element2.description}</div>
                                            <div style="margin-top: 10px;"><button class="registerButton">Fill Form</button></div>
                                        </div> 
                                    </div> 
                            </div>`;
            if(childelement.sigDescription){
                registrationArea.appendChild(poke7);
            } 

            const registerButton = poke7.querySelector('.registerButton');
            dialogueAssingmentForm(registerButton,element2,childelement);
        })
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
                                <div><img src="/images/cross_close.png" onclick="dialogueClose();"></div>
                               </div>
                               <div class="addDiv">
                                <div style="color:rgb(251, 162, 9);">${element.clubName}</div>
                                <div class="registrationDescription">${element.description}</div>
                                <div class="inputDiv">
                                    <div class="inputHeader">Full Name</div>
                                    <div class="inputBox"><input type="text" id="username" class="InputID" title="You cannot edit this" placeholder="User Name" readonly></div>
                                </div>
                                <div class="inputDiv">
                                    <div class="inputHeader">Roll Number</div>
                                    <div class="inputBox"><input type="text" id="rollnum" class="InputID" placeholder="Roll Number"></div>
                                </div>
                                <div class="inputDiv">
                                    <div class="inputHeader">Email</div>                
                                    <div class="inputBox"><input type="text" id="email" class="InputID" title="You cannot edit this" placeholder="Email ID" readonly></div>
                                </div>    
                                <div class="inputDiv">
                                    <div class="inputHeader">Contact Number</div>
                                    <div class="inputBox"><input type="number" id="phoneNum2" class="InputID" placeholder="Contact Number"></div>
                                </div>
                                <div class="inputHeader">Select your Sigs According to Preference Order</div>
                               </div>`;
            dialogue.appendChild(poke4);
            const addDiv = document.querySelector('.addDiv');
            if(!studentDetails){
                PopupCreation(2,'Please Login First');
                return;
            }
            document.getElementById('username').value = studentDetails.username;
            document.getElementById('email').value = studentDetails.email;
            element.clubSigs.forEach((element1, index) => {
                const poke5 = document.createElement('div');
                poke5.classList.add('poke5');
                const options = element.clubSigs.map(sig => `<option value="${sig.clubSigName}">${sig.clubSigName}</option>`).join("");

                poke5.innerHTML = `<div class="orderDiv">
                                   <div class="inputBox">
                                        <select id="selectedOption${index}" class="InputID" onchange="selectedSigsFunction(this.value,${index});">
                                            <option value=""> Preference${index+1} </option>
                                            ${options}
                                        </select>
                                   </div>
                                   </div>`;
                addDiv.appendChild(poke5);                   
            });

            console.log(element.clubSigs);

            let number = 0;
            element.questions.forEach((element2 , index) => {
                const poke17 = document.createElement('div');
                poke17.classList.add('poke17');
                poke17.innerHTML = `<div class="questionDiv" style="margin-left: 0">
                                    <div class="inputDiv">
                                    <div class="inputHeader">${element2}</div>
                                    <div class="inputBox"><textarea rows="10" cols="50" id="answer${index}" class="InputID" placeholder="Enter your Answer here"></textarea></div></div>
                                   </div>`;
                addDiv.appendChild(poke17);
                number++;
            })

            const poke6 = document.createElement('div');
            poke6.classList.add('poke6');
            poke6.innerHTML = `<button type="submit" class="button6" onclick="setRegistrationData('${element.clubName}',${number});" style="margin-top: 10px;">Submit</button>`;
            dialogue.appendChild(poke6);

        dialogue.showModal();
    })  
}

function dialogueAssingmentForm(registerButton,element,childelement){
    registerButton.addEventListener('click', ()=>{
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
                                <div>Assingment Form</div>
                                <div><img src="/images/cross_close.png" onclick="dialogueClose();"></div>
                               </div>
                               <div class="addDiv">
                                <div style="color:rgb(251, 162, 9);">${element.clubName} - ${childelement.clubSigName}</div>
                                <div class="registrationDescription">${childelement.sigDescription}</div>
                                <div class="inputDiv">
                                    <div class="inputHeader">Full Name</div>
                                    <div class="inputBox"><input type="text" id="username" class="InputID" title="You cannot edit this" placeholder="User Name" readonly></div>
                                </div>
                                <div class="inputDiv">
                                    <div class="inputHeader">Email</div>                
                                    <div class="inputBox"><input type="text" id="email" class="InputID" title="You cannot edit this" placeholder="Email ID" readonly></div>
                                </div>`;
            dialogue.appendChild(poke4);
            const addDiv = document.querySelector('.addDiv');
            if(!studentDetails){
                PopupCreation(2,'Please Login First');
                return;
            }
            document.getElementById('username').value = studentDetails.username;
            document.getElementById('email').value = studentDetails.email;  
            
            let number = 0;
            childelement.sigQuestions.forEach((ele , index) => {
                const poke17 = document.createElement('div');
                poke17.classList.add('poke17');
                poke17.innerHTML = `<div class="questionDiv">
                                    <div class="inputHeader">${ele}</div>
                                    <div class="inputBox"><textarea rows="10" cols="50" id="answerAss${index}" class="InputID" placeholder="Enter your Answer here"></textarea></div>
                                   </div>`;
                addDiv.appendChild(poke17);
                number++;
            })

            const poke6 = document.createElement('div');
            poke6.classList.add('poke6');
            poke6.innerHTML = `<button type="submit" class="button6" onclick="setAssingmentData('${element.clubName}','${childelement.clubSigName}',${number});" style="margin-top: 10px;">Submit</button>`;
            dialogue.appendChild(poke6);

        dialogue.showModal();
    })
}

//function to check the order in which the clubs are Checked
function selectedSigsFunction(sig,index){
    selectedSigs[index] = sig;
    console.log(selectedSigs);
}

//function to set the details of the registred student
async function setRegistrationData(clubName,number){
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
            PopupCreation(1,'You have Successfully Registered');
            console.log(result13);
        }catch (error) {
            console.error('Error:', error);
        } 
        dialogue.close();
}

async function setAssingmentData(clubName,clubSigName,number){
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    const ans = [];
    for (let i = 0; i < number; i++) {
        ans.push(document.getElementById(`answerAss${i}`).value);
    }

    const data = {
        clubName: clubName,
        sigName: clubSigName,
        email: email,
        ans: ans  
    };

    try {
        const response = await fetch('http://localhost:8006/student/setassingmentdata', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            PopupCreation(4,'You have not Registered to this Sig');
            throw new Error('Network response was not ok');
        }
        const result7 = await response.json();
        PopupCreation(1,'Your Assingment is submitted');
        console.log(result7);
    }catch (error) {
        console.error('Error:', error);
    }
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
