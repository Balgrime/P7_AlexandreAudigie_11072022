/* On récupère le token CSRF depuis le localStorage */
let accessToken = localStorage.getItem('accessToken');
if (!accessToken) {
  /* Traitement dans le cas où le token n'existe dans le localStorage */
  console.log("pas de token");
}

/* Le localStorage stocke les données sous forme de chaines de caractères nous transformons donc la donnée en JSON */
accessToken = JSON.parse(accessToken);
 
export const options = {
  method: 'GET',
  mode: 'cors',
  headers: new Headers({
    'Authorization': accessToken.accessToken
  }),
  credentials: 'include'
};
