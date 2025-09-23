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

const loadVideos = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/phero-tube/videos"
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    displayVideos(data.videos);
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
    <button class="btn btn-sm px-5 hover:bg-red-500 hover:text-white">${cat.category}</button>
    `;

    div.appendChild(buttonContainer);
  }
};

const displayVideos = (videos) => {
  const videosContainer = document.getElementById("videos-container");

  videos.forEach((video) => {
    console.log(video);

    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
    <div class="flex items-center justify-center">
      <div class="card bg-base-100 w-80">
            <figure class="relative">
                <img class=" w-full h-40 object-cover" src="${video.thumbnail}" alt="Shoes" />
                <span class="absolute bottom-5 right-5 bg-black text-white text-xs py-1 px-2 rounded-md"> 3 hours 58
                    mins</span>
            </figure>
            <div class="flex gap-5 py-4">
                <div id="profile ">
                    <div class="avatar ">
                        <div class="w-10 rounded-full">
                            <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                        </div>
                    </div>
                </div>
                <div id="intro">
                    <h2 class="card-title">${video.title}</h2>
                    <p class="flex text-gray-500 gap-2 text-sm items-center">${video.authors[0]} <span><img class="w-4 h-4"
                                src="https://img.icons8.com/?size=100&id=36872&format=png&color=228BE6" alt=""></span>
                    </p>
                    <p class="text-gray-500 text-sm">91K views</p>
                </div>
            </div>
        </div>
    </div>`;
    videosContainer.appendChild(videoCard);
  });
};
loadVideos();
loadCatagories();
