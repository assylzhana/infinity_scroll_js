const accessKey = 'YcLaH2XAeb2_u8b2zvnjZfBcSCQhT5zwQQQvdYv0Qf4';
const imageContainer = document.querySelector('.post-page__wrapper');
let imageUrl = null;
let isCooldown = false;
let scrollTimeout;

function addPost() {
    const div = document.createElement('div');
    div.classList.add('post-page');
    div.innerHTML =
        `
        <div id="image-container">
            <img id="image" src="${imageUrl}" alt="Unsplash Image" width="100%" height="300px">
        </div>
        <h1>Title</h1>
        <p>Description</p>
        <button>Submit</button>
        `;
    imageContainer.appendChild(div);
}

async function getRandomImage() {
    try {
        const response = await fetch('https://api.unsplash.com/photos/random?client_id=' + accessKey);
        const data = await response.json();
        imageUrl = data.urls.regular;
        addPost();
    } catch (error) {
        console.error(error);
        alert('Failed to fetch a random image.');
    }
}

function loadMoreImages(count) {
    if (isCooldown) {
        return;
    }
    isCooldown = true;

    const fetchPromises = [];

    for (let i = 0; i < count; i++) {
        fetchPromises.push(getRandomImage());
    }

    Promise.all(fetchPromises).then(() => {
                isCooldown = false;
            });
}

window.addEventListener("scroll", function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => loadMoreImages(3), 200);
    }
});

loadMoreImages(3);
