console.log('%c HI', 'color: firebrick')
document.addEventListener("DOMContentLoaded", function() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const imageContainer = document.querySelector("#dog-image-container");
    const breedList = document.querySelector("#dog-breeds");
    const filterDropdown = document.querySelector("#breed-dropdown");

    // Challenge 1: Fetch and Display Dog Images
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            const images = data.message;
            images.forEach(imageUrl => {
                const img = document.createElement("img");
                img.src = imageUrl;
                img.alt = "dog";
                imageContainer.appendChild(img);
            });
        })
        .catch(error => console.log("Error fetching dog images:", error));

    // Challenge 2: Fetch and Display Dog Breeds
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            const breeds = Object.keys(data.message);
            breeds.forEach(breed => {
                const li = document.createElement("li");
                li.textContent = breed;
                breedList.appendChild(li);
            });
        })
        .catch(error => console.log("Error fetching dog breeds:", error));

    // Challenge 3: Change Font Color on Click
    breedList.addEventListener("click", function(event) {
        if (event.target.tagName === "LI") {
            event.target.style.color = "blue"; // Change color to blue (or any color you choose)
        }
    });

    // Challenge 4: Implement Breed Filtering
    filterDropdown.addEventListener("change", function(event) {
        const selectedLetter = event.target.value;

        // Clear current list
        while (breedList.firstChild) {
            breedList.removeChild(breedList.firstChild);
        }

        // Filter and display breeds starting with selected letter
        fetch(breedUrl)
            .then(response => response.json())
            .then(data => {
                const breeds = Object.keys(data.message);
                breeds.forEach(breed => {
                    if (breed.startsWith(selectedLetter)) {
                        const li = document.createElement("li");
                        li.textContent = breed;
                        breedList.appendChild(li);
                    }
                });
            })
            .catch(error => console.log("Error fetching dog breeds:", error));
    });
});
