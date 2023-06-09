const addBtn = document.querySelector("#Add");
const quoteslisten= document.querySelector("#quotes");
const quotesdisplay= document.querySelector(".display");

const arr=[
    `"The world isn't perfect. But it's there for us, doing the best it can… that's what makes it so damn beautiful." — Roy Mustang `,
    `"Those who stand at the top determine what's wrong and what's right! This very place is neutral ground! Justice will prevail, you say? But, of course, it will! Whoever wins this war becomes justice!" — Don Quixote Doflamingo`,
    `"People, who can't throw something important away, can never hope to change anything." — Armin Arlert `,
    `"If you don't take risks, you can't create a future!" — Monkey D. Luffy `,
    `"You will never be able to love anybody else until you love yourself." — Lelouch Lamperouge`,
    `"The loneliest people are the kindest. The saddest people smile the brightest. The most damaged people are the wisest. All because they don't wish to see anyone else suffer the way they did." — Jellal Fernandes`,
    `"Humans die. Animals die. Plants die. Even soul reapers die. It's the arch of the universe. Everything that comes to life eventually ceases to exist." — Baraggan Louisenbairn`,
    `"A dropout will beat a genius through hard work." -  Rock Lee`,
    `"Forgetting is like a wound. The wound may heal, but it has already left a scar." - Monkey D. Luffy`,
    `"How can you keep moving forward if you keep regretting the past?" - Edward Elric`,
    `" Revenge is just the path you take to escape your suffering" - Ichigo Kurosaki`,
    `"You can die anytime, but living takes true courage" - Kenshin Himura`
    ];
const searchtext=document.querySelector("#searchbox");

(
    function(){
        showNotes();
        quotesdisplay.innerHTML=arr[Math.floor(Math.random()*arr.length)];
        const displayname=document.querySelector("#name");
        username=localStorage.getItem('username') || '';
        displayname.value=username;

        displayname.addEventListener('change',e=>{
            localStorage.setItem('username',e.target.value);
        })
    }
)()

addBtn.addEventListener("click", function(e) {
    const addTitle=document.querySelector("#Addtitle");
    const addTxt=document.querySelector("#Addtext");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    let myObj = {
      title: addTitle.value,
      text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    showNotes();
  });
  


function showNotes(){
    const notes =localStorage.getItem("notes")
    if(notes===null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
        console.log(notesObj);
    }

    let html="";
    notesObj.forEach(function(element,index){
        html += `
            <div class="note">
                    <div class="note-header">
                        <h5 class="card-title">${element.title}</h5>
                        <button id="${index}" class="i-button" onclick="deleteNote(this.id)"><i class="trash fas fa-trash" ></i></button>
                    </div>
                        <textarea class="card-text"> ${element.text}</textarea>
                </div>`;
    });

        let notesele=document.getElementById("note-contain");
        if(notesObj.length!=0){
            notesele.innerHTML=html;
            console.log("Added");
        }
        else{
            notesele.innerHTML=`Nothing to show!`;
            console.log("Nothing to Added");
        }

}

function deleteNote(index){
      console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}


quoteslisten.addEventListener("click",function(){
    console.log("clicked");
    quotesdisplay.innerHTML=arr[Math.floor(Math.random()*arr.length)];
})

searchtext.addEventListener('input',e=>{
    
    let inputVal = searchtext.value;
    let noteCards = document.getElementsByClassName('note');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("textarea")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
            console.log(cardTxt);
        }
        else{
            element.style.display = "none";
        }
    })
})