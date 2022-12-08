apiKey = "f2i5eTZ8ryO23AI4E31G0Tz3LB7VLqkg";
limit = 10;

fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}`)
.then((response) => response.json())
.then((data) => {
  const gifContainer = document.getElementById('gif-container');
  data.data.forEach((gif) => {
    const gifBody = `<div class='card-white'>
    <h3>${gif.title}</h3>
    <iframe src="${gif.embed_url}" class="gif-embed"></iframe>
  </div>`
    gifContainer.insertAdjacentHTML('beforeend', gifBody)
  })
});