const library = {

  bible: [
    {
      title: "John 3:16",
      text: "For God so loved the world...",
      category: "Bible"
    },
    {
      title: "Psalm 23:1",
      text: "The Lord is my shepherd...",
      category: "Bible"
    },
    {
      title: "Jeremiah 29:11",
      text: "For I know the plans I have for you...",
      category: "Bible"
    }
  ],

  songs: [
    {
      title: "Amazing Grace",
      text: "Amazing Grace",
      category: "Song"
    },
    {
      title: "Worship Song",
      text: "Your worship lyrics go here.",
      category: "Song"
    }
  ],

  slides: [
    {
      title: "Welcome",
      text: "Welcome to our service!",
      category: "Slide"
    },
    {
      title: "Sunday Service",
      text: "Welcome to Sunday Worship",
      category: "Slide"
    }
  ],

  media: [
    {
      title: "Opening Video",
      text: "Video file",
      category: "Media"
    }
  ],

  announcements: [
    {
      title: "Youth Meeting",
      text: "Youth meeting this Friday.",
      category: "Announcement"
    }
  ]

};


let currentItems = [];
let currentPreview = null;


/* SHOW CATEGORY */

function showCategory(category) {

  currentItems = library[category];

  document.getElementById("categoryTitle").textContent =
    category.charAt(0).toUpperCase() + category.slice(1);

  renderItems(currentItems);
}


/* DISPLAY ITEMS */

function renderItems(items) {

  const container = document.getElementById("items");

  container.innerHTML = "";

  items.forEach((item, index) => {

    const div = document.createElement("div");

    div.className = "item";

    div.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    `;

    div.onclick = () => previewItem(item);

    container.appendChild(div);

  });

}


/* PREVIEW */

function previewItem(item) {

  currentPreview = item;

  document.getElementById("previewScreen").innerHTML = `
    <h1>${item.title}</h1>
    <p>${item.text}</p>
  `;

}


/* GO LIVE */

function goLive() {

  if (!currentPreview) {
    alert("Select a slide first.");
    return;
  }

  document.getElementById("liveContent").innerHTML = `
    <h1>${currentPreview.title}</h1>
    <p>${currentPreview.text}</p>
  `;

  document.getElementById("liveScreen")
    .classList.add("active");

}


/* CLOSE LIVE */

function closeLive() {

  document.getElementById("liveScreen")
    .classList.remove("active");

}


/* SEARCH */

function searchItems() {

  const query =
    document.getElementById("search").value.toLowerCase();

  const filtered = currentItems.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.text.toLowerCase().includes(query)
  );

  renderItems(filtered);

}
