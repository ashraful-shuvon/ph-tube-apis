const removeActiveClass = () => {
  const activeButtons = document.getElementsByClassName("active");

  for (const btn of activeButtons) {
    btn.classList.remove("active");
  }
};

const loadCatagories = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/phero-tube/categories"
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();

    displayCatagories(data.categories);
  } catch (error) {
    console.error("Error loading categories:", error);
  }
};

const loadVideos = async (searchText = "") => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    removeActiveClass();
    document.getElementById("btn-all").classList.add("active");
    displayVideos(data.videos);
  } catch (error) {
    console.error("Error loading categories:", error);
  }
};

const loadDetails = async (videoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  try {
    const res = await fetch(url);
    const data = await res.json();

    displayDescription(data.video);
    // console.log(data.video.description);
  } catch (error) {
    console.error("Error loading: ", error);
  }
};

const loadCatagoryVideos = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  //   console.log(url);

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    // console.log(data.categories);
    removeActiveClass();
    const clickedButton = document.getElementById(`btn-${id}`);
    // console.log(clickedButton);
    clickedButton.classList.add("active");
    displayVideos(data.category);
  } catch (error) {
    console.error("Error loading categories:", error);
  }
};

const displayCatagories = (categories) => {
  const div = document.getElementById("cat-container");

  for (let cat of categories) {
    // console.log(cat);
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button id="btn-${cat.category_id}" onclick = "loadCatagoryVideos(${cat.category_id})" class="btn btn-sm px-5 hover:bg-red-500 hover:text-white">${cat.category}</button>
    `;

    div.appendChild(buttonContainer);
  }
};

const displayVideos = (videos) => {
  const videosContainer = document.getElementById("videos-container");
  videosContainer.innerHTML = " ";

  if (videos.length == 0) {
    return (videosContainer.innerHTML = `
        <div class="col-span-4 flex flex-col justify-center items-center py-20 gap-6">
            <img src="./assets/Icon.png" alt="">
            <h2 class=" text-center text-3xl">Oops!! Sorry, There is no content here</h2>
        </div>
        `);
  }
  videos.forEach((video) => {
    // console.log(video);

    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
    <div class="flex flex-col items-center justify-center">
      <div class="card bg-base-100 w-80">
            <figure class="relative">
                <img class=" w-full h-40 object-cover" src="${
                  video.thumbnail
                }" alt="Shoes" />
                <span class="absolute bottom-5 right-5 bg-black text-white text-xs py-1 px-2 rounded-md"> 3 hours 58
                    mins</span>
            </figure>
            <div class="flex gap-5 py-4">
                <div id="profile ">
                    <div class="avatar ">
                        <div class="w-10 rounded-full">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                </div>
                <div id="intro">
                    <h2 class="card-title">${video.title}</h2>
                    <p class="flex text-gray-500 gap-2 text-sm items-center">${
                      video.authors[0].profile_name
                    } ${
      video.authors[0].verified == true
        ? `<span><img class="w-4 h-4"
                                src="https://img.icons8.com/?size=100&id=36872&format=png&color=228BE6" alt=""></span>`
        : ` `
    }
                
                    </p>
                    <p class="text-gray-500 text-sm">${
                      video.others.views
                    } views</p>
                </div>
            </div>
        </div>
        <button onclick = "loadDetails('${
          video.video_id
        }')" class="btn btn-block">Show details</button>
    </div>`;
    videosContainer.appendChild(videoCard);
  });
};

const displayDescription = (description) => {
  // console.log(description);
  document.getElementById("display_descripsion").showModal();
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
      
    <div class="flex flex-col items-center justify-center">
        <div class="card bg-base-100 lg:w-96 pb-10">
            <figure class="relative">
                <img class=" w-full h-40 object-cover" src="${description.thumbnail}" alt="Shoes" />
                <span class="absolute bottom-5 right-5 bg-black text-white text-xs py-1 px-2 rounded-md"> 3 hours 58
                    mins</span>
            </figure>
            <div class="flex gap-5 py-4">
                <div id="profile ">
                    <div class="avatar ">
                        <div class="w-10 rounded-full">
                            <img src="${description.authors[0].profile_picture}" />
                        </div>
                    </div>
                </div>
                <div id="intro">
                    <h2 class="card-title">${description.title}</h2>
                    <p class="flex text-gray-500 gap-2 text-sm items-center">${description.authors[0].profile_name}
                        <span><img class="w-4 h-4"
                                src="https://img.icons8.com/?size=100&id=36872&format=png&color=228BE6" alt=""></span>
                    </p>
                    <p class="text-gray-500 text-sm">${description.others.views} views</p>
                </div>
            </div>
            <p class="text-gray-500 text-sm">${description.description}</p>

        </div>
        <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
        </form>
    </div>`;
};

document.getElementById("search-input").addEventListener("keyup", (e) => {
  const input = e.target.value;
  loadVideos(input);
});
// loadVideos();
loadCatagories();
