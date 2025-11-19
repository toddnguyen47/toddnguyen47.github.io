const BASE_UNIT_PRICE = 10;
const BASE_BONUS_PRICE = 5;

const MAX_ITEM_NO_GARDEN = 3;
const MAX_ITEM_WITH_GARDEN = 5;

const CLASS_HIDDEN_VISILIBITY = "hidden-visibility";

const KEY_PIZZA_BONUS = "fcm_PizzaBonus";
const KEY_BURGER_BONUS = "fcm_BurgerBonus";
const KEY_DRINKS_BONUS = "fcm_DrinksBonus";

const calculateUnitPrice = ({ hasLuxuriesManager, hasGarden, discounts }) => {
  let unitPrice = BASE_UNIT_PRICE + discounts;
  if (hasLuxuriesManager) {
    unitPrice += 10;
  }
  if (hasGarden) {
    unitPrice *= 2;
  }
  return unitPrice;
};

const calculatePayout = ({
  hasPizzaBonus,
  hasBurgerBonus,
  hasDrinksBonus,
  unitPrice,
  hasGarden,
  numPizzas,
  numBurgers,
  numLemonade,
  numSodas,
  numBeers,
}) => {
  const totalDrinks = numLemonade + numSodas + numBeers;
  const totalPieces = numPizzas + numBurgers + totalDrinks;
  if (hasGarden && totalPieces > MAX_ITEM_WITH_GARDEN) {
    throw new Error(
      "A house with a garden cannot exceed " + MAX_ITEM_WITH_GARDEN + " items",
    );
  } else if (!hasGarden && totalPieces > MAX_ITEM_NO_GARDEN) {
    throw new Error(
      "A house without a garden cannot exceed " + MAX_ITEM_NO_GARDEN + " items",
    );
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
};

document.addEventListener("DOMContentLoaded", function () {
  const loadCheckbox = (checkbox, localStorageKey) => {
    const storedChecked = localStorage.getItem(localStorageKey);
    checkbox.checked = storedChecked === "true";
  };

  const getSelectOption = (selectInput) => {
    const selectedValue = selectInput.options[selectInput.selectedIndex].value;
    return parseInt(selectedValue);
  };

  const addOnChangeEventCheckbox = (checkbox, localStorageKey) => {
    checkbox.addEventListener("change", function () {
      const checkedValue = checkbox.checked;
      localStorage.setItem(localStorageKey, checkedValue.toString());
    });
  };

  const addOnChangeEventUnitPrice = (element) => {
    element.addEventListener("change", function () {
      const discounts = getSelectOption(discountElem);
      const unitPrice = calculateUnitPrice({
        hasLuxuriesManager: hasLuxuriesManagerElem.checked,
        hasGarden: hasGardenElem.checked,
        discounts: discounts,
      });
      unitPriceElem.textContent = unitPrice;
    });
  };

  const resetFoodDrinks = function () {
    pizzasElem.value = "0";
    burgersElem.value = "0";
    lemonadesElem.value = "0";
    sodasElem.value = "0";
    beersElem.value = "0";
    payoutSpan.textContent = 0;
    hasGardenElem.checked = false;
  };

  const pizzaCheckbox = document.querySelector("#pizza-bonus-checkbox");
  addOnChangeEventCheckbox(pizzaCheckbox, KEY_PIZZA_BONUS);
  loadCheckbox(pizzaCheckbox, KEY_PIZZA_BONUS);
  const burgerCheckbox = document.querySelector("#burger-bonus-checkbox");
  addOnChangeEventCheckbox(burgerCheckbox, KEY_BURGER_BONUS);
  loadCheckbox(burgerCheckbox, KEY_BURGER_BONUS);
  const drinksCheckbox = document.querySelector("#drinks-bonus-checkbox");
  addOnChangeEventCheckbox(drinksCheckbox, KEY_DRINKS_BONUS);
  loadCheckbox(drinksCheckbox, KEY_DRINKS_BONUS);

  const hasLuxuriesManagerElem = document.querySelector(
    "#luxuries-manager-checkbox",
  );
  const hasGardenElem = document.querySelector("#has-garden-checkbox");
  const discountElem = document.querySelector("#discounts");
  const unitPriceElem = document.querySelector("#unit-price");
  const pizzasElem = document.querySelector("#pizzas");
  const burgersElem = document.querySelector("#burgers");
  const lemonadesElem = document.querySelector("#lemonades");
  const sodasElem = document.querySelector("#sodas");
  const beersElem = document.querySelector("#beers");
  const calculateButton = document.querySelector("#calculate-button");
  const payoutSpan = document.querySelector("#payout");
  const errorSpan = document.querySelector("#calculate-error-message");
  const resetFoodDrinksButton = document.querySelector("#reset-food-drinks");
  const resetAllButton = document.querySelector("#reset-all-button");

  addOnChangeEventUnitPrice(hasLuxuriesManagerElem);
  addOnChangeEventUnitPrice(hasGardenElem);
  addOnChangeEventUnitPrice(discountElem);

  calculateButton.addEventListener("click", function () {
    try {
      const payout = calculatePayout({
        hasPizzaBonus: pizzaCheckbox.checked,
        hasBurgerBonus: burgerCheckbox.checked,
        hasDrinksBonus: drinksCheckbox.checked,
        unitPrice: parseInt(unitPriceElem.textContent),
        hasGarden: hasGardenElem.checked,
        numPizzas: getSelectOption(pizzasElem),
        numBurgers: getSelectOption(burgersElem),
        numLemonade: getSelectOption(lemonadesElem),
        numSodas: getSelectOption(sodasElem),
        numBeers: getSelectOption(beersElem),
      });
      payoutSpan.textContent = payout;
      errorSpan.classList.add(CLASS_HIDDEN_VISILIBITY);
    } catch (error) {
      payoutSpan.textContent = 0;
      errorSpan.textContent = error;
      errorSpan.classList.remove(CLASS_HIDDEN_VISILIBITY);
      return;
    }
  });

  resetFoodDrinksButton.addEventListener("click", function () {
    resetFoodDrinks();
  });

  resetAllButton.addEventListener("click", function () {
    localStorage.removeItem(KEY_PIZZA_BONUS);
    localStorage.removeItem(KEY_BURGER_BONUS);
    localStorage.removeItem(KEY_DRINKS_BONUS);

    pizzaCheckbox.checked = false;
    burgerCheckbox.checked = false;
    drinksCheckbox.checked = false;
    hasLuxuriesManagerElem.checked = false;
    discountElem.selectedIndex = 0;
    unitPriceElem.textContent = BASE_UNIT_PRICE;
    unitPriceElem.textContent = 10;
    resetFoodDrinks();
    errorSpan.classList.add(CLASS_HIDDEN_VISILIBITY);
  });
});
