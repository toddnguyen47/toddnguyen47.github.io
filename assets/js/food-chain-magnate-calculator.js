const BASE_UNIT_PRICE = 10;
const BASE_BONUS_PRICE = 5;

const MAX_ITEM_NO_GARDEN = 3;
const MAX_ITEM_WITH_GARDEN = 5;

const CLASS_HIDDEN_VISILIBITY = "hidden-visibility";

const KEY_PIZZA_BONUS = "fcm_PizzaBonus";
const KEY_BURGER_BONUS = "fcm_BurgerBonus";
const KEY_DRINKS_BONUS = "fcm_DrinksBonus";

function calculatePayout({
  hasPizzaBonus,
  hasBurgerBonus,
  hasDrinksBonus,
  hasLuxuriesManager,
  hasGarden,
  discounts,
  numPizzas,
  numBurgers,
  numLemonade,
  numSodas,
  numBeers,
}) {
  const totalDrinks = numLemonade + numSodas + numBeers;
  const totalPieces = numPizzas + numBurgers + totalDrinks;
  if (hasGarden && totalPieces > MAX_ITEM_WITH_GARDEN) {
    throw new Error(
      "A house with a garden cannot exceed " + MAX_ITEM_WITH_GARDEN + " items",
    );
  }
  if (totalPieces > MAX_ITEM_NO_GARDEN) {
    throw new Error(
      "A house without a garden cannot exceed " + MAX_ITEM_NO_GARDEN + " items",
    );
  }

  let unitPrice = BASE_UNIT_PRICE + discounts;

  if (hasLuxuriesManager) {
    unitPrice += 10;
  }

  if (hasGarden) {
    unitPrice *= 2;
  }

  const calculateItemPayout = (quantity, hasBonus) => {
    let payout = quantity * unitPrice;
    if (hasBonus) {
      payout += quantity * BASE_BONUS_PRICE;
    }
    return payout;
  };

  const pizzaPayout = calculateItemPayout(numPizzas, hasPizzaBonus);
  const burgerPayout = calculateItemPayout(numBurgers, hasBurgerBonus);
  const drinksPayout = calculateItemPayout(totalDrinks, hasDrinksBonus);

  return pizzaPayout + burgerPayout + drinksPayout;
}

document.addEventListener("DOMContentLoaded", function () {
  const addOnChangeEvent = (checkbox, localStorageKey) => {
    checkbox.addEventListener("change", function () {
      const checkedValue = checkbox.checked;
      localStorage.setItem(localStorageKey, checkedValue.toString());
    });
  };

  const loadCheckbox = (checkbox, localStorageKey) => {
    const storedChecked = localStorage.getItem(localStorageKey);
    checkbox.checked = storedChecked === "true";
  };

  const getSelectOption = (select) => {
    const text = select.options[select.selectedIndex].text;
    return parseInt(text);
  };

  const pizzaCheckbox = document.querySelector("#pizza-bonus-checkbox");
  addOnChangeEvent(pizzaCheckbox, KEY_PIZZA_BONUS);
  loadCheckbox(pizzaCheckbox, KEY_PIZZA_BONUS);
  const burgerCheckbox = document.querySelector("#burger-bonus-checkbox");
  addOnChangeEvent(burgerCheckbox, KEY_BURGER_BONUS);
  loadCheckbox(burgerCheckbox, KEY_BURGER_BONUS);
  const drinksCheckbox = document.querySelector("#drinks-bonus-checkbox");
  addOnChangeEvent(drinksCheckbox, KEY_DRINKS_BONUS);
  loadCheckbox(drinksCheckbox, KEY_DRINKS_BONUS);

  const hasLuxuriesManager = document.querySelector(
    "#luxuries-manager-checkbox",
  );
  const hasGarden = document.querySelector("#has-garden-checkbox");

  const discount = document.querySelector("#discounts");
  const pizzas = document.querySelector("#pizzas");
  const burgers = document.querySelector("#burgers");
  const lemonades = document.querySelector("#lemonades");
  const sodas = document.querySelector("#sodas");
  const beers = document.querySelector("#beers");

  const calculateButton = document.querySelector("#calculate-button");
  const payoutSpan = document.querySelector("#payout");
  const errorSpan = document.querySelector("#calculate-error-message");
  calculateButton.addEventListener("click", function () {
    try {
      const payout = calculatePayout({
        hasPizzaBonus: pizzaCheckbox.checked,
        hasBurgerBonus: burgerCheckbox.checked,
        hasDrinksBonus: drinksCheckbox.checked,
        hasLuxuriesManager: hasLuxuriesManager.checked,
        hasGarden: hasGarden.checked,
        discounts: getSelectOption(discount),
        numPizzas: getSelectOption(pizzas),
        numBurgers: getSelectOption(burgers),
        numLemonade: getSelectOption(lemonades),
        numSodas: getSelectOption(sodas),
        numBeers: getSelectOption(beers),
      });
      payoutSpan.textContent = payout;
      errorSpan.classList.add(CLASS_HIDDEN_VISILIBITY);
    } catch (error) {
      errorSpan.textContent = error;
      errorSpan.classList.remove(CLASS_HIDDEN_VISILIBITY);
      return;
    }
  });

  const resetButton = document.querySelector("#reset-button");
  resetButton.addEventListener("click", function () {
    localStorage.removeItem(KEY_PIZZA_BONUS);
    localStorage.removeItem(KEY_BURGER_BONUS);
    localStorage.removeItem(KEY_DRINKS_BONUS);

    pizzaCheckbox.checked = false;
    burgerCheckbox.checked = false;
    drinksCheckbox.checked = false;
    hasLuxuriesManager.checked = false;
    hasGarden.checked = false;
    discount.selectedIndex = 0;
    pizzas.selectedIndex = 0;
    burgers.selectedIndex = 0;
    lemonades.selectedIndex = 0;
    sodas.selectedIndex = 0;
    beers.selectedIndex = 0;
    payoutSpan.textContent = 0;
    errorSpan.classList.add(CLASS_HIDDEN_VISILIBITY);
  });
});
