document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('checkout-btn');
    const cartTotal = document.getElementById('cart-total');

    const displayCartItems = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center text-muted">Your cart is empty.</p>';
            checkoutButton.style.display = 'none';
            cartTotal.textContent = 'Total: ₹0';
            return;
        }

        let cartHTML = '';
        cart.forEach(item => {
            const price = parseInt(item.price.replace('₹', '').replace(',', ''));
            total += price;
            cartHTML += `
                <div class="card mb-3">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text text-muted">${item.price}</p>
                        </div>
                    </div>
                </div>
            `;
        });

        cartItemsContainer.innerHTML = cartHTML;
        cartTotal.textContent = `Total: ₹${total.toLocaleString()}`;
        checkoutButton.style.display = 'block';
    };

    displayCartItems();

    checkoutButton.addEventListener('click', () => {
        alert('Proceeding to checkout...');
    });
});