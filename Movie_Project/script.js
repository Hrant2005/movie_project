const videoContent = document.getElementById('video-content');
const searchButton = document.getElementById('button-search');
const searchInput = document.getElementById('search');
const introParagraphs = document.querySelectorAll('.intro p');

function animateIntroParagraphs() {
    introParagraphs.forEach((paragraph, index) => {
        paragraph.style.opacity = '0';
        paragraph.style.transform = 'translateY(20px)';
        paragraph.style.transition = 'opacity 1.6s ease, transform 1.6s ease';

        setTimeout(() => {
            paragraph.style.opacity = '1';
            paragraph.style.transform = 'translateY(0)';
        }, index * 300);
    });
}

async function fetchRandomMovies() {
    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=a3d6a878bad60eae8cf7af53942f60bb');
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Error fetching random movies:', error);
    }
}

async function searchMovie() {
    const query = searchInput.value;
    if (!query) return;

    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=a3d6a878bad60eae8cf7af53942f60bb`);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Error searching movies:', error);
    }
}

function displayMovies(movies) {
    videoContent.innerHTML = '';

    movies.forEach((movie, index) => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');

        const moviePoster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'placeholder.jpg';

        const truncatedDescription = truncateText(movie.overview, 5);

        videoItem.innerHTML = `
            <img src="${moviePoster}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${truncatedDescription} <span class="read-more">Read more</span></p>
        `;

        videoContent.appendChild(videoItem);

        const readMore = videoItem.querySelector('.read-more');
        readMore.addEventListener('click', () => {
            readMore.previousSibling.textContent = movie.overview + ' ';
            readMore.style.display = 'none';
        });

        videoItem.style.opacity = '0';
        videoItem.style.transform = 'translateY(20px)';
        videoItem.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        setTimeout(() => {
            videoItem.style.opacity = '1';
            videoItem.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function truncateText(text, wordLimit) {
    const words = text.split(' ');
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
}

fetchRandomMovies();


searchButton.addEventListener('click', searchMovie);

animateIntroParagraphs();