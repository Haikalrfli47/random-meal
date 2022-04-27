const btn = document.querySelector('.btn');
const content = document.querySelector('.row');
const thumb = document.querySelector('.thumb');
const instruction = document.querySelector('.instruction');
const source = document.querySelector('.source');

async function getMeal() {
  const url = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const data = await url.json();

  return data.meals[0];
}

btn.addEventListener('click', async function () {
  const meal = await getMeal();
  const ing = getIngridients(meal);

  const video = await embedVideo(meal);

  thumb.innerHTML = thumbnail(meal, ing);
  instruction.innerHTML = showInstructions(meal);
  content.appendChild(thumb);
  const list = document.querySelector('.list');
  const filIng = filterIngredients(meal, ing);
  list.innerHTML = filIng;
  source.innerHTML = footer(video);
});

function thumbnail(m, ing) {
  return `     

  <img src="${m.strMealThumb}" alt="" />
  <p><strong>Category</strong>: ${m.strCategory}</p>
  <p><strong>Area</strong>: ${m.strArea}</p>
  <h3>Ingredients :</h3>
  
  <ul class="list">
  </ul>


  
  `;
}

function getIngridients(m) {
  let str = /\d/;
  let obj = Object.keys(m);
  let arr = obj.filter((o) => o.match(str));
  return arr;
}

function filterIngredients(m, ing) {
  let str = '';
  for (let i = 1; i < ing.length - 1; i++) {
    let ingredient = m['strIngredient' + i];
    let measure = m['strMeasure' + i];
    if (!!ingredient) {
      str += `<li>${ingredient} - ${measure}</li>\n`;
    }
  }
  return str;
}

function showInstructions(m) {
  return `    

  <h2>${m.strMeal}</h2>
  <p class = 'inst'>${m.strInstructions}</p>
  </div>
`;
}

async function embedVideo(m) {
  const url = m.strYoutube;
  const embed = await fetch('https://www.youtube.com/oembed?url=' + url + '&format=json');
  const data = await embed.json();
  return data.html;
}

function footer(video) {
  return `  
  <div class="col-md-6 video  my-5">
  <h3 class = "text-center">Video Recipe</h3>
  ${video}
  </div>

  `;
}
