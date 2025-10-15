// Carrito interactivo ARCADIA
document.addEventListener('DOMContentLoaded', function() {
	const cart = [];
	const cartCount = document.getElementById('cart-count');
	const cartPanel = document.getElementById('cart-panel');
	const cartItems = document.getElementById('cart-items');
	const cartTotal = document.getElementById('cart-total');
	const closeCartBtn = document.getElementById('close-cart');
	const addToCartBtns = document.querySelectorAll('.add-to-cart');
	const cartIcon = document.getElementById('cart-icon');
	// Delegación de eventos para botón 'Pagar' (soporta múltiples instancias)
	document.body.addEventListener('click', function(e) {
		if (e.target && e.target.id === 'pay-cart') {
			window.location.href = '/checkout.html';
		}
	});

	function updateCart() {
		cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
		cartItems.innerHTML = '';
		let total = 0;
				cart.forEach((item, idx) => {
					total += item.price * item.qty;
					const li = document.createElement('li');
					li.innerHTML = `
						<img src="${item.img}" alt="${item.title}" class="cart-thumb"> 
						${item.title} 
						<button class='qty-btn' data-idx='${idx}' data-action='dec'>-</button>
						<span class='cart-qty'>${item.qty}</span>
						<button class='qty-btn' data-idx='${idx}' data-action='inc'>+</button>
						- $${(item.price * item.qty).toFixed(2)}
						<button class='remove-item' data-idx='${idx}'>🗑️</button>`;
					cartItems.appendChild(li);
				});
				// Botón eliminar
				const removeBtns = cartItems.querySelectorAll('.remove-item');
				removeBtns.forEach(btn => {
					btn.addEventListener('click', function(e) {
						const idx = parseInt(btn.getAttribute('data-idx'));
						cart.splice(idx, 1);
						updateCart();
					});
				});
				// Botones cantidad
				const qtyBtns = cartItems.querySelectorAll('.qty-btn');
				qtyBtns.forEach(btn => {
					btn.addEventListener('click', function(e) {
						const idx = parseInt(btn.getAttribute('data-idx'));
						const action = btn.getAttribute('data-action');
						if (action === 'inc') {
							cart[idx].qty++;
						} else if (action === 'dec') {
							cart[idx].qty--;
							if (cart[idx].qty <= 0) {
								cart.splice(idx, 1);
							}
						}
						updateCart();
					});
				});
		cartTotal.textContent = cart.length ? `Total: $${total.toFixed(2)}` : '';
	}

	addToCartBtns.forEach(btn => {
		btn.addEventListener('click', function() {
			const card = btn.closest('.card');
			const title = card.getAttribute('data-title');
			const price = parseFloat(card.getAttribute('data-price'));
			const img = card.getAttribute('data-img');
			const found = cart.find(item => item.title === title);
			if (found) {
				found.qty++;
			} else {
				cart.push({ title, price, qty: 1, img });
			}
			updateCart();
			cartPanel.style.display = 'block';
		});
	});

	cartIcon.addEventListener('click', function(e) {
		e.preventDefault();
		cartPanel.style.display = 'block';
		updateCart();
	});

	closeCartBtn.addEventListener('click', function() {
		cartPanel.style.display = 'none';
	});

	// Cerrar carrito al hacer click fuera del panel
	cartPanel.addEventListener('click', function(e) {
		if (e.target === cartPanel) cartPanel.style.display = 'none';
	});
});
