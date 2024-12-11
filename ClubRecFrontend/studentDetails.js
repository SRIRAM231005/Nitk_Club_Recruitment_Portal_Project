setTimeout(() => {
    const loader = document.querySelector('.loader');
    loader.classList.add("loader-hidden");
    loader.addEventListener('transitionend', ()=>{
        document.body.removeChild(loader);
    });
}, 2000);




let a=0;
let StudentDetails = [];
let Array1 = [];
let CurrentStudentDetails = [];
let selectedStudentDetails = [];
let nonSelectedStudentDetails = [];
let result8;
let signame;
let FilterEnable;
const rowsPerPage = 9; 
let currentPage = 1; 

        let result = JSON.parse(localStorage.getItem("result"));
        console.log(result.imageURL);

        let RoundNumber = JSON.parse(localStorage.getItem("RoundNumber"));
        console.log(RoundNumber);

        let Index = JSON.parse(localStorage.getItem("ClubSigIndex"));
        console.log(Index);

        let resultMain = JSON.parse(localStorage.getItem("resultMain"));



        async function GetStudentDetails(){
            let token = resultMain.token;
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
                console.log('result8:',result8.clubSigs);
                StudentDetails = result8.clubSigs[Index].studentList;
                signame = result8.clubSigs[Index].clubSigName;
                const namesig = document.querySelector('.h2');
                namesig.innerHTML = `(${signame})`;
                selectedStudentDetails = StudentDetails.filter(element => element.Round > RoundNumber-1);
                Act();
                renderTable(currentPage);
                } catch (error) {
                    console.error('Error:', error);
                } 
        }

        GetStudentDetails();

        //Club's Name will be displayed ----------------------------------------------------------------
        const image = document.getElementById('clubImage');
        image.src = result.imageURL;
        const head = document.querySelector('.h1');
        head.textContent = result.clubName;

        let dialog;
        function FilterDialogueBox(){
            const Filter = document.querySelector('.Filter');
            const body = document.body;
            dialog = document.createElement('dialog');
            dialog.classList.add('d10');
            body.appendChild(dialog);
            dialog.innerHTML = `<div class="dialogHead">
                                    <div>Filter</div>
                                    <div><img src="images/cross_close.png" onclick="dialogClose();"></div>
                                  </div>
                                  <div>Students Selection:</div>
                                  <select id="option-select">
                                        <option value="1">Selected</option>
                                        <option value="2">Not Selected</option>
                                  </select>
                                  <div class="FilterBox">
                                    <div onclick="ShowFiltered();">Filter</div>
                                    <div onclick="ClearFilter();">Clear</div>
                                  </div>`;
            dialog.showModal();
        }

        function ShowFiltered(){
            const select = document.getElementById('option-select').value;
            FilterEnable = select;
            localStorage.setItem("FilterEnable" , JSON.stringify(FilterEnable));
            console.log(FilterEnable);
            location.reload();
        }
        function ClearFilter(){
            FilterEnable = 0;
            localStorage.setItem("FilterEnable" , JSON.stringify(FilterEnable));
            location.reload();
        }


        function Act(){
            StudentDetails.forEach((element) =>{
                if(element.Round >= RoundNumber-1){
                    Array1.push(element);
                }
            })
            CurrentStudentDetails = Array1;
            selectedStudentDetails = Array1;
            nonSelectedStudentDetails = Array1;
        }

        function renderTable(page) {
            let table = document.querySelector('.table');
            table.innerHTML = '';
        
            const startIndex = (page - 1) * rowsPerPage;
            const endIndex = startIndex + rowsPerPage;
        
            let FilterEnable = JSON.parse(localStorage.getItem("FilterEnable"));
            if(FilterEnable === "1"){
                const FilterButton = document.querySelector('.FilterLabel');
                FilterButton.innerHTML = `Filter(1)`;
                selectedStudentDetails = Array1.filter(element => element.Round > RoundNumber-1);
                StudentDetailsTableFiltered1(startIndex,selectedStudentDetails);
                document.getElementById('next').disabled = currentPage * rowsPerPage >= selectedStudentDetails.length;
            }else if(FilterEnable === "2"){
                const FilterButton = document.querySelector('.FilterLabel');
                FilterButton.innerHTML = `Filter(1)`;
                nonSelectedStudentDetails = Array1.filter(element => element.Round <= RoundNumber-1);
                StudentDetailsTableFiltered1(startIndex,nonSelectedStudentDetails);
                document.getElementById('next').disabled = currentPage * rowsPerPage >= nonSelectedStudentDetails.length;
            }else{
                CurrentStudentDetails = Array1.slice(startIndex, endIndex);
                console.log('hey:',CurrentStudentDetails);
                StudentDetailsTable(startIndex,CurrentStudentDetails);
                document.getElementById('next').disabled = currentPage * rowsPerPage >= Array1.length;
            }
            
            document.getElementById('prev').disabled = currentPage === 1;
            document.querySelector('.currentPage').innerHTML = `${currentPage}`;
        }


        function changePage(direction) {
            if (direction === 'next' && currentPage * rowsPerPage < StudentDetails.length) {
                currentPage++;
            } else if (direction === 'prev' && currentPage > 1) {
                currentPage--;
            }
            renderTable(currentPage);
        }



        function StudentDetailsTableFiltered1(startIndex,array){
            let table = document.querySelector('.table');
            array.forEach((element , index) => {
                        const poke9 = document.createElement('div');
                        poke9.classList.add('poke9');
                        poke9.innerHTML = `<div>${element.username}</div>
                                            <div class="schedule">${new Date(element.DateAndTime).toLocaleString()}</div>
                                            <div class="interviewer">${element.Interviewer}</div>
                                            <div>${element.rollnum}</div>
                                            <div>${element.email}</div>
                                            <div>${element.phoneNum}</div>
                                            <button onclick="Selected(${StudentDetails.indexOf(element)});" class="Select${StudentDetails.indexOf(element)}">Select</button>
                                            <button onclick="ViewDetails(${StudentDetails.indexOf(element)});">View Details</button>
                                            <button>Remove</button>`;
                        table.appendChild(poke9);
                ButtonColor(StudentDetails.indexOf(element));
            });

            function ButtonColor(index){
                if(StudentDetails[index].Round > RoundNumber-1){
                    let selectedButton = document.querySelector(`.Select${index}`);
                    selectedButton.style.backgroundColor = 'green';
                    selectedButton.style.color = "white";             
                    selectedButton.innerText = "Selected"; 
                }
            }
        }              


        function StudentDetailsTable(startIndex,array){
            let table = document.querySelector('.table');
            array.forEach((element , index) => {
                    const poke9 = document.createElement('div');
                    poke9.classList.add('poke9');
                    poke9.innerHTML = `<div>${element.username}</div>
                                        <div class="schedule">${new Date(element.DateAndTime).toLocaleString()}</div>
                                        <div class="interviewer">${element.Interviewer}</div>
                                        <div>${element.rollnum}</div>
                                        <div>${element.email}</div>
                                        <div>${element.phoneNum}</div>
                                        <button onclick="Selected(${StudentDetails.indexOf(element)});" class="Select${StudentDetails.indexOf(element)}">Select</button>
                                        <button onclick="ViewDetails(${StudentDetails.indexOf(element)});">View Details</button>
                                        <button>Remove</button>`;
                    table.appendChild(poke9);
                console.log('hi:',StudentDetails.indexOf(element));
                ButtonColor(StudentDetails.indexOf(element));
            });

            function ButtonColor(index){
                if(StudentDetails[index].Round > RoundNumber-1){
                    let selectedButton = document.querySelector(`.Select${index}`);
                    selectedButton.style.backgroundColor = 'green';
                    selectedButton.style.color = "white";             
                    selectedButton.innerText = "Selected"; 
                }
            }
        }


        let dialogue;
        function ViewDetails(index){
            if(!dialogue){
                const body = document.body;
                dialogue = document.createElement('dialog');
                dialogue.classList.add('d0');
                body.appendChild(dialogue);
            }
            dialogue = document.querySelector('.d0');
            dialogue.innerHTML = ``;
            const info = document.createElement('div');
            info.classList.add('info');
            info.innerHTML = `<div class="detail">
                                    <div>Full Name:</div>
                                    <div>${StudentDetails[index].username}</div>
                              </div>
                                    <div class="schedule1">
                                        <div class="detail">
                                            <div>Schedule:</div>
                                            <div class="schedule2">${new Date(StudentDetails[index].DateAndTime).toLocaleString()}</div>
                                        </div>
                                        <div class="detail">
                                            <div>Interviewer:</div>
                                            <div>${StudentDetails[index].Interviewer}</div>
                                        </div>
                                        <div class="detail"><button onclick="SetSchedule(${index});">Update Schedule</button></div>
                                    </div>
                                    <div class="detail">
                                        <div>Roll Number:</div>
                                        <div>${StudentDetails[index].rollnum}</div>
                                    </div>
                                    <div class="detail">
                                        <div>Email Id:</div>
                                        <div>${StudentDetails[index].email}</div>
                                    </div>
                                    <div class="detail">
                                        <div>Contact Number:</div>
                                        <div>${StudentDetails[index].phoneNum}</div>
                                    </div>
                                    <div class="answers" style="margin: 10px;"></div>
                                    <div style="display: flex; justify-content: space-between;">
                                        <button onclick="closestudDetails();">Close</button>
                                        <button>Remove</button>
                                    </div>`;
            dialogue.appendChild(info);  
            
            dialogue.showModal();
            Answers(index);
        }

        function closestudDetails(){
            dialogue.close();
        }

        function Answers(index){
            const answers = document.querySelector('.answers');
            StudentDetails[index].questionans.forEach((element1,index) =>{
                const p = document.createElement('div');
                p.classList.add('p');
                p.innerHTML = `<div>Answer ${index+1}:</div>
                                <div class="Ans">${element1}</div>`;
                answers.appendChild(p);
            })
        }

        function SetSchedule(index){
            const schedule = document.querySelector('.schedule2');
            if(!dialogue){
                const body = document.body;
                dialogue = document.createElement('dialog');
                dialogue.classList.add('d0');
                body.appendChild(dialogue);
            }
            dialogue = document.querySelector('.d0');
            dialogue.innerHTML = ``;
            const point = document.createElement('div');
            point.classList.add('point');
            point.innerHTML = `<div class="dialogHead">
                                <div>Update</div>
                                <div><img src="images/cross_close.png" onclick="dialogueClose();"></div>
                               </div>
                                <input type="datetime-local" placeholder="ClubData" class="dateTime1 InputID"><br><br>
                                <input type="text" placeholder="Interviewer" class="interviewer1 InputID"><br><br>
                                <button onclick="UpdateSchedule(${index});closestudDetails();">Update</button>`;
            dialogue.appendChild(point);

            dialogue.showModal();
        }

        async function UpdateSchedule(index){
            console.log('hi');
            const dateTime = document.querySelector('.dateTime1').value;
            const Interviewer = document.querySelector('.interviewer1').value;
            let token = resultMain.token;

            try {
                const response = await fetch('http://localhost:8006/club/setint', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        clubName: result.clubName,
                        sigName: signame,
                        username: StudentDetails[index].username,
                        dateTime: dateTime,
                        interviewer: Interviewer
                    })    
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result14 = await response.json();
                console.log('result14:',result14);
                closestudDetails();
                location.reload();  
            }catch (error) {
                console.error('Error:', error);
            } 
        }

        let RoundNum = RoundNumber - 1;
        async function Selected(index){
            let token = resultMain.token;
            console.log(RoundNumber,result.rounds);
            if(RoundNumber === Number(result.rounds)){
                try {
                    const response = await fetch('http://localhost:8006/club/checksigpref', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            username: StudentDetails[index].username,
                        })    
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const result16 = await response.json();
                    console.log('result16:',result16);
                    console.log('a:',a);
                    result16.sigPreference.forEach((element) =>{
                        if(element === signame){
                            return a;
                        }else{
                            result8.clubSigs.forEach((element1) =>{
                                if(element === element1.clubSigName){
                                    console.log(element1.clubSigName);
                                    console.log(element1.studentList.length);
                                    for(let i=0; i<element1.studentList.length; i++){
                                        if(StudentDetails[index].username === element1.studentList[i].username){
                                            console.log('hey:',element1.studentList[i].Round,Number(result.rounds));
                                            if(element1.studentList[i].Round === Number(result.rounds)){
                                                a=1;
                                                console.log("you can't select");
                                                DialogAlert();
                                            } 
                                        }
                                    }
                                }
                            })
                        }
                    })
                }catch (error) {
                    console.error('Error:', error);
                } 
            }

            function DialogAlert(){
                const body = document.body;
                dialog = document.createElement('dialog');
                dialog.classList.add('d11');
                body.appendChild(dialog);
                const poke21 = document.createElement('div');
                poke21.classList.add('poke21');
                poke21.innerHTML = `<div class="dialogHead">
                                        <div>Alert!</div>
                                        <div><img src="images/cross_close.png" onclick="dialogClose();"></div>
                                    </div>
                                    <div>This student cannot be selected because they are already placed in a higher-preference club</div>`;
                dialog.appendChild(poke21);
                dialog.showModal();
            }
            

            if(a === 0){
                let Rounds;
                const selectedButton = document.querySelector(`.Select${index}`);
                if(selectedButton.style.backgroundColor === "green"){
                    Rounds = RoundNum;
                    selectedButton.style.backgroundColor = "rgb(251, 162, 9)";   
                    selectedButton.style.color = "black";             
                    selectedButton.innerText = "Select";            
                }else{
                    Rounds = RoundNum+1;
                    selectedButton.style.backgroundColor = "green";   
                    selectedButton.style.color = "white";             
                    selectedButton.innerText = "Selected";           
                }
                console.log(Rounds);
                try {
                    const response = await fetch('http://localhost:8006/club/setselect', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            clubName: result.clubName,
                            sigName: signame,
                            username: StudentDetails[index].username,
                            Round : Rounds
                        })    
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const result15 = await response.json();
                    console.log('result14:',result15);
                }catch (error) {
                    console.error('Error:', error);
                } 
            }
            
        }


function dialogClose(){
    dialog.close();
}

function dialogueClose(){
    dialogue.close();
}


function Export(){
    finalListArr = [['Name','Roll Number']];
    selectedStudentDetails.forEach(key => {
        finalListArr.push([key.username,key.rollnum]);
    });
    console.log(finalListArr);
    const worksheet = XLSX.utils.aoa_to_sheet(finalListArr);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'output.xlsx');
}