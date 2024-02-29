const btnContainer = document.getElementById("btn-container");
const videoContainer = document.getElementById("video-container");
const noContentFount = document.getElementById("no-content-found");

const getAllCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );

  const { data } = await res.json();

  data.forEach((btn) => {
    const newBtn = document.createElement("button");
    newBtn.className = "btn text-xl px-8";
    newBtn.innerText = btn.category;

    newBtn.addEventListener("click", () => getDataByCategory(btn.category_id));

    btnContainer.appendChild(newBtn);
  });
};

const getDataByCategory = async (categoryId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );

  const { data } = await res.json();

  videoContainer.innerHTML = "";

  if (data.length === 0) {
    noContentFount.classList.remove("hidden");
  } else {
    noContentFount.classList.add("hidden");
  }

  data.forEach((video) => {
    const newCard = document.createElement("div");
    newCard.classList = "card w-96 bg-base-100 border-2 cursor-pointer";

    newCard.innerHTML = `
    <figure>
      <img
        src="${video.thumbnail}"
        alt="Shoes"
        class="w-full h-52 object-cover"
      />
    </figure>
    <div class="card-body">
      <div class="flex items-center  gap-4">
        <img src="${
          video.authors[0].profile_picture
        }" alt="person" class="object-cover w-16 h-16 rounded-full" />
        <div>
        <h2 class="text-[#171717] font-bold">
         ${video.title}
        </h2>

        <div class="flex items-center text-gray-500 text-lg gap-2">
        <h5>${video.authors[0].profile_name}</h5>

        ${video.authors[0].verified ? '<img src="./img/v.png" alt="v" />' : ""}
        
      </div>
      <h5 class="text-gray-500">${video.others.views} views</h5>
      </div>
      </div>
    </div>
    `;

    videoContainer.appendChild(newCard);
  });
};

getAllCategory();
getDataByCategory("1000");
