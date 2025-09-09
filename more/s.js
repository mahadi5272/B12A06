const categoriesContainer = document.getElementById("nav-ul");
const newsContainer = document.getElementById("newsContainer");
const boomkmarkContainer = document.getElementById("bookmarkContainer")
const bookmarkCount = document.getElementById("showBookmarkCount")
let bookmarks = [];
const categoray = () => {
  const data = fetch("https://news-api-fs.vercel.app/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      showCategories(categories);
      
    if(categories.length>0){
      loadNewsByCategories(categories[0].id)
    }
    });

};

const showCategories = (categories) => {
   

  categories.forEach((cat) => {
    categoriesContainer.innerHTML += `<li id="${cat.id}" class="hover:border-b-4 border-red-600">${cat.title}</li>`;
  });

  categoriesContainer.addEventListener("click", (e) => {
    const liAll = document.querySelectorAll("li");
    liAll.forEach((li) => {
      li.classList.remove("border-b-4");
    });

    if (e.target.localName === "li") {
    
      e.target.classList.add("border-b-4");

      loadNewsByCategories(e.target.id);
    }
  });


};
  const loadNewsByCategories = (categoryId) => {
    // console.log(categoryId)
    fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        
        showCategoriesArticles(data.articles);
      });
  };

const showCategoriesArticles = (articles) => {
    
    

    newsContainer.innerHTML="";
  
  articles.forEach((article) => {
     
    newsContainer.innerHTML += `
            <div>
                <div>
                    <img src="${article.image.srcset[5].url}" alt="">
                </div>
                <div id = "${article.id}">
                    <h1>${article.title}</h1>
                    <p>${article.time}</p>
                 <button class="border-1 bg-slate-200 rounded-lg shadow-lg p-1">bookmark</button>
                    
                </div>
            </div>`;
  });
};

 newsContainer.addEventListener("click",function(e){
    
    if(e.target.innerText === "bookmark"){
        
        hendelBookmark(e)
        
    }
 })

 const hendelBookmark = (e)=>{
            const title = e.target.parentNode.children[0].innerText;
        const id = e.target.parentNode.id;
        bookmarks.push({
            title:title,
            id:id
            
        }) 
        showBookmarks(bookmarks)
 }

 const showBookmarks = (bookmarks)=>{
    boomkmarkContainer.innerHTML=""
    bookmarks.forEach(bookmark=>{
        boomkmarkContainer.innerHTML+=`
        <div class= "border-2 border-red-600 shadow-2xl p-3"> 
            <h1>${bookmark.title}</h1>
            <button onclick = "hendelDeleteButton('${bookmark.id}')" class = "bg-red-900 shadow-xl text-white rounded-xl p-1" >Delet</button>
        </div>`
    })
    bookmarkCount.innerText = bookmarks.length
 }

 const hendelDeleteButton = (bookmarkId)=>{
  const filterBookmurks = bookmarks.filter(bookmark=>bookmark.id!==bookmarkId) 
  bookmarks = filterBookmurks
  showBookmarks(bookmarks)
 }
categoray();