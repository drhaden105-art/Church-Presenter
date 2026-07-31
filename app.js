/* ========================================
   CHURCHPRESENTER V2
======================================== */


/* LIBRARY */

const library = {

  bible: [

    {
      icon: "📖",
      title: "John 3:16",
      text: "For God so loved the world...",
      category: "Bible"
    },

    {
      icon: "📖",
      title: "Psalm 23:1",
      text: "The Lord is my shepherd...",
      category: "Bible"
    },

    {
      icon: "📖",
      title: "Jeremiah 29:11",
      text: "For I know the plans I have for you...",
      category: "Bible"
    },

    {
      icon: "📖",
      title: "Romans 8:28",
      text: "All things work together for good...",
      category: "Bible"
    }

  ],


  songs: [

    {
      icon: "🎵",
      title: "Amazing Grace",
      text: "Amazing grace, worship song",
      category: "Song"
    },

    {
      icon: "🎵",
      title: "Great Is Thy Faithfulness",
      text: "Worship song",
      category: "Song"
    },

    {
      icon: "🎵",
      title: "Sunday Worship",
      text: "Church worship lyrics",
      category: "Song"
    }

  ],


  slides: [

    {
      icon: "🖼️",
      title: "Welcome",
      text: "Welcome to our service!",
      category: "Slide"
    },

    {
      icon: "🖼️",
      title: "Sunday Service",
      text: "Welcome to Sunday Worship",
      category: "Slide"
    },

    {
      icon: "🖼️",
      title: "Offering",
      text: "Giving and offering",
      category: "Slide"
    }

  ],


  media: [

    {
      icon: "🎬",
      title: "Opening Video",
      text: "Church opening video",
      category: "Media"
    },

    {
      icon: "🎬",
      title: "Motion Background",
      text: "Moving background",
      category: "Media"
    }

  ],


  announcements: [

    {
      icon: "📢",
      title: "Youth Meeting",
      text: "Youth meeting this Friday.",
      category: "Announcement"
    },

    {
      icon: "📢",
      title: "Church Anniversary",
      text: "Join us for our anniversary.",
      category: "Announcement"
    }

  ]

};


/* VARIABLES */

let currentCategory = "bible";

let currentItems = [];

let currentPreview = null;

let playlist = [];


/* CATEGORY INFORMATION */

const descriptions = {

  bible:
    "Search and add Scripture to your service.",

  songs:
    "Manage worship songs and lyrics.",

  slides:
    "Presentation slides for your service.",

  media:
    "Videos and media backgrounds.",

  announcements:
    "Church announcements and notices."

};


/* START */

showCategory("bible");


/* SHOW CATEGORY */

function showCategory(category) {

  currentCategory = category;

  currentItems = library[category];

  document.getElementById(
    "categoryTitle"
  ).textContent =
    capitalize(category);

  document.getElementById(
    "categoryDescription"
  ).textContent =
    descriptions[category];

  document.getElementById(
    "search"
  ).value = "";

  renderItems(currentItems);

}


/* CAPITALIZE */

function capitalize(text) {

  return text.charAt(0).toUpperCase()
    + text.slice(1);

}


/* RENDER */

function renderItems(items) {

  const container =
    document.getElementById("items");

  container.innerHTML = "";


  if (items.length === 0) {

    container.innerHTML = `
      <div class="empty-playlist">
        No results found.
      </div>
    `;

    return;

  }


  items.forEach(item => {

    const div =
      document.createElement("div");

    div.className = "item";


    div.innerHTML = `

      <div class="item-icon">
        ${item.icon}
      </div>

      <h3>
        ${item.title}
      </h3>

      <p>
        ${item.text}
      </p>

    `;


    div.onclick = () => {

      document
        .querySelectorAll(".item")
        .forEach(x =>
          x.classList.remove("selected")
        );

      div.classList.add("selected");

      previewItem(item);

    };


    container.appendChild(div);

  });

}


/* PREVIEW */

function previewItem(item) {

  currentPreview = item;


  document.getElementById(
    "previewScreen"
  ).innerHTML = `

    <div class="preview-title">
      ${item.title}
    </div>

    <div class="preview-subtitle">
      ${item.text}
    </div>

  `;


  document.getElementById(
    "previewTitle"
  ).textContent =
    item.title;


  document.getElementById(
    "previewText"
  ).textContent =
    item.text;

}


/* ADD TO PLAYLIST */

function addCurrentToPlaylist() {

  if (!currentPreview) {

    alert(
      "Select an item first."
    );

    return;

  }


  playlist.push({

    ...currentPreview

  });


  renderPlaylist();

}


/* RENDER PLAYLIST */

function renderPlaylist() {

  const container =
    document.getElementById("playlist");


  document.getElementById(
    "playlistCount"
  ).textContent =
    playlist.length +
    (playlist.length === 1
      ? " item"
      : " items");


  container.innerHTML = "";


  if (playlist.length === 0) {

    container.innerHTML = `
      <div class="empty-playlist">
        Your service playlist is empty.
      </div>
    `;

    return;

  }


  playlist.forEach((item, index) => {

    const div =
      document.createElement("div");

    div.className =
      "playlist-item";


    div.innerHTML = `

      <strong>
        ${index + 1}. ${item.title}
      </strong>

      <small>
        ${item.category}
      </small>

      <div class="playlist-controls">

        <button onclick="moveUp(event, ${index})">
          ▲
        </button>

        <button onclick="moveDown(event, ${index})">
          ▼
        </button>

        <button onclick="removeItem(event, ${index})">
          ✕
        </button>

      </div>

    `;


    div.onclick = () => {

      previewItem(item);

    };


    container.appendChild(div);

  });

}


/* MOVE UP */

function moveUp(event, index) {

  event.stopPropagation();

  if (index === 0) return;


  const temp =
    playlist[index - 1];

  playlist[index - 1] =
    playlist[index];

  playlist[index] =
    temp;


  renderPlaylist();

}


/* MOVE DOWN */

function moveDown(event, index) {

  event.stopPropagation();

  if (
    index ===
    playlist.length - 1
  ) return;


  const temp =
    playlist[index + 1];

  playlist[index + 1] =
    playlist[index];

  playlist[index] =
    temp;


  renderPlaylist();

}


/* REMOVE */

function removeItem(event, index) {

  event.stopPropagation();

  playlist.splice(index, 1);

  renderPlaylist();

}


/* CLEAR */

function clearPlaylist() {

  if (playlist.length === 0)
    return;


  if (
    confirm(
      "Clear the entire service playlist?"
    )
  ) {

    playlist = [];

    renderPlaylist();

  }

}


/* SEARCH */

function searchLibrary() {

  const query =
    document.getElementById(
      "search"
    ).value.toLowerCase();


  const filtered =
    currentItems.filter(item =>

      item.title
        .toLowerCase()
        .includes(query)

      ||

      item.text
        .toLowerCase()
        .includes(query)

    );


  renderItems(filtered);

}


/* GO LIVE */

function goLive() {

  if (!currentPreview) {

    alert(
      "Select something to display."
    );

    return;

  }


  document.getElementById(
    "liveContent"
  ).innerHTML = `

    <h1>
      ${currentPreview.title}
    </h1>

    <p>
      ${currentPreview.text}
    </p>

  `;


  document
    .getElementById("liveScreen")
    .classList.add("active");

}


/* CLOSE LIVE */

function closeLive() {

  document
    .getElementById("liveScreen")
    .classList.remove("active");

}


/* SAVE PLAYLIST */

function savePlaylist() {

  localStorage.setItem(
    "churchPresenterPlaylist",
    JSON.stringify(playlist)
  );


  alert(
    "Service playlist saved!"
  );

}


/* LOAD PLAYLIST */

function loadPlaylist() {

  const saved =
    localStorage.getItem(
      "churchPresenterPlaylist"
    );


  if (!saved) {

    alert(
      "No saved service found."
    );

    return;

  }


  playlist =
    JSON.parse(saved);


  renderPlaylist();


  alert(
    "Service playlist loaded!"
  );

}
