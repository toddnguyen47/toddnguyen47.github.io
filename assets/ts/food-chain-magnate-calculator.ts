const BASE_UNIT_PRICE = 10;
const BASE_BONUS_PRICE = 5;

const MAX_ITEM_NO_GARDEN = 3;
const MAX_ITEM_WITH_GARDEN = 5;

const CLASS_HIDDEN_VISILIBITY = "hidden-visibility";

const KEY_PIZZA_BONUS = "fcm_PizzaBonus";
const KEY_BURGER_BONUS = "fcm_BurgerBonus";
const KEY_DRINKS_BONUS = "fcm_DrinksBonus";

const DELIMITER = "&";
const REGEX_WHITESPACES = new RegExp("\\s+", "g");

function calculateUnitPrice(
  hasLuxuriesManager: boolean,
  hasGarden: boolean,
  discounts: number,
): number {
  let unitPrice = BASE_UNIT_PRICE + discounts;
  if (hasLuxuriesManager) {
    unitPrice += 10;
  }
  if (hasGarden) {
    unitPrice *= 2;
  }
  return unitPrice;
}

function calculatePayout(
  hasPizzaBonus: boolean,
  hasBurgerBonus: boolean,
  hasDrinksBonus: boolean,
  unitPrice: number,
  hasGarden: boolean,
  numPizzas: number,
  numBurgers: number,
  numLemonade: number,
  numSodas: number,
  numBeers: number,
): number {
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

  function calculateItemPayout(quantity: number, hasBonus: boolean): number {
    let payout = quantity * unitPrice;
    if (hasBonus) {
      payout += quantity * BASE_BONUS_PRICE;
    }
    return payout;
  }

  const pizzaPayout = calculateItemPayout(numPizzas, hasPizzaBonus);
  const burgerPayout = calculateItemPayout(numBurgers, hasBurgerBonus);
  const drinksPayout = calculateItemPayout(totalDrinks, hasDrinksBonus);

  return pizzaPayout + burgerPayout + drinksPayout;
}

document.addEventListener("DOMContentLoaded", function () {
  const playerNameInput =
    document.querySelector<HTMLInputElement>("#player-name") ??
    new HTMLInputElement();
  const loadPlayerNameButton =
    document.querySelector<HTMLButtonElement>("#load-player-name-button") ??
    new HTMLButtonElement();
  const pizzaCheckbox =
    document.querySelector<HTMLInputElement>("#pizza-bonus-checkbox") ??
    new HTMLInputElement();
  const burgerCheckbox =
    document.querySelector<HTMLInputElement>("#burger-bonus-checkbox") ??
    new HTMLInputElement();
  const drinksCheckbox =
    document.querySelector<HTMLInputElement>("#drinks-bonus-checkbox") ??
    new HTMLInputElement();
  const perPlayerCheckboxes: [HTMLInputElement, string][] = [
    [pizzaCheckbox, KEY_PIZZA_BONUS],
    [burgerCheckbox, KEY_BURGER_BONUS],
    [drinksCheckbox, KEY_DRINKS_BONUS],
  ];
  const hasLuxuriesManagerElem =
    document.querySelector<HTMLInputElement>("#luxuries-manager-checkbox") ??
    new HTMLInputElement();
  const hasGardenElem =
    document.querySelector<HTMLInputElement>("#has-garden-checkbox") ??
    new HTMLInputElement();
  const discountElem =
    document.querySelector<HTMLSelectElement>("#discounts") ??
    new HTMLSelectElement();
  const unitPriceElem =
    document.querySelector<HTMLSpanElement>("#unit-price") ??
    new HTMLSpanElement();
  const pizzasElem =
    document.querySelector<HTMLSelectElement>("#pizzas") ??
    new HTMLSelectElement();
  const burgersElem =
    document.querySelector<HTMLSelectElement>("#burgers") ??
    new HTMLSelectElement();
  const lemonadesElem =
    document.querySelector<HTMLSelectElement>("#lemonades") ??
    new HTMLSelectElement();
  const sodasElem =
    document.querySelector<HTMLSelectElement>("#sodas") ??
    new HTMLSelectElement();
  const beersElem =
    document.querySelector<HTMLSelectElement>("#beers") ??
    new HTMLSelectElement();
  const calculateButton =
    document.querySelector<HTMLButtonElement>("#calculate-button") ??
    new HTMLButtonElement();
  const payoutSpan =
    document.querySelector<HTMLSpanElement>("#payout") ?? new HTMLSpanElement();
  const errorSpan =
    document.querySelector<HTMLSpanElement>("#calculate-error-message") ??
    new HTMLSpanElement();
  const resetFoodDrinksButton =
    document.querySelector<HTMLButtonElement>("#reset-food-drinks") ??
    new HTMLButtonElement();
  const resetAllButton =
    document.querySelector<HTMLButtonElement>("#reset-all-button") ??
    new HTMLButtonElement();

  function getInputTypeTextTrimmed(element: HTMLInputElement): string {
    const trimmedValue = element?.value.trim() ?? "";
    if (element) {
      element.value = trimmedValue;
    }
    return trimmedValue;
  }

  function loadCheckbox(
    checkbox: HTMLInputElement,
    localStorageKey: string,
  ): void {
    const formattedKey = getLocalStorageKey(
      getInputTypeTextTrimmed(playerNameInput),
      localStorageKey,
    );
    const storedChecked = localStorage.getItem(formattedKey);
    checkbox.checked = storedChecked === "true";
  }

  function getLocalStorageKey(playerName: string, key: string): string {
    playerName = playerName.replace(REGEX_WHITESPACES, "_");
    const tokens = key.split(DELIMITER);
    if (tokens[0].toUpperCase() === playerName.toUpperCase()) {
      return key;
    }
    return (playerName + DELIMITER + key).toUpperCase();
  }

  function loadAllPerPlayerCheckboxes(): void {
    for (const [checkbox, bonusKey] of perPlayerCheckboxes) {
      loadCheckbox(checkbox, bonusKey);
    }
  }

  function resetAllPerPlayerCheckboxes(): void {
    for (const [, bonusKey] of perPlayerCheckboxes) {
      const localStorageKey = getLocalStorageKey(
        getInputTypeTextTrimmed(playerNameInput),
        bonusKey,
      );
      localStorage.removeItem(localStorageKey);
    }
  }

  function addEventListenerPerPlayerCheckboxes(): void {
    for (const [checkbox, bonusKey] of perPlayerCheckboxes) {
      addOnChangeEventCheckbox(checkbox, bonusKey);
    }
  }

  function getSelectOption(selectInput: HTMLSelectElement): number {
    const selectedValue =
      selectInput?.options[selectInput.selectedIndex].value ?? "0";
    return parseInt(selectedValue);
  }

  function addOnChangeEventCheckbox(
    checkbox: HTMLInputElement,
    localStorageKey: string,
  ): void {
    checkbox?.addEventListener("change", function () {
      localStorageKey = getLocalStorageKey(
        getInputTypeTextTrimmed(playerNameInput),
        localStorageKey,
      );
      const checkedValue = checkbox?.checked ?? false;
      localStorage.setItem(localStorageKey, checkedValue.toString());
    });
  }

  function addOnChangeEventUnitPrice(inputElement: Element): void {
    inputElement?.addEventListener("change", function () {
      const discounts = getSelectOption(discountElem);
      const unitPrice = calculateUnitPrice(
        hasLuxuriesManagerElem?.checked,
        hasGardenElem?.checked,
        discounts,
      );
      unitPriceElem.textContent = unitPrice.toString();
    });
  }

  function resetFoodDrinks(): void {
    pizzasElem.value = "0";
    burgersElem.value = "0";
    lemonadesElem.value = "0";
    sodasElem.value = "0";
    beersElem.value = "0";
    payoutSpan.textContent = "0";
    hasGardenElem.checked = false;
    discountElem.value = "0";
  }

  addEventListenerPerPlayerCheckboxes();
  loadAllPerPlayerCheckboxes();

  addOnChangeEventUnitPrice(hasLuxuriesManagerElem);
  addOnChangeEventUnitPrice(hasGardenElem);
  addOnChangeEventUnitPrice(discountElem);

  loadPlayerNameButton?.addEventListener("click", function () {
    loadAllPerPlayerCheckboxes();
  });

  calculateButton?.addEventListener("click", function () {
    try {
      const payout = calculatePayout(
        pizzaCheckbox?.checked ?? false,
        burgerCheckbox?.checked ?? false,
        drinksCheckbox?.checked ?? false,
        parseInt(unitPriceElem?.textContent ?? "0"),
        hasGardenElem?.checked ?? false,
        getSelectOption(pizzasElem),
        getSelectOption(burgersElem),
        getSelectOption(lemonadesElem),
        getSelectOption(sodasElem),
        getSelectOption(beersElem),
      );
      payoutSpan.textContent = payout.toString();
      errorSpan?.classList.add(CLASS_HIDDEN_VISILIBITY);
    } catch (error: Error | any) {
      payoutSpan.textContent = "0";
      errorSpan.textContent = error.toString();
      errorSpan?.classList.remove(CLASS_HIDDEN_VISILIBITY);
      return;
    }
  });

  resetFoodDrinksButton?.addEventListener("click", function () {
    resetFoodDrinks();
  });

  resetAllButton?.addEventListener("click", function () {
    resetAllPerPlayerCheckboxes();
    pizzaCheckbox.checked = false;
    burgerCheckbox.checked = false;
    drinksCheckbox.checked = false;
    hasLuxuriesManagerElem.checked = false;
    unitPriceElem.textContent = BASE_UNIT_PRICE.toString(10);
    unitPriceElem.textContent = "10";
    resetFoodDrinks();
    errorSpan.classList.add(CLASS_HIDDEN_VISILIBITY);
  });
});
