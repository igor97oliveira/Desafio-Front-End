let endpointApi = `https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1`;

/* APP */
App();

/* Funções */
function App() {
  conectionEndpointAPI();
  formAlgorithm();
  formShare();
  selectHeaderButtons();
}
function conectionEndpointAPI() {
  const btnMoreProducts = document.getElementById("btn-more-products");

  fetch(endpointApi)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      endpointApi = `https://${res.nextPage}`;
      res.products.forEach((element) => {
        createCard(element);
      });
      /* Botão mais produtos */
      btnMoreProducts.addEventListener("click", () => {
        moreProducts();
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
function createCard(product) {
  const productImage = product.image;
  const productName = product.name;
  const productDescription = product.description;
  const productOldPrice = product.oldPrice;
  const productActualPrice = product.price;
  const productCount = product.installments.count;
  const productInstallments = product.installments.value;

  const products = document.querySelector(".products");
  const productCard = `<div class="card animate">
  <div>
    <img class="product-image" src=${productImage} />
  </div>
  <div class="product-desc">
    <h3>${productName}</h3>
    <p>
    ${productDescription}
    </p>
    <p>De: R$${productOldPrice}</p>
    <h2><strong>Por: R$${productActualPrice}</strong></h2>
    <p>
      ou ${productCount}x de R$${productInstallments}
    </p>
    <button>Comprar</button>
  </div>
</div>`;

  products.innerHTML += productCard;
}
function moreProducts() {
  fetch(endpointApi)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      endpointApi = `https://${res.nextPage}`;
      res.products.forEach((element) => {
        createCard(element);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
function formAlgorithm() {
  const btnSubmit = document.getElementById("btn-submit-help-algorithm");

  btnSubmit.addEventListener("click", (event) => {
    validateFormAlgorithm();
    event.preventDefault();
  });
}
function validateFormAlgorithm() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const cpf = document.getElementById("cpf");
  const gender = document.getElementsByName("gender");
  let selectedGender;
  gender.forEach((checkedGender) => {
    if (checkedGender.checked) {
      selectedGender = checkedGender.value;
    }
  });
  console.log(cpf.value.length < cpf.minLength);

  let emptyValues =
    name.value == "" ||
    email.value == "" ||
    cpf.value == "" ||
    selectedGender === undefined ||
    cpf.value.length < cpf.minLength;

  if (emptyValues) {
    alert("É necessário preencher todos os campos");
  } else alert("Formulário enviado!");
}
function formShare() {
  let btnShare = document.getElementById("btn-submit-share");
  btnShare.addEventListener("click", (event) => {
    validateFormShare();
    event.preventDefault();
  });
}
function validateFormShare() {
  const friendName = document.getElementById("friend-name");
  const friendEmail = document.getElementById("friend-email");
  let emptyValues = friendName.value == "" || friendEmail.value == "";
  if (emptyValues) {
    return alert("É necessário preencher todos os campos");
  }
  alert("Formulário enviado!");
}

/* Funções Header Botões */
function selectHeaderButtons() {
  let btnHelpAlgorithm = document.getElementById("btn-help-algorithm");
  let btnYourProducts = document.getElementById("btn-your-products");
  let btnShare = document.getElementById("btn-share");

  btnHelpAlgorithm.addEventListener("click", scrollToHelpAlgorithm);
  btnYourProducts.addEventListener("click", scrollToProducts);
  btnShare.addEventListener("click", scrollToShare);
}
function scrollToHelpAlgorithm() {
  const scrollHelpAlgorithm = document.querySelector(".content01");
  scrollHelpAlgorithm.scrollIntoView({ behavior: "smooth" });
}
function scrollToProducts() {
  const scrollProducts = document.getElementById("your-products");
  scrollProducts.scrollIntoView({ behavior: "smooth" });
}
function scrollToShare() {
  const scrollShare = document.getElementById("share");
  scrollShare.scrollIntoView({ behavior: "smooth" });
}
