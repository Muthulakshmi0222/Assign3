document.body.innerHTML=`
<h1>User Form</h1>
<div class="user-form">
    <input class="add-user-name" placeholder="Enter your name" />
    <input class="add-user-avatar" placeholder="Enter your pic url" />
    <button onclick="addUser()">Add User</button>
 </div>
<section class="user-list"></section>`
async function getAllUser(){
    const data=await fetch("https://6166c4df13aa1d00170a6706.mockapi.io/users/");
    const user=await data.json();
    const userContainer=document.querySelector(".user-list");
    userContainer.innerHTML="";
    user.forEach((user)=>{
        userContainer.innerHTML+=`
        <div class="user-container">
        <i class="fab fa-audible fa-2x"></i>
        <img class="user-avatar" src="${user.avatar}" alt=${user.name} />
        <div>
        <p class="user-name">${user.name}</p>
        <button onclick="editUser(${user.id})">Edit</button>
        <button onclick="deleteUser(${user.id})">Delete</button>
        <div class="edit-user-form edit-${user.id}">
           <input value="${user.name}" class="edit-${user.id}-user-name" placeholder="Enter your name" />
           <input value="${user.avatar}" class="edit-${user.id}-user-avatar" placeholder="Enter your avatar url:" />
           <button onclick="saveUser(${user.id})">Save</button>
           </div>
           </div>
        </div>`;
    });
    console.log(user);
}
getAllUser();
async function addUser(){
    console.log("Adding...");
    const name=document.querySelector(".add-user-name").value;
    const avatar=document.querySelector(".add-user-avatar").value;
    const data=await fetch(
        "https://6166c4df13aa1d00170a6706.mockapi.io/users/",
        {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({name:name,avatar:avatar}),
        }
    );
      getAllUser(); 
}
async function editUser(userId){
   console.log("Editing User...");
   const editUserForm=document.querySelector(`.edit-${userId}`);
   editUserForm.style.display = editUserForm.style.display === "block" ? "none" : "block";
}

async function saveUser(userId){
    console.log("Editing and Saving...",userId);
    const userName=document.querySelector(`.edit-${userId}-user-name`).value;
    const userAvatar=document.querySelector(`.edit-${userId}-user-avatar`).value;
    const data=await fetch(        
        "https://6166c4df13aa1d00170a6706.mockapi.io/users/" +userId,
        {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({name:userName,avatar:userAvatar})
        }
    );   
    getAllUser();
}
async function deleteUser(userId){
    const data=await fetch("https://6166c4df13aa1d00170a6706.mockapi.io/users/" +userId,{method:"DELETE"});
    getAllUser();
}
