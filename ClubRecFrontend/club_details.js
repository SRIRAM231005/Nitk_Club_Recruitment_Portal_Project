
setTimeout(() => {
    const loader = document.querySelector('.loader');
    loader.classList.add("loader-hidden");
    loader.addEventListener('transitionend', ()=>{
        document.body.removeChild(loader);
    });
}, 2000);




let result = JSON.parse(localStorage.getItem("result"));
        console.log(result.imageURL);

let resultMain = JSON.parse(localStorage.getItem("resultMain"));

        //Club's Name will be displayed ----------------------------------------------------------------
        const image = document.getElementById('clubImage');
        image.src = result.imageURL;
        const head = document.querySelector('.h1');
        head.textContent = result.clubName;

        //Functions which makes a request and gets or updates the schedules box -------------------------
        //Function to make a get request to get clubSigs Name


        const roundsHeader = document.querySelector('.roundsHeader');
                roundsHeader.style.gridTemplateColumns = `repeat(${result.rounds}, 200px)`;
                for(let i=1; i<=result.rounds; i++){
                    const poke18 = document.createElement('div');
                    poke18.classList.add('poke18');
                    poke18.innerHTML = `<div>Round${i}</div>`;
                    roundsHeader.appendChild(poke18);
                }


        let array;
        async function getDetails(){
            let arr = result.clubSigs;
            let token = resultMain.token;
            array = arr[0].split(',');
            let result1;
            for(let i=0; i<array.length; i++){        
                try {
                const response = await fetch('http://localhost:8006/club/getDet', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${token}`
                    },
                    body: `clubName=${encodeURIComponent(result.clubName)}&clubSigs=${encodeURIComponent(array[i])}`,
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                result1 = await response.json();
                console.log('result1:',result1);
                const body = document.querySelector('.clubBody');
                const poke = document.createElement('div');
                poke.classList.add('poke');
                body.appendChild(poke);
                poke.innerHTML = `<div class="row">
                                    <div class="sigName">${result1.clubSigName}</div>
                                    <div class="date${i} schedule"></div>
                                    <button class="set${i}" onclick="setDate('${result1.clubSigName}',${i});">Set</button>
                                  </div>`;
                
                const schedule = document.querySelector(`.date${i}`);
                schedule.style.gridTemplateColumns = `repeat(${result.rounds}, 200px)`;
                } catch (error) {
                console.error('Error:', error);
                }
                addDate(result1.Dates,i,result.rounds);
                //onclick="setDate('${result1.clubSigName}');"${array[i]}
            }   
        }

        //Function to display dates already set
        function addDate(date,i,roundNum){
                console.log(date);
                for(let j=0; j<roundNum; j++){
                    let datesSec = document.querySelector(`.date${i}`);
                    console.log(i);
                    console.log('dates:',datesSec);
                    const dateObj = new Date(date[j]);
                    const formattedDate = dateObj.toLocaleString();
                    let poke2 = document.createElement('div');
                    poke2.classList.add('pk1');
                    poke2.innerHTML = `<div>${formattedDate}</div>`;
                    datesSec.appendChild(poke2);
                }    
        }


        getDetails();

        //Function to update the schedules
        function setDate(signame,k){
            let dialogue = document.querySelector('.d');
            if(! dialogue){
                const body = document.body;
                dialogue = document.createElement('dialog');
                dialogue.classList.add('d');
                body.appendChild(dialogue);
            }
               
            dialogue.innerHTML = `<div class="dialogHead">
                                    <div>Update Schedules</div>
                                    <div><img src="images/cross_close.png" class="updateDatesClose"></div>
                                  </div>
                                      <div class="dateInputs"></div>
                                      <button type="submit" class="button3">Submit</button>`; 
            dateInputs();
            dialogue.showModal();

            document.querySelector('.updateDatesClose').addEventListener('click',DialogueClose);
            function DialogueClose(){
                dialogue.close();
            }

            function dateInputs(){
                let dateInputs = document.querySelector('.dateInputs');
                for(let i=1; i<=result.rounds; i++){
                    const poke15 = document.createElement('div');
                    poke15.classList.add('poke15');
                    poke15.innerHTML = `<input type="datetime-local" placeholder="ClubData" class="dateTime${i} InputID"><br><br>`;
                    dateInputs.appendChild(poke15);
                }
            }
    
            const button3 = document.querySelector('.button3');
            button3.addEventListener('click',async (e) =>{
                e.preventDefault();
                
                let token = resultMain.token;
                const dateArr = [];
                for(let i=1; i<=result.rounds; i++){
                    dateArr.push(document.querySelector(`.dateTime${i}`).value);
                }
                try {
                const response = await fetch('http://localhost:8006/club/setdates', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        clubName: result.clubName,
                        clubSigName: signame,   // Use the correct field name for the signature
                        Dates: dateArr          // Pass array as JSON
                    }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                result2 = await response.json();
                console.log('result2:',result2);
                for(let i=0; i<result2.Dates.length; i++){
                    let changedDateSec = document.querySelector(`.date${k}`);
                    if(changedDateSec){
                        changedDateSec.innerHTML = ``;
                    }
                }    
                for(let i=0; i<result2.Dates.length; i++){
                    let changedDateSec = document.querySelector(`.date${k}`);
                    const dateObj = new Date(result2.Dates[i]);
                    const formattedDate = dateObj.toLocaleString();
                    let poke2 = document.createElement('div');
                    poke2.classList.add('pk1');
                    poke2.innerHTML = `<div>${formattedDate}</div>`;
                    changedDateSec.appendChild(poke2);
                }
                dialogue.close();
                } catch (error) {
                console.error('Error:', error);
                }
            });

        }

    //Functions for the Announcement Form ------------------------------------------------------------    
//Dialogue box to enter announcements
let dialogue;        
function announcementForm(){
    const body = document.body;
    dialogue = document.createElement('dialog');
    dialogue.classList.add('d1');
    body.appendChild(dialogue);
    dialogue.innerHTML = `<div class="dialogHead">
                            <div>Announcement</div>
                            <div><img src="images/cross_close.png" onclick="dialogueClose();"></div>
                          </div>
                          <div>Sig Name</div>
                          <input type="text" id="Signame" class="InputID" placeholder="Sig Name"><br><br>
                          <div>Description</div>
                          <input type="text" id="description" class="InputID" name="description" placeholder="Enter description"><br><br>
                          <div>Links</div>
                          <input type="text" id="links" class="InputID" placeholder="Enter Link"><br><br>
                          <div>Recruitment Dates:</div>
                          <input type="date" id="date11" class="InputID" name="date1">
                          <div class="button3"><button type="submit" class="button3" onclick="red();">Submit</button></div>
                          `;
    dialogue.showModal();                      
} 
//Function to store the announcements in the database
async function red(){
            let token = resultMain.token;
            const Signam = document.getElementById('Signame').value;
            const description = document.getElementById('description').value;
            const link = document.getElementById('links').value;
            const date = document.getElementById('date11').value;
            console.log(Signam);
            try {
            const response = await fetch('http://localhost:8006/club/setann', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${token}`
                },
                body: `clubName=${encodeURIComponent(result.clubName)}&clubSigName=${encodeURIComponent(Signam)}&description=${encodeURIComponent(description)}&links=${encodeURIComponent(link)}&Dates=${encodeURIComponent(date)}`,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let result3 = await response.json();
            console.log('result3:',result3);
            dialogue.close();

            const popup = document.getElementById('popupG');
                const timebar = document.querySelector('.timebarG');
                popup.style.transform = 'translateX(1%)';
                timebar.style.transform = 'scaleX(0)';
                setTimeout(()=>{
                    popup.style.transform = 'translateX(120%)';
                    setTimeout(()=>{
                        timebar.style.transition = 'none'; 
                        timebar.style.transform = 'scaleX(1)';
                        timebar.offsetWidth;
                        timebar.style.transition = 'transform 3s linear';
                    },200)
                },3000);

            } catch (error) {
            console.error('Error:', error);
            }
}


//Functions to upload the Registration Form ---------------------------------------------------------
//Dialogue Box for the registration Form
async function RegForm(){
    const body = document.body;
    dialogue = document.createElement('dialog');
    dialogue.classList.add('d1');
    body.appendChild(dialogue);
    dialogue.innerHTML = `<div class="dialogHead">
                            <div>Registration</div>
                            <div><img src="images/cross_close.png" onclick="dialogueClose();"></div>
                          </div>
                          <div>Description</div>
                          <input type="text" id="description1" class="InputID" name="description" placeholder="Enter description"><br><br>
                          <div>Questions to be asked:</div>
                          <input type="number" placeholder="Number of Questions" class="InputID questions"><br><br>
                          <div class="Question"></div>
                          <div class="button3"><button type="submit" class="button5">Submit</button></div>
                          `;
    dialogue.showModal();   
    document.querySelector('.questions').addEventListener('input', questionnum);
    document.querySelector('.button5').addEventListener('click',red1); 
}

function questionnum(){
    console.log('hi');
    const i = document.querySelector('.questions').value;
    const Question = document.querySelector('.Question');
    Question.innerHTML = ``;

    for(let j=1; j<=i; j++){
        const poke = document.createElement('div');
        poke.classList.add('sigNameDiv');
        poke.innerHTML = `<div>Question${j}</div><input type="text" id="Question${j}" class="InputID" name="Question" placeholder="Enter Question"><br><br>`;
        Question.appendChild(poke);
    }
    console.log(document.getElementById('Question1'));
}


//Function to patch the description of registration form in the database
async function red1(){
    let token = resultMain.token;
    let number = document.querySelector('.questions').value;
    console.log(number);
    const regdes = document.getElementById('description1').value;
    const que = [];
    for (let i = 1; i <= number; i++) {
        que.push(document.getElementById(`Question${i}`).value);
    }

    try {
        const response = await fetch('http://localhost:8006/club/setreg', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                clubName: result.clubName,  
                description: regdes,          // Pass array as JSON
                questions: que
            })    
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result5 = await response.json();
        console.log('result5:',result5);
        window.location.href = 'index.html';
        dialogue.close();
    }catch (error) {
        console.error('Error:', error);
    } 
}

//Functions to Get student details -----------------------------------------------------------------
//Function to get student details
let result8;
async function GetStudentDetails(){
    let token = resultMain.token;
    console.log('hi:',result.clubName);
    try {
        const response = await fetch('http://localhost:8006/club/studdet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            },
            body: `clubName=${encodeURIComponent(result.clubName)}`,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        result8 = await response.json();
        console.log('result8:',result8);
        const screenWidth = window.innerWidth;
        const roundsHeader = document.querySelector('.roundsHeader1');
        if(screenWidth >1085){
            roundsHeader.style.gridTemplateColumns = `repeat(${result.rounds}, 1fr)`;
        }else{
            roundsHeader.style.gridTemplateColumns = `repeat(${result.rounds}, 200px)`
        }
            for(let i=1; i<=result.rounds; i++){
                const poke18 = document.createElement('div');
                poke18.classList.add('poke18');
                poke18.innerHTML = `<div>Round${i}</div>`;
                roundsHeader.appendChild(poke18);
            }
        result8.clubSigs.forEach((element3 , index) => {
            console.log(element3.studentList);
            const RegBody = document.querySelector('.RegBody');
            const poke8 = document.createElement('div');
            poke8.classList.add('poke8');
            RegBody.appendChild(poke8);
            poke8.innerHTML = `<div class="row1">
                               <div class="sigName">${element3.clubSigName}</div>
                               <div class="ViewButton${index} ViewButton"></div>
                               </div>`;
            
            const screenWidth = window.innerWidth;
            const ViewButton1 = document.querySelector(`.ViewButton${index}`);
            if(screenWidth >1085){
                ViewButton1.style.gridTemplateColumns = `repeat(${result.rounds}, 1fr)`;
            }else{
                ViewButton1.style.gridTemplateColumns = `repeat(${result.rounds}, 200px)`
            }
            ViewButton(ViewButton1,index);                   
        });
        } catch (error) {
            console.error('Error:', error);
        } 
}


function ViewButton(ViewButton1,index){
    for(let i=1; i<=result.rounds; i++){
        const poke16 = document.createElement('div');
        poke16.classList.add('poke16');
        poke16.innerHTML = `<button onclick="displayList(${i},${index});">Students Details</button>`;
        ViewButton1.appendChild(poke16);
    }
}

GetStudentDetails();

//Function to Display the List of Students
function displayList(i,index){
    localStorage.setItem("RoundNumber" , JSON.stringify(i));
    localStorage.setItem("ClubSigIndex" , JSON.stringify(index));
    window.location.href = 'studentDetails.html';
}

function dialogueClose(){
    dialogue.close();
}

//Function to Download Final Results -----------------------------------------------------------------
async function ReleaseResult(){
    finalListele = result8.clubSigs[0].studentList[2];
    console.log(finalListele);
    finalListArr = [['Name','Email']];
    finalListele.forEach(key => {
        finalListArr.push([key.username,key.email]);
    });
    console.log(finalListArr);
    const worksheet = XLSX.utils.aoa_to_sheet(finalListArr);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'output.xlsx');
}
