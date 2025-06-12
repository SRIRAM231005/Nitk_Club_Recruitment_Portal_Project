
function PopupCreation(popupNumber,popupContent){
    const popupTag = document.querySelector('.popupTag');
    if(popupContent === "You have Logged out"){
        popupTag.innerHTML = `<i class="lucidiconspopup"></i>
                        <div class="textContent">You have Logged out  <a href="../index.html">Home</a></div>
                        <i class="lucidicons" data-lucide="x"></i>`;

        let icon = document.querySelector('.lucidiconspopup');
        icon.dataset.lucide = "triangle-alert";
        popupTag.style.backgroundColor = 'rgba(248, 159, 4, 0.98)';
        popupTag.classList.add('show');
    }else{
        popupTag.innerHTML = `<i class="lucidiconspopup"></i>
                        <div class="textContent"></div>
                        <i class="lucidicons" data-lucide="x"></i>`;

        if(popupNumber === 1){
            let icon = document.querySelector('.lucidiconspopup');
            let data = document.querySelector('.textContent');
            icon.dataset.lucide = "circle-check-big";
            data.textContent = popupContent;
            popupTag.style.backgroundColor = 'green';
        }else if(popupNumber === 2){
            let icon = document.querySelector('.lucidiconspopup');
            let data = document.querySelector('.textContent');
            icon.dataset.lucide = "circle-alert";
            data.textContent = popupContent;
            popupTag.style.backgroundColor = 'rgba(210, 1, 1, 0.977)';
        }else if(popupNumber === 3){
            let icon = document.querySelector('.lucidiconspopup');
            let data = document.querySelector('.textContent');
            icon.dataset.lucide = "triangle-alert";
            data.textContent = popupContent;
            popupTag.style.backgroundColor = 'rgba(248, 159, 4, 0.98)';
        }else{
            let icon = document.querySelector('.lucidiconspopup');
            let data = document.querySelector('.textContent');
            icon.dataset.lucide = "Info";
            data.textContent = popupContent;
            popupTag.style.backgroundColor = 'blue';
        }

        popupTag.classList.add('show');
        console.log(popupTag);
        setTimeout(() => {
        popupTag.classList.remove('show');
        }, 5000);
    }
    lucide.createIcons();
}