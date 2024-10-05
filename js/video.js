//1 fetch, load, and show catagories on html

//created a function to get the video time on the image
function getTime(time) {
  const hour = parseInt(time / 3600);
  let remainingTime = time % 3600;
  const minute = parseInt(remainingTime / 60);
  remainingTime = remainingTime % 60;
  return `${hour} Hrs ${minute} min ${remainingTime} sec ago`;
}
// create loadCatagories function

const loadCatagories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((err) => console.log(err));
};

//create video section
const loadVideos = (searchText = "") => {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((res) => res.json())
    .then((data) => displayVideo(data.videos))
    .catch((err) => console.log(err));
};

//load video details
const loadVideoDetails = async (videoId) => {
  console.log(videoId);
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayVideoDetails(data.video);
};

//display video details
const displayVideoDetails = (video) => {
  console.log(video);
  const detailContainer = document.getElementById("modal-content");
  detailContainer.innerHTML = `
  <img src="${video.thumbnail}" />
  <p>${video.description}</p>
  `;

  //way 1
  document.getElementById("showModalData").click();
};

// create displayVideo
const displayVideo = (videos) => {
  const videoContainer = document.getElementById("video-section");
  videoContainer.innerHTML = "";

  if (videos.length === 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class="flex flex-col gap-5 justify-center items-center">
    <img src="images/Icon.png"/>
    <h2 class="text-red-500 font-bold text-center text-xl">NO CONTENT HERE </h2>
    </div>
    `;
    return;
  } else {
    videoContainer.classList.add("grid");
  }

  videos.forEach((videoss) => {
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
        <figure class="h-[160px] relative">
    <img
      src="${videoss.thumbnail}
      class="h-full w-full object-cover"
      alt="Shoes" />
      ${
        videoss.others.posted_date?.length == 0
          ? ""
          : `<span class="absolute w-30 text-[9px] right-2 bottom-2 p-1 bg-black rounded-lg text-white">${getTime(
              videoss.others.posted_date
            )}</span>`
      }
  </figure>
  <div class="px-0 py-2 flex gap-2">
   <div>
   <img class="w-9 h-9 rounded-full object-cover" src=${
     videoss.authors[0].profile_picture
   } />
   </div>
   <div>
   <h2 class="font-bold">${videoss.title}</h2>
   <div class="flex gap-1 items-center">
   <p class="text-gray-400">${videoss.authors[0].profile_name}</p>
   ${
     videoss.authors[0].verified === true
       ? `<img class="w-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png" />`
       : ""
   }
   </div>
   <p> <button onclick="loadVideoDetails('${
     videoss.video_id
   }')" class="btn btn-sm btn-error">Details</button> </p>
   </div>
  </div>
        `;
    videoContainer.appendChild(card);
  });
};
//remove active class from category button
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

//button onClick function

const loadButtonCategory = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      //remove active class
      removeActiveClass();

      //add active class
      const activeButton = document.getElementById(`btn-${id}`);
      activeButton.classList.add("active");
      displayVideo(data.category);
    }) //displayVideo(data.category)
    .catch((err) => console.log(err));
};

//creat displayCategories
const categoryContainer = document.getElementById("categories");
const displayCategories = (categorie) => {
  categorie.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button id="btn-${item.category_id}" onclick="loadButtonCategory(${item.category_id})" class="btn category-btn">
    ${item.category}
    </button>
    `;

    categoryContainer.append(buttonContainer);
  });
};

document.getElementById("searchVideo").addEventListener("keyup", (e) => {
  loadVideos(e.target.value);
});

loadCatagories();
loadVideos();
