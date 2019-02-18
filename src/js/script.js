// Создаем переменные
window.addEventListener('DOMContentLoaded', () => {
    const cartWrapper = document.querySelector('.cart__wrapper'),
        cart = document.querySelector('.cart'),
        close = document.querySelector('.cart__close'),
        open = document.querySelector('#cart'),
        goodsBtn = document.querySelectorAll('.goods__btn'),
        products = document.querySelectorAll('.goods__item'),
        confirm = document.querySelector('.confirm'),
        badge = document.querySelector('.nav_badge'),
        totalost = document.querySelector('.cart__total > span'),
        titles = document.querySelectorAll('.goods_title');

    //Описываем функцию открытия кнопки "корзина"
    function openCart() {
        cart.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        cart.style.display = 'none';
        document.body.style.overflow = '';
    }
    // обрабатываем событие касания и вызываем функцию закрытия-открытия
    open.addEventListener('click', openCart); // нажатие на кнопку корзины
    close.addEventListener('click', closeCart);

    // Разобрать этот код завтра =)
    goodsBtn.forEach(function (btn, i) {
        btn.addEventListener('click', () => {
            let item = products[i].cloneNode(true),
                trigger = item.querySelector('button'),
                removeBtn = document.createElement('div'),
                empty = cartWrapper.querySelector('.empty');

            trigger.remove();

            removeBtn.classList.add('goods_item-remove');
            removeBtn.innerHTML = '&times';
            item.appendChild(removeBtn);

            cartWrapper.appendChild(item);
            if (empty) {
                empty.remove();
            }
        });
    });
}); //посмотреть аттрибуты