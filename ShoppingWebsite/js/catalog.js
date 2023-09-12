document.addEventListener('DOMContentLoaded', function () {
	// Load categories from categories.json
	fetch('data/categories.json')
		.then(response => response.json())
		.then(categories => {
			const categoryList = document.getElementById('category-list');
			categories.forEach(category => {
				const li = document.createElement('li');
				const button = document.createElement('button');
				button.classList.add('category-button');
				button.textContent = category.name;
				button.dataset.categoryId = category.id;
				button.addEventListener('click', () => filterProducts(category.id));
				li.appendChild(button);
				categoryList.appendChild(li);
			});
		})
		.catch(error => console.error('Error loading categories:', error));

	// Load products from products.json and initially display all products
	fetchAndDisplayProducts();

	// Add an event listener for the "Back to Homepage" button
	const backButton = document.getElementById('back-to-home-button');
	backButton.addEventListener('click', () => {
		// Redirect the user to the homepage (replace 'index.html' with your homepage URL)
		window.location.href = 'index.html';
	});
});

function fetchAndDisplayProducts() {
	fetch('data/products.json')
		.then(response => response.json())
		.then(products => displayProducts(products))
		.catch(error => console.error('Error loading products:', error));
}

function displayProducts(products) {
	const productList = document.getElementById('product-list');
	productList.innerHTML = ''; // Clear the existing product list

	products.forEach(product => {
		const div = document.createElement('div');
		div.classList.add('product');
		div.innerHTML = `
		<h2>${product.name}</h2>
		<p>Price: $${product.price}</p>
		<p id="description">${product.description}</p>
		`;
		div.style = `background-image: url('images/${product.image}')`
		productList.appendChild(div);
	});
}

function filterProducts(categoryId) {
	// Get all category buttons
	const categoryButtons = document.querySelectorAll('.category-button');

	// Remove the 'active' class from all buttons
	categoryButtons.forEach(button => button.classList.remove('active'));

	// Add the 'active' class to the clicked button
	const activeButton = document.querySelector(`.category-button[data-category-id="${categoryId}"]`);
	activeButton.classList.add('active');

	// Load products and filter by category
	fetch('data/products.json')
		.then(response => response.json())
		.then(products => {
			const filteredProducts = products.filter(product => product.categoryId === categoryId);
			displayProducts(filteredProducts);
		})
		.catch(error => console.error('Error loading products:', error));
}
