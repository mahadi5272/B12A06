const mainContainer = document.getElementById("mainContainer");
const leftContainer = document.getElementById("leftContainer");
const rightContainer = document.getElementById("rightContainer");

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
          <h1>${deta.name}</h1>
          <p>${deta.description}</p>
          <div class="info">
            <p class ="info1">${deta.category}</p>
            <p>${deta.price}</p>
          </div>
          <button>Add to Cart</button>
          </div>
        `;
    mainContainer.append(div);
  });
};
// hestry side
  mainContainer.addEventListener("click",(e)=>{
    if(e.target.innerText==="Add to Cart"){
      console.log(e.target.parentNode.children)
      const price = e.target.parentNode.children[3];
      const id = e.target.parentNode.id;

      bookmarks.push({
        price:price,
        id:id
      })
      console.log(bookmarks)

    }
  })

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
    li.addEventListener("click",()=>{
      desplayNewsCatagory(cat.id)
      console.log(cat.id)
    })
  });
  leftContainer.appendChild(ul);
};

// catagory ta click korle ei function call hobe!
const desplayNewsCatagory = (id)=>{
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
  .then((res)=>res.json())
  .then((catagoryplant)=>{
    showContainer(catagoryplant.plants)
  })
}
// catagory function
const showContainer =(catagoryplants)=>{
  mainContainer.innerHTML="";
    catagoryplants.forEach((plant) => {
    const div = document.createElement("div");
    div.classList.add("data-card");
    div.innerHTML = `
        <div  id ="${plant.id}">
          <img src="${plant.image}" alt="">
          <h1>${plant.name}</h1>
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

}



