const url = "https://dog.ceo/api/breeds/image/random";

const fetchData = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch dog data:", error);
    return null;
  }
};

async function cutedogs() {
  const listSection = document.getElementById("appID");
  listSection.innerHTML = "";

  const data = await fetchData();
  if (data && data.message) {
    const dogs = document.createElement("img");
    dogs.src = data.message;
    listSection.appendChild(dogs);
  } else {
    listSection.innerHTML = "<p>Could not load a dog image offline.</p>";
  }
}

cutedogs();
