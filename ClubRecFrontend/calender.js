let result9;
let dialog;
const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();
let firstDay = new Date(currentYear, currentMonth, 1).getDay();
let resultMain = JSON.parse(localStorage.getItem("resultMain"));

console.log(`Year: ${currentYear}`);
console.log(`Month: ${currentMonth + 1}`); 
console.log(`First day of the month: ${firstDay}`);


async function ScheduledDates(){
    console.log('hi');
    const response = await fetch('http://localhost:8006/student/calender');
    result9 = await response.json();
    console.log('result9',result9);
    displayCalender(currentYear,currentMonth,firstDay);
}   

ScheduledDates();


function displayCalender(year,month,day){
    let calenderHead = document.querySelector('.calenderHead');
    calenderHead.innerHTML = '';
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let poke20 = document.createElement('div');
    poke20.classList.add('poke20');
    poke20.innerHTML = `<div class="buttonControl" onclick="PreviousMonth();">Previous</div>
                        <div>${monthNames[month]}${year}</div>
                        <div class="buttonControl" onclick="NextMonth();">Next</div>`;
    calenderHead.appendChild(poke20);
    let calender = document.querySelector('.calender');
    calender.innerHTML = '';
    for (let i = 0; i < day; i++) {
        const emptySlot = document.createElement('div');
        emptySlot.classList.add('empty-slot');
        calender.appendChild(emptySlot);
    }
    for(let i=1; i<=new Date(year, month + 1, 0).getDate(); i++){
        const poke19 = document.createElement('div');
        poke19.classList.add('poke19');
        poke19.innerHTML = `<div class="date${i} dates" onclick="DateCard(${year},${month},${i});">${i}</div>`;
        calender.appendChild(poke19);
        NotifyDate(year,month,i);
    }
}

function DateCard(year,month,date){
    const body = document.body;
    dialog = document.createElement('dialog');
    dialog.classList.add('d11');
    body.appendChild(dialog);
    const poke21 = document.createElement('div');
    poke21.classList.add('poke21');
    poke21.innerHTML = `<div class="dialogHead">
                            <div>Schedules</div>
                            <div><img src="images/cross_close.png" onclick="dialogueClose();"></div>
                        </div>`;
    dialog.appendChild(poke21);
    result9.forEach(element => {
        element.Dates.forEach((element1,index) =>{
            let tod = new Date(element1);
            if(tod.getFullYear() == year && tod.getMonth() == month && tod.getDate() == date){ 
                let hours = tod.getHours();
                let minutes = tod.getMinutes();
                const ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12;  
                hours = hours ? hours : 12;  
                minutes = minutes < 10 ? '0' + minutes : minutes; 
                const time = `${hours}:${minutes} ${ampm}`;
                console.log(time);  
                let poke22 = document.createElement('div');
                poke22.classList.add('poke22');
                poke22.innerHTML = `<div>&bull; ${time} ${element.clubName} ${element.clubSigName} Round ${index+1}</div>`;
                dialog.appendChild(poke22);
            }
        })
    });
    dialog.showModal();
}


function NotifyDate(year,month,date){
    let num = 0;
    result9.forEach(element => {
        if(num ===0){
            for(let i=0; i<element.Dates.length; i++){
                let element1 = element.Dates[i];
                let tod = new Date(element1);
                if(tod.getFullYear() == year && tod.getMonth() == month && tod.getDate() == date){
                    let datee = document.querySelector(`.date${date}`);
                    let poke23 = document.createElement('div');
                    poke23.classList.add('poke23');
                    datee.appendChild(poke23);
                    num = 1;
                    break;
                }
            }
        }
    });
}


function PreviousMonth(){
    currentMonth--;
    if(currentMonth === -1){
        currentMonth = 11;
        currentYear--;
    }
    firstDay = new Date(currentYear, currentMonth, 1).getDay();
    displayCalender(currentYear,currentMonth,firstDay);
}
function NextMonth(){
    currentMonth++;
    if(currentMonth === 12){
        currentMonth = 0;
        currentYear++;
    }
    firstDay = new Date(currentYear, currentMonth, 1).getDay();
    displayCalender(currentYear,currentMonth,firstDay);
}

function dialogueClose(){
    dialog.close();
}