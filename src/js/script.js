window.addEventListener('DOMContentLoaded', () => {
    const cartWrapper = document.querySelector('.cart__wrapper'),
        cart = document.querySelector('.cart'),
        close = document.querySelector('.cart__close'),
        open = document.querySelector('#cart'),
        goodsBtn = document.querySelectorAll('.goods__btn'),
        products = document.querySelectorAll('.goods__item'),
        confirm = document.querySelector('.confirm'),
        badge = document.querySelector('.nav__badge'),
        totalCost = document.querySelector('.cart__total > span'),
        titles = document.querySelectorAll('.goods__title');

    function openCart() {
        cart.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        cart.style.display = 'none';
        document.body.style.overflow = '';
    }

    open.addEventListener('click', openCart);
    close.addEventListener('click', closeCart);

    goodsBtn.forEach(function (btn, i) {
        btn.addEventListener('click', () => {
            let item = products[i].cloneNode(true),
                trigger = item.querySelector('button'),
                removeBtn = document.createElement('div'),
                empty = cartWrapper.querySelector('.empty');

            trigger.remove();

            showConfirm();
            calcGoods(1);

            removeBtn.classList.add('goods__item-remove'); // создание кнопки "remove"
            removeBtn.innerHTML = '&times';
            item.appendChild(removeBtn);

            cartWrapper.appendChild(item); // карточка попадает в корзину
            if (empty) {
                empty.style.display = 'none';
            }

            calcTotal(); // подсчет total
            removeFromCart(); // удаляет из корзины
        });
    });

    function sliceTitle() {
        titles.forEach(function (item) {
            if (item.textContent.length < 70) {
                return;
            } else {
                const str = item.textContent.slice(0, 71) + '...';

                item.textContent = str;
            }
        });
    }
    sliceTitle();

    function showConfirm() {
        confirm.style.display = 'block';
        let counter = 100;

        const id = setInterval(frame, 10);

        function frame() {
            if (counter == 10) {
                clearInterval(id);
                confirm.style.display = 'none';
            } else {
                counter--;
                confirm.style.transform = `translateY(-${counter}px)`;
                confirm.style.opacity = '.' + counter;
            }
        }
    }

    function calcGoods(i) {
        const items = cartWrapper.querySelectorAll('.goods__item'); //get the amount number from cart
        let empty = cartWrapper.querySelector('.empty'); // for counting empty cart
        badge.textContent = i + items.length; // add this number onto cart
        if (badge.textContent == false) {
            empty.style.display = 'block';
        }
    }

    function calcTotal() {
        const prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span'); // get the amount into span tag <span> 3233 </span>
        let total = 0;
        prices.forEach(function (item) {
            total += +item.textContent; // get the exact content between <span></span>. Then convert string (item.textContent) into number, by adding +
        });
        totalCost.textContent = total; // textContent - добавить прямо на страницу HTML
    }

    function removeFromCart() { // обрабатываем "крестики" и привязываем обработчик события
        const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
        removeBtn.forEach(function (btn) {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                calcGoods(0); // 
                calcTotal();
            });
        });
    }
});



// removeBtn.addEventListener('click', function() { item.remove(); });
// empty.style