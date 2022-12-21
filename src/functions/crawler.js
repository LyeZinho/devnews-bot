// Get a content list
/*
[
  {
    "id": "bf52b1fb-bed1-4c44-b78b-0b399f01157f",
    "owner_id": "10a95418-dc69-48a8-a1a4-e9d3c786b093",
    "parent_id": null,
    "slug": "3-apis-gratuitas-legais-e-excelentes-para-iniciar-os-estudos-na-area",
    "title": "3 APIs gratuitas, legais e excelentes para iniciar os estudos na área!",
    "status": "published",
    "source_url": null,
    "created_at": "2022-12-19T15:42:18.312Z",
    "updated_at": "2022-12-19T15:42:18.312Z",
    "published_at": "2022-12-19T15:42:18.312Z",
    "deleted_at": null,
    "tabcoins": 19,
    "owner_username": "josevictormoreno",
    "children_deep_count": 4
  },
  ...
]
*/
const request = require('request');


async function getContents() {
  let url = "https://www.tabnews.com.br/api/v1/contents";
  return new Promise((resolve, reject) => {
    request(url, function (error, response, body) {
      if (error) {
        reject(error);
      }
      resolve(
        JSON.parse(body)
      );
    });
  });
}


// Make content
/*
  endpoint: https://www.tabnews.com.br/api/v1/contents/[username]/[slug]/
  make a request for the endpoint and replace [username] and [slug] with the values of the content you want to get.
  Return:
  {
    "id": "bf52b1fb-bed1-4c44-b78b-0b399f01157f",
    "owner_id": "10a95418-dc69-48a8-a1a4-e9d3c786b093",
    "parent_id": null,
    "slug": "3-apis-gratuitas-legais-e-excelentes-para-iniciar-os-estudos-na-area",
    "title": "3 APIs gratuitas, legais e excelentes para iniciar os estudos na área!",
    "body": "Eu trabalho com APIs diariamente, já criei algumas, e também já usei de outras pessoas. É inegável o poder e a facilidade que uma API gera para o seu projeto.\nResolvi trazer 3 APIs relativamente simples, mas que podem ajudar a criar projetos criativos!\n\n#### Sobre mim\n[Meu portfolio](https://josevictormoreno.github.io/)\n[Meu GitHub](https://github.com/josevictormoreno)\n\n## 1 - Advice Slip JSON API\nEssa api retorna simplemente um conselho!\n\nExemplo de uso: GET https://api.adviceslip.com/advice\n\nVocê também pode adicionar /search após o advice para fazer buscas\n\n## 2 - API da NASA\nEssa foi uma das que mais me chamou atenção. Com está api voce pode receber várias informações da NASA, é necessário criar uma conta para receber sua chave. Um dos requests que considero mais interessante é o de imagem. Eu desenvolvi um simples site que mostra uma imagem por dia utilizando essa api, o resultado é muito legal. Para quem quiser conhecer, só [clicar aqui](https://josevictormoreno.github.io/projeto-universo/universe/today).\n\n## 3 - API do New York Times\nTambém tenho um projeto que adicionei em meu portfólio com essa api, caso tenha interesse só [clicar aqui](https://josevictormoreno.github.io/znews/home). Com essa api você recebe as noticias mais vistas do NYT. Também é possivel receber os best sellers de livros da amazon. É possível ver um exemplo dos dois (notícias e livros) em meu projeto com este [link](https://josevictormoreno.github.io/znews/home).\n\n### Links\n[Advice Slip JSON API](https://api.adviceslip.com/#endpoint-random)\n[API da NASA](https://api.nasa.gov/)\n[API do New York Times](https://developer.nytimes.com/)",
    "status": "published",
    "source_url": null,
    "created_at": "2022-12-19T15:42:18.312Z",
    "updated_at": "2022-12-19T15:42:18.312Z",
    "published_at": "2022-12-19T15:42:18.312Z",
    "deleted_at": null,
    "owner_username": "josevictormoreno",
    "tabcoins": 21,
    "children_deep_count": 5
  }
  */

async function getContent(username, slug) {
  // Import got

  let url = `https://www.tabnews.com.br/api/v1/contents/${username}/${slug}/`;
  return new Promise((resolve, reject) => {
    request(url, function (error, response, body) {
      if (error) {
        reject(error);
      }
      resolve(
        JSON.parse(body)
      );
    });
  });
}

// Make content
/*
  First get the content list from getContents() function
  Then make a request for each content using username and slug
  Finally return a list with all the content
  */

async function makeContent() {
  let contents = await getContents();
  let contentList = [];
  for (let i = 0; i < contents.length; i++) {
    let content = await getContent(
      contents[i].owner_username,
      contents[i].slug
    );
    contentList.push(content);
    console.log(`Content ${i + 1} of ${contents.length} done!`);
  }
  return contentList;
}

// Get only one content
/*
    First get the content list from getContents() function
    Then make a request for each content using username and slug
    Finally return the <index> content
    */



async function makeOneContent(index) {
  // Try for a randon number if retunr empty
  try{
    let contents = await getContents();
    let content = await getContent(
      contents[index].owner_username,
      contents[index].slug
    );
    return content;
  }  
  catch{
    console.log("Error, trying again");
    let contents = await getContents();
    let random = Math.floor(Math.random() * contents.length);
    let content = await getContent(
      contents[random].owner_username,
      contents[random].slug
    );
    return content;
  }
}

// If index is greather than content.lengt return index to 0
async function indexReset(){
  const {saveNumber, getNumber} = require('./functions/saveindex')
  let contents = await getContents();
  let index = await getNumber();
  if(index > contents.length){
    index = 0;
    await saveNumber(index);
  }
}

function clearContent(imput) {
  let content = imput.replace(/<[^>]*>?/gm, "");
  return content;
}


// Export
module.exports = {
  getContents,
  getContent,
  makeContent,
  makeOneContent,
  clearContent,
  indexReset
};
