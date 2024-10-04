// 1 - Fetch, Load and show categories on html

// time section 
function getTimeString(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
}

// remove active btn class 
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn");
    for (let btn of buttons) {
        btn.classList.remove("bg-blue-500")
    }
}


// create loadCategories
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error));

};

// load video
const loadVideos = (searchText = "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then((res) => res.json())
        .then((data) => displayVideos(data.videos))
        .catch((error) => console.log(error))
};

// button click section 
const loadCategoryVideos = (id) => {
    // alert (id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            removeActiveClass();
            const activeBtn = document.getElementById(`btn-${id}`);
            // console.log(activeBtn);
            activeBtn.classList.add("bg-blue-500");
            displayVideos(data.category);
        })
        .catch((error) => console.log(error))
};

// loadDetails btn 
const loadDetails =async (videoId) => {
    // console.log(videoId);
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(uri);
    const data = await res.json();
    // console.log(data);
    displayDetails(data.video)
};

// displayDetails section 
const displayDetails = (video) => {
    // console.log(video);
    const detailContainer = document.getElementById("modal-content");

    detailContainer.innerHTML = `
    <img class="w-full" src=${video.thumbnail}/>
    <p>${video.description}</p>
    `

    // way 1
    // document.getElementById("showModalData").click();
    // way 2
    document.getElementById("customModal").showModal();

};

// display videos

// const cardDemo = {
//     "category_id": "1001",
//     "video_id": "aaag",
//     "thumbnail": "https://i.ibb.co/DRxB1Wm/sunris.jpg",
//     "title": "Sunrise Reverie",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/yQFJ42h/ava.jpg",
//             "profile_name": "Ava Johnson",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "1.1K",
//         "posted_date": "16950"
//     },
//     "description": "'Sunrise Reverie' by Ava Johnson takes listeners on a serene journey through tranquil melodies and soft harmonies. With 1.1K views, this track is perfect for morning relaxation or an evening wind-down. Ava's heartfelt lyrics and soothing voice create a sense of peace, making it a go-to for fans seeking calm and inspiration in their musical choices."
// }


const displayVideos = (videos) => {
    // console.log(videos)
    const videoContainer = document.getElementById("videos");

    videoContainer.innerHTML = "";

    // no content section 
    if (videos.length == 0) {
        videoContainer.innerHTML = "NO CONTENT SECTION";
        return;
    }

    videos.forEach((video) => {
        // console.log(video)
        const card = document.createElement("div");
        card.classList = "card card-compact "
        card.innerHTML = `
         <figure class="h-[200px] relative">
          <img class="w-full h-full object-cover"
           src=${video.thumbnail}
          alt="Shoes" />
         ${video.others.posted_date == false ? " " : `<p class="text-white bg-black bg-opacity-80 right-2 bottom-2 p-1 px-2 rounded absolute">${getTimeString(video.others.posted_date)}</p>`}
         
         </figure>
        <div class="px-0 py-2 flex gap-2 w-full">
             <div class=" flex">
              <figure >
                 <img class="w-10 h-10 rounded-full "
                 src=${video.authors[0].profile_picture}
                 alt="Shoes" />
              </figure>
             </div>
             <div class=" flex flex-col ">
                <h2 class=" font-bold">${video.title}</h2>
                <div class=" flex items-center gap-2 ">
                     <p class="text-gray-400">${video.authors[0].profile_name}</p>
                     ${video.authors[0].verified == true ? ' <img class="w-5" src="https://img.icons8.com/?size=100&id=SRJUuaAShjVD&format=png&color=000000" />' : " "}
                </div>
                <p class="text-gray-400">${video.others.views} views</p>
                <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">Details</button>
             </div>
        </div>
        `

        // console.log(video.authors);
        videoContainer.appendChild(card)
    });
}

// categories displayCategories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");

    categories.forEach(item => {
        // console.log(item); 
        // const button = document.createElement("button");
        const buttonContainer = document.createElement("div");
        // button.classList = "btn";
        // button.innerText = item.category;
        buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">${item.category}</button>
        `

        // add button to category container
        categoryContainer.appendChild(buttonContainer);
    });
};


document.getElementById("search-input").addEventListener("keyup", (e) =>{
    loadVideos(e.target.value)
});
loadCategories();
loadVideos();