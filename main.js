// хранилище данных
const shopStore = [
  {
    name: "Шуруповерт GSR 18V-50",
    inStock: 3,
    price: 14500,
    img: "https://prof-dv.ru/upload/iblock/4ad/4ad29f3d94c0ed3c5cea6047802d92d4.jpg",
  },
  {
    name: "Шуруповерт GSR 12V-30",
    inStock: 1,
    price: 6400,
    img: "https://prof-dv.ru/upload/iblock/c15/c159e6d7f36bd24cf854063e9f80b9fa.png",
  },
  {
    name: "Шуруповерт GSR 18V-60",
    inStock: 12,
    price: 18390,
    img: "https://prof-dv.ru/upload/iblock/48f/GSR_18v_60_c_138009_06019g1100.png",
  },
  {
    name: "Шуруповерт GSR 18V-60 FC",
    inStock: 5,
    price: 32600,
    img: "https://prof-dv.ru/upload/iblock/83b/GSR_18V_60_FC_06019G7100_.png",
  },
];
const cartStore = [];

// базовые элементы
const catalog = document.querySelector(".catalog");
const cartButton = document.querySelector("#cartButton");
const countInCart = document.querySelector("#countInCart");
const renderCartPlace = document.querySelector("#renderCartPlace");
const successOrderWrapper = document.querySelector("#success-order-wrapper");
const cart = document.querySelector("#cart");

function renderCatalog() {
  let catalogTemplate = "";
  for (item in shopStore) {
    catalogTemplate += `
      <div class="item">
        <div class="img-wrapper">
          <img src="${shopStore[item].img}" alt="">
        </div>
        <div class="item-info">
          <h3>${shopStore[item].name}</h3>
          <span>Цена ${shopStore[item].price} руб.</span>
          <div class="item__wrapper-p-button">
            <span>В наличии: ${shopStore[item].inStock} шт </span>
            <button class='addToCart' onclick='addToCart(${item})'>В корзину</button>
          </div>
        </div>
      </div>
      `;
  }
  catalog.innerHTML = catalogTemplate;
}

renderCatalog();
renderCart();

cartButton.addEventListener("click", cartShowHideToggler);

function cartShowHideToggler() {
  cart.classList.toggle("cart-show");
}

function addToCart(idx) {
  if (!cartStore.idx) {
    cartStore.push({ shopStoreIdx: idx, count: 1 });
    countGoodsInCart();
    renderCart();
  }
}

function renderCart() {
  let cartTemplate = ``;
  if (cartStore.length) {
    cartTemplate = `
      <p>${cartStore.length} товаров на сумму <span id='totalSumOfCart'>00</span> руб.</p>
      <div id="cartList">
      `;
    for (idx in cartStore) {
      cartTemplate += `
      <div class="cartList__item">
        <div class="cart-img-wrapper">
          <img src="${shopStore[cartStore[idx].shopStoreIdx].img}" alt="" >
        </div> 
        <div class="cart__item-info">
          <h4>${shopStore[cartStore[idx].shopStoreIdx].name}</h4>
          <span>
            <button 
              class='plus-minus' 
              onclick='inCartCountChanger("-", ${idx})'>
              -
            </button>
            <span id='countOf${idx}'>
              ${cartStore[idx].count}
            </span>
            шт
            <button 
              class='plus-minus'
              onclick='inCartCountChanger("+", ${idx})'
            >
            +
            </button>
            * ${shopStore[cartStore[idx].shopStoreIdx].price} руб
          </span>
          <div class="total-wrapper">
            <div class='total'>
              Итого: 
              <span id='totalOf${idx}' class='totalPriceItemInCart'>
                ${
                  shopStore[cartStore[idx].shopStoreIdx].price *
                  cartStore[idx].count
                }
              </span>
               руб
            </div>
            <button class='item-delete' onclick='itemInCartRemover(${idx})'>Удалить</button>
          </div>
        </div>
      </div>
      `;
    }
    cartTemplate += `
        </div>
      <button class='checkout' onclick='showSuccessOrderPopup()'>Оформить заказ</button>
      `;
    // определяется DOM-элемент только после рендеринга
    var totalSumOfCart = document.querySelectorAll("#totalSumOfCart");
    renderCartPlace.innerHTML = cartTemplate;
    totalPriceInCartRender();
  } else {
    renderCartPlace.innerHTML = "<p>Ваша корзина пуста</p>";
  }
}

function inCartCountChanger(operator, idx) {
  let countInCart = document.querySelector("#countOf" + idx);
  let totalPriceItemInCart = document.querySelector("#totalOf" + idx);
  let totalSumOfCart = document.querySelector("#totalSumOfCart");

  if (operator == "+") {
    cartStore[idx].count++;
  } else {
    cartStore[idx].count--;
    if (!cartStore[idx].count) {
      itemInCartRemover(idx);
      return;
    }
  }

  countInCart.innerHTML = cartStore[idx].count;
  totalPriceItemInCart.innerHTML =
    cartStore[idx].count * shopStore[cartStore[idx].shopStoreIdx].price;
  totalPriceInCartRender();
}

function totalPriceInCartRender() {
  let totalPrice = 0;
  for (storeIdx in cartStore) {
    totalPrice +=
      shopStore[cartStore[storeIdx].shopStoreIdx].price *
      cartStore[storeIdx].count;
  }
  totalSumOfCart.innerHTML = totalPrice;
}

function countGoodsInCart() {
  countInCart.innerHTML = cartStore.length;
}

function itemInCartRemover(idx) {
  cartStore.splice(idx, 1);
  countGoodsInCart();
  renderCart();
}

function showSuccessOrderPopup() {
  cartShowHideToggler();
  successOrderWrapper.innerHTML = `
    <div id="success-order">
      <h2>Ваш заказ успешно оформлен</h2>
      <button onclick='hideSuccessOrderPopup()'>Закрыть</button>
    </div>
    `;
}

function hideSuccessOrderPopup() {
  successOrderWrapper.innerHTML = "";
}
