const url = "https://dog.ceo/api/breeds/image/random"
const fetchData = async () => {
const response = await fetch(url);
  return response.json();
};

async function cutedogs(){
    const listSection = document.getElementById("appID");
    listSection.innerHTML = "";
    const data = await fetchData()
    const dogs = document.createElement("img")
    dogs.src = data.message
    listSection.appendChild(dogs)
}
cutedogs()

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((error) => {
      console.error("Service worker registration failed:", error);
    });
  });
}
