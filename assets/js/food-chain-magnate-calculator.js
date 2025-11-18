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

document.addEventListener("DOMContentLoaded", function () {
  const pizzaCheckbox = document.querySelector("#pizza-bonus-checkbox");
  const burgerCheckbox = document.querySelector("#burger-bonus-checkbox");
  const drinksCheckbox = document.querySelector("#drinks-bonus-checkbox");
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
  const payoutSpan = document.querySelector("#payout");
  const errorSpan = document.querySelector("#calculate-error-message");
  const resetButton = document.querySelector("#reset-button");

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
      calculatePayout();
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
      calculatePayout();
    });
  };

  const calculatePayout = () => {
    const numPizzas = getSelectOption(pizzasElem);
    const numBurgers = getSelectOption(burgersElem);
    const numLemonade = getSelectOption(lemonadesElem);
    const numSodas = getSelectOption(sodasElem);
    const numBeers = getSelectOption(beersElem);
    const totalDrinks = numLemonade + numSodas + numBeers;
    const totalPieces = numPizzas + numBurgers + totalDrinks;
    const hasGarden = hasGardenElem.checked;
    if (hasGarden && totalPieces > MAX_ITEM_WITH_GARDEN) {
      setErrorMessage(
        "A house with a garden cannot exceed " +
          MAX_ITEM_WITH_GARDEN +
          " items",
      );
      return;
    } else if (!hasGarden && totalPieces > MAX_ITEM_NO_GARDEN) {
      setErrorMessage(
        "A house without a garden cannot exceed " +
          MAX_ITEM_NO_GARDEN +
          " items",
      );
      return;
    }

    const calculateItemPayout = (quantity, hasBonus) => {
      let payout = quantity * parseInt(unitPriceElem.textContent);
      if (hasBonus) {
        payout += quantity * BASE_BONUS_PRICE;
      }
      return payout;
    };

    const pizzaPayout = calculateItemPayout(numPizzas, pizzaCheckbox.checked);
    const burgerPayout = calculateItemPayout(
      numBurgers,
      burgerCheckbox.checked,
    );
    const drinksPayout = calculateItemPayout(
      totalDrinks,
      drinksCheckbox.checked,
    );

    const payout = pizzaPayout + burgerPayout + drinksPayout;
    payoutSpan.textContent = payout;
    errorSpan.classList.add(CLASS_HIDDEN_VISILIBITY);
  };

  const setErrorMessage = (errorMessage) => {
    errorSpan.textContent = errorMessage;
    errorSpan.classList.remove(CLASS_HIDDEN_VISILIBITY);
    payoutSpan.textContent = 0;
  };

  const checkboxes = [
    [pizzaCheckbox, KEY_PIZZA_BONUS],
    [burgerCheckbox, KEY_BURGER_BONUS],
    [drinksCheckbox, KEY_DRINKS_BONUS],
  ];
  for (const [checkbox, key] of checkboxes) {
    addOnChangeEventCheckbox(checkbox, key);
    loadCheckbox(checkbox, key);
  }

  const unitPriceElems = [hasLuxuriesManagerElem, hasGardenElem, discountElem];
  for (const elem of unitPriceElems) {
    addOnChangeEventUnitPrice(elem);
  }

  const foodElems = [
    pizzasElem,
    burgersElem,
    lemonadesElem,
    sodasElem,
    beersElem,
  ];
  for (const elem of foodElems) {
    elem.addEventListener("change", function () {
      calculatePayout();
    });
  }

  resetButton.addEventListener("click", function () {
    localStorage.removeItem(KEY_PIZZA_BONUS);
    localStorage.removeItem(KEY_BURGER_BONUS);
    localStorage.removeItem(KEY_DRINKS_BONUS);

    pizzaCheckbox.checked = false;
    burgerCheckbox.checked = false;
    drinksCheckbox.checked = false;
    hasLuxuriesManagerElem.checked = false;
    hasGardenElem.checked = false;
    discountElem.selectedIndex = 0;
    unitPriceElem.textContent = BASE_UNIT_PRICE;
    unitPriceElem.textContent = 10;
    pizzasElem.selectedIndex = 0;
    burgersElem.selectedIndex = 0;
    lemonadesElem.selectedIndex = 0;
    sodasElem.selectedIndex = 0;
    beersElem.selectedIndex = 0;
    payoutSpan.textContent = 0;
    errorSpan.classList.add(CLASS_HIDDEN_VISILIBITY);
  });
});
