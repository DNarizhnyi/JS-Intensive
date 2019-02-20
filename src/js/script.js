   window.addEventListener('DOMContentLoaded', () => {
       
       const loadContent = async (url, callback) => {
           await fetch(url) // Обещание
               .then(response => response.json()) //Превращаем в JS объект
               .then(json => createElement(json.goods)); // Использовать его после 

           callback();
       }

       function createElement(arr) {
           const goodsWrapper = document.querySelector('.goods__wrapper');

           arr.forEach(function (item) {
               let card = document.createElement('div');
               card.classList.add('goods__item');
               card.innerHTML = `
            <img class="goods__img" src="${item.url}" alt="phone">
            <div class="goods__colors">Доступно цветов: 4</div>
            <div class="goods__title">
                ${item.title}
            </div>
            <div class="goods__price">
                <span>${item.price}</span> руб/шт
            </div>
            <button class="goods__btn">Добавить в корзину</button>
            `;
               goodsWrapper.appendChild(card);

           });

       }

       loadContent('js/db.json', () => {

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


                   removeBtn.classList.add('goods__item-remove'); // создание кнопки "remove"
                   removeBtn.innerHTML = '&times';
                   item.appendChild(removeBtn);

                   cartWrapper.appendChild(item); // карточка попадает в корзину
                   if (empty) {
                       empty.style.display = 'none';
                   }

                   calcGoods();
                   calcTotal(); // подсчет total
                   removeFromCart(); // удаляет из корзины
               });
           });

           function sliceTitle() {
               titles.forEach(function (item) {
                   if (item.textContent.length < 60) {
                       return;
                   } else {
                       const str = item.textContent.slice(0, 61) + '...';

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

           function calcGoods() {
               const items = cartWrapper.querySelectorAll('.goods__item'); //get the amount number from cart
               let empty = cartWrapper.querySelector('.empty'); // for counting empty cart
               badge.textContent = items.length; // add this number onto cart
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
                       calcGoods(); // 
                       calcTotal();
                   });
               });
           }
       });
   });






   //  const example = {username: "Dima"};

   // fetch('https://jsonplaceholder.typicode.com/posts',
   //  {
   //         method: "POST",
   //         body: JSON.stringify(example)
   // }) // обещание
   //   .then(response => response.json()) //Обещание
   //   .then(json => console.log(json))