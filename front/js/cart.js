// Sélection de la balise <article>
let cartItems = document.getElementById("cart__items");

// Récupère les données du localStorage
let sauvegardeProduitLocalStorage = JSON.parse(localStorage.getItem('product'));
let sauvegardeContactLocalStorage = JSON.parse(localStorage.getItem('contact'));

function panier() {
	let check = localStorage.getItem('product');
	if (check) {
		return JSON.parse(localStorage.getItem('product'));
	} else {
		let titre = document.querySelector('h1');
		titre.innerText = "Votre panier est vide";
		return [];
	}
}
panier();

// Affichage d'un tableau récapitulatif des achats dans la page Panier
// Récupération l'array via le localStorage + création et insersion des éléments dans la page Panier
function affichagePanier() {
	let sauvegardeProduitLocalStorage = panier();
	for (let i = 0; i < sauvegardeProduitLocalStorage.length; i++) {

		// SELECTEUR
		const sectionCartItems = document.querySelector("#cart__items");

		// GESTION DE LA BALISE HTML <ARTICLE>
		const art = document.createElement("article");
		art.classList.add("cart__item");
		art.setAttribute("data-id", sauvegardeProduitLocalStorage[i].id);

		// GESTION DE L'IMAGE
		const divImage = document.createElement("div");
		divImage.classList.add("cart__item__img");
		const image = document.createElement("img");
		image.classList.add("alt");
		image.src = (sauvegardeProduitLocalStorage[i].img);
		image.alt = (sauvegardeProduitLocalStorage[i].alt);

		// GESTION DE LA DIV "cart__item__content"
		const itemContent = document.createElement("div");
		itemContent.classList.add("cart__item__content");
		
		// GESTION DU NOM ET DU PRIX
		const contentTitlePrice = document.createElement("div")
		const nom = document.createElement("h2");
		const prix = document.createElement("p");
		contentTitlePrice.classList.add("cart__item__content__titlePrice");
		nom.textContent = (sauvegardeProduitLocalStorage[i].nom);
		prix.textContent = (sauvegardeProduitLocalStorage[i].prix);

		// GESTION DE LA DIV "cart__item__content__settings"
		const contentSetting = document.createElement("div");
		contentSetting.classList.add("cart__item__content__settings");
		
		// GESTION DE LA QUANTITE
		const settingQuantity = document.createElement("div");
		const quantity = document.createElement("p");
		const itemQuantity = document.createElement("input");
		quantity.textContent = "Qté : ";settingQuantity.classList.add("cart__item__content__settings__quantity");
		itemQuantity.classList.add("itemQuantity");
		itemQuantity.setAttribute("type", "number", "name", "itemQuantity", "min", "1", "max", "100", "value", sauvegardeProduitLocalStorage[i].quantity)
		
		// GESTION DU BOUTON SUPPRIMER
		const settingDelete = document.createElement("div");
		const suppr = document.createElement("p");
		settingDelete.classList.add("cart__item__content__settings__delete");
		suppr.classList.add("deleteItem")
		suppr.textContent = "Supprimer";

		// Apparition dans le DOM et affichage dans la page panier grâce au "const cart"
		sectionCartItems.appendChild(art);
		art.appendChild(divImage);
		divImage.appendChild(image);
		art.appendChild(itemContent);
		itemContent.appendChild(contentTitlePrice);
		contentTitlePrice.appendChild(nom);
		nom.appendChild(prix);
		itemContent.appendChild(contentSetting);
		contentSetting.appendChild(settingQuantity);
		settingQuantity.appendChild(quantity);
		quantity.appendChild(itemQuantity);
		contentSetting.appendChild(settingDelete);
		settingDelete.appendChild(suppr);

	
	}
}
affichagePanier();

// Gérer la modification et la suppression de produits dans la page Panier
// Modification de la quantité d'un produit
let modifProduit = () => {
	let itemQuantity = [...document.getElementsByClassName('itemQuantity'),
	];
	itemQuantity.forEach((item, index) => {
		item.addEventListener('click', () => {
			sauvegardeProduitLocalStorage[index].quantity = itemQuantity[index].value;
			localStorage.setItem('product', JSON.stringify(sauvegardeProduitLocalStorage)
			);
			panier();
			calculTotal();
		});
	});
};
modifProduit();

// Suppression d'un produit
let suppProduit = () => {
	let deleteItem = [...document.getElementsByClassName('deleteItem')];
	let articleChoisi = [...document.querySelectorAll(`.cart__item`)];
	deleteItem.forEach((element, index) => {
		element.addEventListener('click', () => {
			let id = articleChoisi[index].dataset.id;
			let color = articleChoisi[index].dataset.color;
			sauvegardeProduitLocalStorage = sauvegardeProduitLocalStorage.filter(e => e._id !== id || e.colors !== color);
			localStorage.setItem('product', JSON.stringify(sauvegardeProduitLocalStorage));
			articleChoisi[index].remove();
			panier();
			calculTotal();
		});
	});
	if (document.URL.includes('cart.html')) {
		if (!sauvegardeProduitLocalStorage[0]) {
			localStorage.removeItem('product');
		}
	}
};
suppProduit();

function calculTotal() {
	let totalQuantity = document.querySelector("#totalQuantity");
	let totalPrice = document.querySelector("#totalPrice");
	let product = panier();
	let total = 0;
	let quantite = 0;
	let allQuantite = 0;
	
	for (let i = 0; i < product.length; i++) {
		let prix = Number(product[i].prix);
		quantite = Number(product[i].quantity);
		total += prix * quantite;
		allQuantite += Number(product[i].quantity);
	}
		totalQuantity.innerText = allQuantite;
		totalPrice.innerHTML = total;

	// Quantité totale à côté du panier (navbar)
	let cart = () => {
		let panier = document
			.getElementsByTagName('nav')[0]
			.getElementsByTagName('li')[1];
		let sauvegardeProduitLocalStorage = JSON.parse(localStorage.getItem('product'));
		let total = 0;
		for (let produit of sauvegardeProduitLocalStorage) {
			total += parseInt(produit.quantity) * produit.prix;
		}
		panier.innerHTML = `Panier <span id="test" style='color: red;'>${total}</span>`;
	};
	cart();

	// Passer la commande (avec le formulaire)
	addEventListener('change', () => {
		function firstName() {
			let firstName = document.getElementById('firstName').value;
			let text = document.getElementById('firstNameErrorMsg');
			let regEx1 = /^[a-zA-Zéèàêë\-]+$/;
			let number = /^[a-zA-Z\-1-9]+$/;

			if (firstName.match(regEx1)) {
				text.innerHTML = 'Prénom valide';
				return firstName;
			} else {
				if (firstName.match(number)) {
					text.innerHTML = 'Les chiffres ne sont pas tolérés';
				} else {
					text.innerHTML = 'Merci de rentrer un prénom valide';
				}
			}
			if (firstName == '') {
				text.innerHTML = '';
			}
		}
		firstName();

		function lastName() {
			let lastName = document.getElementById('lastName').value;
			let text = document.getElementById('lastNameErrorMsg');
			let regEx2 = /^\s*[a-zA-Zéèàê]+\s*$/;
			let number = /^[a-zA-Z\-1-9]+$/;

			if (lastName.match(regEx2)) {
				text.innerHTML = 'Nom valide';
				return lastName;
			} else {
				if (lastName.match(number)) {
					text.innerHTML = 'Les chiffres ne sont pas tolérés';
				} else {
					text.innerHTML = 'Merci de rentrer un nom valide';
				}
			}
			if (lastName == '') {
				text.innerHTML = '';
			}
		}
		lastName();

		function adress() {
			let address = document.getElementById('address').value;
			let text = document.getElementById('addressErrorMsg');
			let regEx3 = '([0-9a-zA-Z,. ]*) ?([0-9]{5}) ?([a-zA-Z]*)';

			if (address.match(regEx3)) {
				text.innerHTML = 'Adresse postale valide';
				return address;
			} else {
				text.innerHTML =
					'Merci de rentrer une adresse valide : numéro voie code postal';
			}
			if (address == '') {
				text.innerHTML = '';
			}
		}
		adress();

		function city() {
			let city = document.getElementById('city').value;
			let text = document.getElementById('cityErrorMsg');
			let regEx4 = /^[a-z ,.'-]+$/i;

			if (city.match(regEx4)) {
				text.innerHTML = 'Ville valide';
				return city;
			} else {
				text.innerHTML = 'Merci de rentrer une ville valide';
			}
			if (city == '') {
				text.innerHTML = '';
			}
		}
		city();

		function mail() {
			let mail = document.getElementById('email').value;
			let text = document.getElementById('emailErrorMsg');
			let regEx5 = new RegExp(
				'^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$',
				'g'
			);

			if (mail.match(regEx5)) {
				text.innerHTML = 'Adresse email valide';
				return mail;
			} else {
				text.innerHTML = 'Merci de rentrer une adresse valide';
			}
			if (mail == '') {
				text.innerHTML = '';
			}
		}
		mail();

		// Objet vers localStorage
		let sendContact = document.querySelector('#order');
		sendContact.addEventListener('click', (e) => {
			e.preventDefault();

			// Création de l'objet contact | Les valeurs sont vérifiés par les fonctions
			let contact = {
				firstName: firstName(),
				lastName: lastName(),
				address: adress(),
				city: city(),
				email: mail(),
			};

			// Ajoute le nouveau contact
			let ajoutContactLocalStorage = () => {
				sauvegardeContactLocalStorage = [];
				sauvegardeContactLocalStorage.push(contact);
				localStorage.setItem(
					'contact',
					JSON.stringify(sauvegardeContactLocalStorage)
				);
			};

			// Modifie le contact
			let modifContactLocalStorage = () => {
				sauvegardeContactLocalStorage = contact;
				localStorage.setItem(
					'contact',
					JSON.stringify(sauvegardeContactLocalStorage)
				);
			};

			// Si l'objet a une key non défini, ne pas exécuter le code
			if (
				contact.firstName == undefined ||
				contact.lastName == undefined ||
				contact.address == undefined ||
				contact.city == undefined ||
				contact.email == undefined
			) {
				return false;
			} else {
				// SI pas de contact dans le localStorage, crée le tableau
				if (!sauvegardeContactLocalStorage) {
					ajoutContactLocalStorage();
				}
				// Modifie le contact en temps réel
				else {
					modifContactLocalStorage();
				}
			}

			const products = []
			product.forEach(kanap => products.push(kanap._id));

			fetch('http://localhost:3000/api/products/order', {
				method: 'POST',
				body: JSON.stringify({contact, products}),
				headers: {
					'Content-type': 'application/json',
				},
			})
			.then(res => {
				if (res.ok) {
					return res.json();
				} else {
					console.log('Commande échouée');
				}
			})
			.then(order => {
				console.log(order);
				let orderId = order.orderId
				window.location = `${window.location.origin}/front/html/confirmation.html?id=${orderId}`;
				
				const blockContainer = document.querySelector(".limitedWidthBlockContainer");
				const confirmation = document.querySelector(".confirmation");

				const numOrder = document.createElement("span");

				numOrder.innerText = order;

				blockContainer.appendChild(confirmation);
				confirmation.appendChild(numOrder);
			});
	});
	})
}
calculTotal();