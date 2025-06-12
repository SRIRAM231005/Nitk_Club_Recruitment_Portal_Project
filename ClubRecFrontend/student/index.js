let resultMain;
        function displayAccount(){
            let accountBox = document.querySelector('.AccountBox');
            if(accountBox.style.display === 'none'){
                accountBox.style.display = 'block';
            }else{
                accountBox.style.display = 'none';
            }
        }

        function displayAccount2(){
            let accountBox = document.querySelector('.menuOpt');
            if(accountBox.style.display === 'none'){
                accountBox.style.display = 'block';
            }else{
                accountBox.style.display = 'none';
            }
        }

        function AnnouncementsView(){
            window.location.href = 'student/Announcements.html';
        }

        function RegistrationFormsView(){
            window.location.href = 'student/RegistrationForms.html';
        }

        function disp(){
            resultMain = JSON.parse(localStorage.getItem("resultMain"));
            if(!resultMain){
                displayLogin();
            }else{
                if(resultMain.userRole === 'Student'){
                    const displayacc = document.querySelectorAll('.displayacc_js');
                    displayacc.forEach((acc) =>{
                        acc.innerHTML = `<div style="text-align:center;"><img src="/images/accountsLogo.png" style="border-radius:50%;height:70px;width:70px;"></div>
                                            <div style="text-align:center;font-size:23px;margin-bottom:5px;">Hi, ${resultMain.username}!</div>
                                            <div style="text-align:center;margin-top:0;font-size:15px;color:#c9c9ca;">${resultMain.email}</div>
                                            <div style="margin-top:15px;background-color:#141414;padding:10px;border-radius:10px;">${resultMain.userRole}</div>
                                            <div style="border-bottom: 1px solid #5c5b5b;"></div>
                                            <div style="font-size:13px;color: #c9c9ca; text-align:left;">More Options:</div>
                                            <div style="margin-top:15px;background-color:#141414;border-radius:10px;">
                                                <div style="padding:15px;border-bottom: 1px solid #5c5b5b;cursor:pointer;margin:0;" onclick="window.location.href= 'student/calender.html';">Calender</div>
                                                <div style="padding:15px;cursor:pointer;margin:0;" onclick="window.location.href = 'student/PreferenceForm.html';">Preference Order</div>
                                            </div>
                                            <button onclick="userLogout();" style="padding-left:30px;padding-right:30px;">Logout</button>`;
                    })
                }
                else if(resultMain.userRole === 'Club Convener'){
                    const displayacc = document.querySelectorAll('.displayacc_js');
                    console.log('hi:',displayacc);
                    displayacc.forEach((acc) =>{
                        acc.innerHTML = `<div style="text-align:center;"><img src="/images/accountsLogo.png" style="border-radius:50%;height:70px;width:70px;"></div>
                                            <div style="text-align:center;font-size:23px;margin-bottom:5px;">Hi, ${resultMain.username}!</div>
                                            <div style="text-align:center;margin-top:0;font-size:15px;color:#c9c9ca;">${resultMain.email}</div>
                                            <div style="margin-top:15px;background-color:#141414;padding:10px;border-radius:10px;">${resultMain.userRole}</div>
                                            <div style="border-bottom: 1px solid #5c5b5b;"></div>
                                            <div style="font-size:13px;color: #c9c9ca; text-align:left;">More Options:</div>
                                            <div style="margin-top:15px;background-color:#141414;border-radius:10px;">
                                                <div style="padding:15px;border-bottom: 1px solid #5c5b5b;cursor:pointer;margin:0;" onclick="window.location.href= 'student/calender.html';">Calender</div>
                                                <div style="padding:15px;cursor:pointer;margin:0;" onclick="window.location.href = '../club/clubLogin.html';">Club Login</div>
                                            </div>
                                            <button onclick="userLogout();" style="padding-left:30px;padding-right:30px;">Logout</button>
                                            `;
                    })
                }else{
                    const displayacc = document.querySelectorAll('.displayacc_js');
                    displayacc.forEach((acc) =>{
                        acc.innerHTML = `<div style="text-align:center;"><img src="/images/accountsLogo.png" style="border-radius:50%;height:70px;width:70px;"></div>
                                            <div style="text-align:center;font-size:23px;margin-bottom:5px;">Hi, ${resultMain.username}!</div>
                                            <div style="text-align:center;margin-top:0;font-size:15px;color:#c9c9ca;">${resultMain.email}</div>
                                            <div style="margin-top:15px;background-color:#141414;padding:10px;border-radius:10px;">${resultMain.userRole}</div>
                                            <div style="border-bottom: 1px solid #5c5b5b;"></div>
                                            <div style="font-size:13px;color: #c9c9ca; text-align:left;">More Options:</div>
                                            <div style="margin-top:15px;background-color:#141414;border-radius:10px;">
                                                <div style="padding:15px;border-bottom: 1px solid #5c5b5b;cursor:pointer;margin:0;" onclick="window.location.href= 'student/calender.html';">Calender</div>
                                                <div style="padding:15px;cursor:pointer;margin:0;" onclick="window.location.href = '../admin/AdminPage.html';">Admin Page</div>
                                            </div>
                                            <button onclick="userLogout();" style="padding-left:30px;padding-right:30px;">Logout</button>
                                            `;
                    })
                }
            }
        }

        let dialoguee;
        function userLogin() {
            dialogue = document.querySelector('.d5');
            if(!dialogue){
                const body = document.body;
                dialoguee = document.createElement('dialog');
                dialoguee.classList.add('d5');
                body.appendChild(dialoguee);
            }
            dialoguee.innerHTML = `<div class="loginDialogHeader">
                                        <div style="margin-bottom:20px;">User Login</div>
                                    </div>
                                    <div class="inputDiv">
                                        <div class="inputHeader">Email</div>
                                        <div class="inputBox"><input type="text" id="email3" class="InputID" placeholder="xyz@example.com"></div>
                                    </div>
                                    <div class="inputDiv">
                                        <div class="inputHeader">Password</div>
                                        <div class="inputBox"><input type="password" id="password3" class="InputID" placeholder="********"></div>
                                    </div>
                                    <button class="SignInButton" type="submit" onclick="userLog();">Sign In</button>`;
            dialoguee.showModal(); 
        }

        let dialogue1;
        function userLogout(){
            const body = document.body;
            dialogue1;
            dialogue1 = document.createElement('dialog');
            dialogue1.classList.add('d6');
            dialogue1.innerHTML = `
                                  <div>Are you sure you want to logout</div>
                                  <div class="logoutButton">
                                    <div class="Yes" onclick="Logout();displayLogin();dialogueclose();PopupCreation(2,'You have been Logged out');">Yes</div>
                                    <div class="No" onclick="dialogueclose();">No</div>
                                  </div>`;
            body.appendChild(dialogue1);
            dialogue1.showModal();                      
        }

        async function Logout() {
            resultMain = JSON.parse(localStorage.getItem("resultMain"));
            let data1 = {username: resultMain.username};
            console.log(data1);
            localStorage.removeItem("resultMain"); 
        }

        function displayLogin(){
            const displayacc = document.querySelector('.displayacc_js');
            displayacc.innerHTML = `<div style="font-size:20px; margin-bottom:20px;">You have not Login</div>
                                    <div style="margin-bottom:40px;"><button onclick="userLogin();" style="padding-left:30px;padding-right:30px;">Sign In</button></div>
                                    <div style="font-size:15px;">Create an Account <a href="student/userreg.html">Sign Up</a></div>`;
            const displaymenuacc = document.querySelector('.menuOptions');
            displaymenuacc.innerHTML = `<div style="font-size:20px; margin-bottom:20px;">You have not Login</div>
                                        <div style="margin-bottom:40px;"><button onclick="userLogin();" style="padding-left:30px;padding-right:30px;">Sign In</button></div>
                                        <div style="font-size:15px;">Create an Account <a href="student/userreg.html" style="color: aqua;">Sign Up</a></div>`;
        }

        function dialogueclose(){
            dialogue1.close();
        }

        async function userLog() {
            const email = document.getElementById('email3').value;
            const password = document.getElementById('password3').value;

            const data = {
                email: email,
                password: password   
            };

            try {
                const response = await fetch('http://localhost:8006/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result17 = await response.json();
                resultMain = result17;
                localStorage.setItem('resultMain', JSON.stringify(resultMain));
                console.log(result17);
                dialoguee.close();
                displayAccount();
                PopupCreation(1,'Login Successful');
                disp();
                //location.reload();
            }catch (error) {
                console.error('Error:', error);
            } 
        }

        disp();