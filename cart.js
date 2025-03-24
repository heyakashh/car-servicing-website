document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('checkout-btn');
    const clearCartButton = document.getElementById('clear-cart-btn');
    const cartTotal = document.getElementById('cart-total');

    const displayCartItems = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/cart');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const cart = await response.json();
            console.log('Cart data:', cart);

            if (!Array.isArray(cart)) {
                throw new Error('Invalid cart data received from server');
            }

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p class="text-center text-muted">Your cart is empty.</p>';
                checkoutButton.style.display = 'none';
                cartTotal.textContent = 'Total: ₹0';
                return;
            }

            let total = 0;
            let cartHTML = '';
            
            cart.forEach(item => {
                // Handle the price string, removing the '?' character if present
                const priceStr = item.price.replace('?', '₹');
                const price = parseInt(priceStr.replace('₹', '').replace(',', '')) || 0;
                total += price;
                
                cartHTML += `
                    <div class="card mb-3">
                        <div class="card-body d-flex justify-content-between align-items-center">
                            <div>
                                <h5 class="card-title">${item.name || 'Unknown Item'}</h5>
                                <p class="card-text text-muted">${priceStr}</p>
                            </div>
                        </div>
                    </div>
                `;
            });

            cartItemsContainer.innerHTML = cartHTML;
            cartTotal.textContent = `Total: ₹${total.toLocaleString()}`;
            checkoutButton.style.display = 'block';
        } catch (error) {
            console.error('Error details:', error);
            cartItemsContainer.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    <h4 class="alert-heading">Error Loading Cart</h4>
                    <p>${error.message}</p>
                    <hr>
                    <p class="mb-0">Please ensure the backend server is running at http://localhost:8080</p>
                </div>
            `;
        }
    };

    // Initial load of cart items
    displayCartItems();

    // Refresh cart every 5 seconds
    setInterval(displayCartItems, 5000);

    // Event Listeners
    if (clearCartButton) {
        clearCartButton.addEventListener('click', async () => {
            try {
                const response = await fetch('http://localhost:8080/api/cart', {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors'
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                await displayCartItems();
            } catch (error) {
                console.error('Error clearing cart:', error);
                alert('Failed to clear cart. Please try again.');
            }
        });
    }

    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            window.location.href = 'checkout.html';
        });
    }
});