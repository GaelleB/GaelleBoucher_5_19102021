//recuperer l'id du produit via l'url//
function getArticleId() {
    // On obtient les paramètres de recherche dans l'url (relire la documentation mdn si nécessaire)
    let searchParams = new URLSearchParams(window.location.search);

    // On récupère l'id qui est dans les paramètres grâce à la méthode .get
    const id = searchParams.get("id");

    // On construit l'URL qui permet de voir les détails d'un produit dans le backend grâce à l'id récupéré
    const productUrl = "http://localhost:3000/api/products/${id}";

    // On utilise la dite URL pour fetch depuis le backend les détails d'un produit, ensuite on peut l'implémenter
    fetch(productUrl)
        .then((res) => res.json())
        .then((product) => {
            // TODO implement product with its data
        });
}

getArticleId();