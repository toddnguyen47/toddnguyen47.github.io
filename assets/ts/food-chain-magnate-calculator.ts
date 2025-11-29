const BASE_UNIT_PRICE = 10;
const BASE_BONUS_PRICE = 5;
const MAX_ITEM_NO_GARDEN = 3;
const MAX_ITEM_WITH_GARDEN = 5;
const NUM_PLAYERS = 5;
const NUM_MILESTONES = 18;
const NUM_1X_EMPLOYEES = 10;

const CLASS_HIDDEN_VISILIBITY = "hidden-visibility";

const KEY_PIZZA_BONUS = "fcm_PizzaBonus";
const KEY_BURGER_BONUS = "fcm_BurgerBonus";
const KEY_DRINKS_BONUS = "fcm_DrinksBonus";

const DELIMITER = "&";
const REGEX_WHITESPACES = new RegExp("\\s+", "g");

const NUM_PLAYERS_MAX_1X_EMPLOYEES: { [key: string]: number } = {
  "2": 1,
  "3": 1,
  "4": 2,
  "5": 3,
};

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
  class PlayerDiv {
    playerNumber: number;
    button: HTMLButtonElement;
    div: HTMLDivElement;
    constructor(
      playerNumber: number,
      button: HTMLButtonElement,
      div: HTMLDivElement,
    ) {
      this.playerNumber = playerNumber;
      this.button = button;
      this.div = div;
    }

    /**
     * Compares this User object to another object for value equality.
     * @param other The object to compare with.
     * @returns True if the objects are considered equal based on their properties, false otherwise.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    equals(other: any): boolean {
      if (this === other) {
        return true; // Same object reference
      }
      if (!(other instanceof PlayerDiv)) {
        return false; // Not an instance of User
      }

      // Compare properties for equality
      return this.playerNumber === other.playerNumber;
    }

    toggleActive(): void {
      this.button.classList.toggle("header-bg-color-secondary-bg");
      this.button.classList.toggle("header-bg-color-secondary-bg-inverted");

      this.div.classList.toggle("d-none");
    }
  }

  class PlayerDivState {
    previousActivePlayer: PlayerDiv | null;
    constructor() {
      this.previousActivePlayer = null;
    }

    loadPlayerSwitchingButton(playerNumber: number): void {
      const buttonId = "switch-button-player-" + playerNumber;
      const switchPlayerButton =
        document.querySelector<HTMLButtonElement>("#" + buttonId) ??
        new HTMLButtonElement();
      const divId = "div-player-" + playerNumber;
      const div =
        document.querySelector<HTMLDivElement>("#" + divId) ??
        new HTMLDivElement();
      const currentActivePlayer = new PlayerDiv(
        playerNumber,
        switchPlayerButton,
        div,
      );
      if (this.previousActivePlayer === null && playerNumber === 1) {
        this.previousActivePlayer = currentActivePlayer;
        currentActivePlayer.toggleActive();
      }

      switchPlayerButton?.addEventListener("click", () => {
        if (this.previousActivePlayer?.equals(currentActivePlayer)) {
          // Do nothing if the same player button is clicked
          return;
        }
        if (this.previousActivePlayer !== null) {
          // Hide previous player div
          this.previousActivePlayer.toggleActive();
        }
        currentActivePlayer.toggleActive();
        this.previousActivePlayer = currentActivePlayer;
      });
    }
  }

  const selectNumPlayers =
    document.querySelector<HTMLSelectElement>("#" + getNumberOfPlayersId()) ??
    new HTMLSelectElement();

  function load() {
    loadNumberOfPlayers();
    const playerDivState = new PlayerDivState();
    for (let i = 1; i <= NUM_PLAYERS; i++) {
      loadOnePlayer(i);
      playerDivState.loadPlayerSwitchingButton(i);
    }

    for (let i = 1; i <= NUM_MILESTONES; i++) {
      loadOneMilestone(i);
    }

    for (let i = 1; i <= NUM_1X_EMPLOYEES; i++) {
      loadOne1xEmployee(i);
    }
  }
  load();

  const milestoneResetButton =
    document.querySelector<HTMLButtonElement>("#reset-milestones") ??
    new HTMLButtonElement();
  milestoneResetButton.addEventListener("click", () => {
    for (let i = 1; i <= NUM_MILESTONES; i++) {
      const redXId = getMilestoneRedXId(i);
      localStorage.removeItem(redXId);
      const milestoneRedXImage =
        document.querySelector<HTMLImageElement>("#" + redXId) ??
        new HTMLImageElement();
      milestoneRedXImage.classList.remove("show");
    }
  });

  function loadOnePlayer(playerNumber: number): void {
    const playerNameInput =
      document.querySelector<HTMLInputElement>(
        "#player-name-" + playerNumber,
      ) ?? new HTMLInputElement();
    const loadPlayerNameButton =
      document.querySelector<HTMLButtonElement>(
        "#load-player-name-button-" + playerNumber,
      ) ?? new HTMLButtonElement();
    const pizzaCheckbox =
      document.querySelector<HTMLInputElement>(
        "#pizza-bonus-checkbox-" + playerNumber,
      ) ?? new HTMLInputElement();
    const burgerCheckbox =
      document.querySelector<HTMLInputElement>(
        "#burger-bonus-checkbox-" + playerNumber,
      ) ?? new HTMLInputElement();
    const drinksCheckbox =
      document.querySelector<HTMLInputElement>(
        "#drinks-bonus-checkbox-" + playerNumber,
      ) ?? new HTMLInputElement();
    const perPlayerCheckboxes: [HTMLInputElement, string][] = [
      [pizzaCheckbox, KEY_PIZZA_BONUS],
      [burgerCheckbox, KEY_BURGER_BONUS],
      [drinksCheckbox, KEY_DRINKS_BONUS],
    ];
    const hasLuxuriesManagerElem =
      document.querySelector<HTMLInputElement>(
        "#luxuries-manager-checkbox-" + playerNumber,
      ) ?? new HTMLInputElement();
    const hasGardenElem =
      document.querySelector<HTMLInputElement>(
        "#has-garden-checkbox-" + playerNumber,
      ) ?? new HTMLInputElement();
    const discountElem =
      document.querySelector<HTMLSelectElement>("#discounts-" + playerNumber) ??
      new HTMLSelectElement();
    const unitPriceElem =
      document.querySelector<HTMLSpanElement>("#unit-price-" + playerNumber) ??
      new HTMLSpanElement();
    const pizzasElem =
      document.querySelector<HTMLSelectElement>("#pizzas-" + playerNumber) ??
      new HTMLSelectElement();
    const burgersElem =
      document.querySelector<HTMLSelectElement>("#burgers-" + playerNumber) ??
      new HTMLSelectElement();
    const lemonadesElem =
      document.querySelector<HTMLSelectElement>("#lemonades-" + playerNumber) ??
      new HTMLSelectElement();
    const sodasElem =
      document.querySelector<HTMLSelectElement>("#sodas-" + playerNumber) ??
      new HTMLSelectElement();
    const beersElem =
      document.querySelector<HTMLSelectElement>("#beers-" + playerNumber) ??
      new HTMLSelectElement();
    const calculateButton =
      document.querySelector<HTMLButtonElement>(
        "#calculate-button-" + playerNumber,
      ) ?? new HTMLButtonElement();
    const payoutSpan =
      document.querySelector<HTMLSpanElement>("#payout-" + playerNumber) ??
      new HTMLSpanElement();
    const errorSpan =
      document.querySelector<HTMLSpanElement>(
        "#calculate-error-message-" + playerNumber,
      ) ?? new HTMLSpanElement();
    const resetFoodDrinksButton =
      document.querySelector<HTMLButtonElement>(
        "#reset-food-drinks-" + playerNumber,
      ) ?? new HTMLButtonElement();
    const resetAllButton =
      document.querySelector<HTMLButtonElement>(
        "#reset-all-button-" + playerNumber,
      ) ?? new HTMLButtonElement();

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

    function setUnitPrice(): void {
      const discounts = getSelectOption(discountElem);
      const unitPrice = calculateUnitPrice(
        hasLuxuriesManagerElem?.checked,
        hasGardenElem?.checked,
        discounts,
      );
      unitPriceElem.textContent = unitPrice.toString();
    }

    function addOnChangeEventUnitPrice(inputElement: Element): void {
      inputElement?.addEventListener("change", () => {
        setUnitPrice();
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
      // Calculate last
      setUnitPrice();
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
      } catch (error: Error | unknown) {
        if (error instanceof Error) {
          payoutSpan.textContent = "0";
          errorSpan.textContent = error.toString();
          errorSpan?.classList.remove(CLASS_HIDDEN_VISILIBITY);
        } else {
          console.error("An unknown error occurred during calculation.");
        }
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
      discountElem.selectedIndex = 0;
      errorSpan.classList.add(CLASS_HIDDEN_VISILIBITY);
      // Calculate last
      resetFoodDrinks();
    });
  }

  function leftPad(n: number): string {
    const x = Math.floor(n);
    return x < 10 ? "0" + x : String(x);
  }

  function loadOneMilestone(milestoneNumber: number): void {
    const paddedNumber = leftPad(milestoneNumber);
    const id = "milestone-" + paddedNumber;
    const milestoneImage =
      document.querySelector<HTMLImageElement>("#" + id) ??
      new HTMLImageElement();
    const redXId = getMilestoneRedXId(milestoneNumber);
    const milestoneRedXImage =
      document.querySelector<HTMLImageElement>("#" + redXId) ??
      new HTMLImageElement();
    if (localStorage.getItem(redXId) === "true") {
      milestoneRedXImage.classList.toggle("show");
    }

    milestoneImage.addEventListener("click", () => {
      milestoneRedXImage.classList.toggle("show");
      localStorage.setItem(
        redXId,
        String(milestoneRedXImage.classList.contains("show")),
      );
    });
  }

  function loadOne1xEmployee(employeeNumber: number): void {
    const paddedNumber = leftPad(employeeNumber);
    const id = "employee-1x-" + paddedNumber;
    const employeeImage =
      document.querySelector<HTMLImageElement>("#" + id) ??
      new HTMLImageElement();
    const redTextIds = get1xEmployeeRedTextId(employeeNumber);
    const employee1xDiv =
      document.querySelector<HTMLDivElement>("#" + redTextIds[0]) ??
      new HTMLDivElement();
    const redXImage =
      document.querySelector<HTMLImageElement>("#" + redTextIds[1]) ??
      new HTMLImageElement();
    const redTextId = redTextIds[0];
    setEmployee1xValue(
      employee1xDiv,
      redXImage,
      parseInt(localStorage.getItem(redTextIds[0]) ?? "3"),
    );

    employeeImage.addEventListener("click", () => {
      let currentValue = parseInt(employee1xDiv.textContent ?? "0");
      currentValue -= 1;
      if (currentValue < 0) {
        currentValue = get1xMaxEmployees();
      }
      setEmployee1xValue(employee1xDiv, redXImage, currentValue);
      localStorage.setItem(redTextId, employee1xDiv.textContent);
    });

    employee1xDiv.addEventListener("click", () => {
      let currentValue = parseInt(employee1xDiv.textContent ?? "0");
      currentValue += 1;
      if (currentValue > get1xMaxEmployees()) {
        currentValue = 0;
      }
      setEmployee1xValue(employee1xDiv, redXImage, currentValue);
      localStorage.setItem(redTextId, employee1xDiv.textContent);
    });
  }

  function loadNumberOfPlayers(): void {
    const id = getNumberOfPlayersId();
    const selectedValue = localStorage.getItem(id) ?? "5";
    selectNumPlayers.value = selectedValue;

    selectNumPlayers?.addEventListener("change", () => {
      const selectedValue =
        selectNumPlayers?.options[selectNumPlayers.selectedIndex].value ?? "2";
      const numPlayers = parseInt(selectedValue);
      localStorage.setItem(id, numPlayers.toString());

      // Update all 1x employees' max values based on number of players
      for (let i = 1; i <= NUM_1X_EMPLOYEES; i++) {
        const redTextIds = get1xEmployeeRedTextId(i);
        const employee1xDiv =
          document.querySelector<HTMLDivElement>("#" + redTextIds[0]) ??
          new HTMLDivElement();
        const redXImage =
          document.querySelector<HTMLImageElement>("#" + redTextIds[1]) ??
          new HTMLImageElement();
        const max1xEmployees = NUM_PLAYERS_MAX_1X_EMPLOYEES[selectedValue] ?? 3;
        setEmployee1xValue(employee1xDiv, redXImage, max1xEmployees);
        localStorage.setItem(redTextIds[0], employee1xDiv.textContent);
      }
    });
  }

  function getMilestoneRedXId(milestoneNumber: number): string {
    const paddedNumber = leftPad(milestoneNumber);
    return "milestone-red-x-" + paddedNumber;
  }

  function get1xEmployeeRedTextId(employeeNumber: number): [string, string] {
    const paddedNumber = leftPad(employeeNumber);
    return [
      "employee-1x-text-" + paddedNumber,
      "employee-1x-red-x-" + paddedNumber,
    ];
  }

  function getNumberOfPlayersId() {
    return "num-players";
  }

  function get1xMaxEmployees(): number {
    return NUM_PLAYERS_MAX_1X_EMPLOYEES[
      localStorage.getItem(getNumberOfPlayersId()) ?? "5"
    ];
  }

  function setEmployee1xValue(
    textDiv: HTMLDivElement,
    redXImg: HTMLImageElement,
    value: number,
  ): void {
    textDiv.textContent = value.toString();
    if (value === 0) {
      textDiv.classList.add("red");
      redXImg.classList.add("show");
    } else {
      textDiv.classList.remove("red");
      redXImg.classList.remove("show");
    }
  }
});
