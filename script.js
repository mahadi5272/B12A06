const mainContainer = document.getElementById("mainContainer");
const leftContainer = document.getElementById("leftContainer");
const rightContainer = document.getElementById("rightContainer");
const maincount = document.getElementById("count")
let totalCount = 0
let bookmarks = [];
let allDatas = [];
// main continer
fetch("https://openapi.programming-hero.com/api/plants")
  .then((res) => res.json())
  .then((deta) => {
    allDatas = deta.plants;
    showDataMainContainer(allDatas);
  });

const showDataMainContainer = (allDatas) => {
  mainContainer.innerHTML = "";
  allDatas.forEach((deta) => {
    const div = document.createElement("div");
    div.classList.add("data-card");
    div.innerHTML = `
        <div  id ="${deta.id}">
          <img src="${deta.image}" alt="">
          <h1 onclick ="showDisplayModal(${deta.id})" id =${deta.id}>${deta.name}</h1>
          <p>${deta.description}</p>
          <div class="info">
            <p class ="info1">${deta.category}</p>
            <p>${deta.price}</p>
          </div>
          <button id ="countset">Add to Cart</button>
          </div>
        `;
    mainContainer.append(div);
  });
};
// modal
const showDisplayModal = async(id)=>{
  const url =`https://openapi.programming-hero.com/api/plant/${id}`
  const res = await fetch(url)
  const ditals = await res.json()
  displayModal(ditals.plants)
}

// displayModal
  const displayModal=(modalPlants)=>{
    console.log(modalPlants)
    const boxModel = document.getElementById("DetailsContainer");
    boxModel.innerHTML=`
         <div  id ="${modalPlants.id}">
          <img src="${ modalPlants.image}" alt="">
          <h1>${ modalPlants.name}</h1>
          <p>${ modalPlants.description}</p>
          <p class ="info1">${ modalPlants.category}</p>
          <p>${modalPlants.price}</p>
         
    `;
    document.getElementById("my_modal_5").showModal()

  }



// Right side
mainContainer.addEventListener("click", (e) => {
  if (e.target.innerText === "Add to Cart") {
    const price = e.target.parentNode.children[3].innerText
    const priceNum = parseInt(e.target.parentNode.querySelector(`.info p:nth-child(2)`).innerText)
    // const priceNum = parseInt(e.target.parentNode.querySelector())
    const id = e.target.parentNode.id;

    bookmarks.push({
      price: price,
      id: id,
    });
    showHestory(bookmarks);
    showCount(priceNum)
  }
});
// count ee jog kora
    const showCount = (priceNum)=>{
      totalCount+= priceNum
      maincount.innerText = totalCount
}


const showHestory = (bookmarks) => {
  rightContainer.innerHTML = "";
  bookmarks.forEach((bookmark) => {
    const div = document.createElement("div");
    div.classList.add("history-item");
    div.innerHTML = `
      
        <p >${bookmark.price}</p>
        <button id ="deletCart">delet</button>
      
      `;
    rightContainer.appendChild(div);

  });
};

// const hendelDelete = (deletId) => {
//   // delete count hendel
//   const deleteItem = bookmarks.find(bookmark => bookmark.id === deletId)
//   console.log(deleteItem)
  
//   if(deleteItem.price){
//     const parts = deleteItem.price.split("\n\n");
//     const priceOnly = parseInt(parts[1])
//     console.log(parts)
//     totalCount -= priceOnly
//     maincount.innerText = totalCount
//   }


//   const filterBookmurks = bookmarks.filter(
//     (bookmark) => bookmark.id !== deletId
//   );
//   bookmarks = filterBookmurks;
  
//   showHestory(bookmarks);
// };
rightContainer.addEventListener("click",(e)=>{
  if(e.target.id === 'deletCart'){
    // তুমি bookmarks array update করছো না। মানে: bookmark list এ সেই item এখনও থেকে যায়, যদিও UI থেকে remove হয়ে গেছে। যদি কোনো future logic bookmarks array থেকে price বা items নিয়ে আসে, তাহলে mismatch হতে পারে।
    const index = bookmarks.findIndex(b=>b.id === e.target.parentNode.id)
    if(index!==-1){
      bookmarks.splice(index,1)
    }

    // obaedullah migi
    const cart = e.target.parentNode
    const removePrice = cart.children[0].innerText
    const priceOnly = parseInt(removePrice.replace(/\D/g,""));

    if(!isNaN(priceOnly)){
      totalCount-=priceOnly;
      maincount.innerText=totalCount
    }
    cart.remove();
    
  }
  
})

// cartContainer.addEventListener('click', (e) => {

//     if (e.target.id === 'cross-btn') {
//         const cart = e.target.parentNode.parentNode
//         const removePrice = Number(cart.children[0].children[1].innerText)
//         TotalPrice -= removePrice;
//         document.getElementById('totalPrice').innerText = TotalPrice
//         cart.remove();
//     }

// })


// left container
fetch("https://openapi.programming-hero.com/api/categories")
  .then((res) => res.json())
  .then((data) => {
    showDataLeftContainer(data.categories);
  });

const showDataLeftContainer = (catagorys) => {
  leftContainer.innerHTML = "";
  const ul = document.createElement("ul");
  catagorys.forEach((cat) => {
    const li = document.createElement("li");
    li.classList.add("li-hover");
    li.style.listStyle = "none";
    li.textContent = cat.category_name;

    ul.appendChild(li);
    li.addEventListener("click", () => {
      desplayNewsCatagory(cat.id);
     
    });
  });
  leftContainer.appendChild(ul);

  leftContainer.addEventListener("click",(e)=>{
    const allLi = document.querySelectorAll("li");
    allLi.forEach(li=>{
      li.classList.remove("bg-green-700")
    })
    if(e.target.localName === "li"
){
  e.target.classList.add("bg-green-700")
}
  })
};

// catagory ta click korle ei function call hobe!
const desplayNewsCatagory = (id) => {
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((catagoryplant) => {
      showContainer(catagoryplant.plants);
    });
};
// catagory function
const showContainer = (catagoryplants) => {
  mainContainer.innerHTML = "";
  catagoryplants.forEach((plant) => {
    const div = document.createElement("div");
    div.classList.add("data-card");
    div.innerHTML = `
        <div id ="${plant.id}">
          <img src="${plant.image}" alt="">
          <h1 onclick ="showDisplayModal(${plant.id})" id =${plant.id}>${plant.name}</h1>
          <p>${plant.description}</p>
          <div class="info">
            <p class ="info1">${plant.category}</p>
            <p>${plant.price}</p>
          </div>
          <button>Add to Cart</button>
          </div>
        `;
    mainContainer.append(div);
  });

  //   mainContainer.innerHTML="";
  //   const div = document.createElement("div");
  //   div.innerHTML+=`

  //     <img src="${catagoryplants[2].image
  // }" alt="">
  //   `
  //   mainContainer.append(div)

  // catagoryplant.forEach(plant=>{
  //     mainContainer.innerHTML = "";
  // const div = document.createElement("div");
  //   div.textContent = plant;

  //   mainContainer.appendChild(div);
  // })
};
