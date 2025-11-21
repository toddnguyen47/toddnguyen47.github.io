"use strict";
const BASE_UNIT_PRICE = 10;
const BASE_BONUS_PRICE = 5;
const MAX_ITEM_NO_GARDEN = 3;
const MAX_ITEM_WITH_GARDEN = 5;
const CLASS_HIDDEN_VISILIBITY = "hidden-visibility";
const KEY_PIZZA_BONUS = "fcm_PizzaBonus";
const KEY_BURGER_BONUS = "fcm_BurgerBonus";
const KEY_DRINKS_BONUS = "fcm_DrinksBonus";
const REGEX_WHITESPACES = new RegExp("\\s+", "g");
function calculateUnitPrice(hasLuxuriesManager, hasGarden, discounts) {
    let unitPrice = BASE_UNIT_PRICE + discounts;
    if (hasLuxuriesManager) {
        unitPrice += 10;
    }
    if (hasGarden) {
        unitPrice *= 2;
    }
    return unitPrice;
}
;
function calculatePayout(hasPizzaBonus, hasBurgerBonus, hasDrinksBonus, unitPrice, hasGarden, numPizzas, numBurgers, numLemonade, numSodas, numBeers) {
    const totalDrinks = numLemonade + numSodas + numBeers;
    const totalPieces = numPizzas + numBurgers + totalDrinks;
    if (hasGarden && totalPieces > MAX_ITEM_WITH_GARDEN) {
        throw new Error("A house with a garden cannot exceed " + MAX_ITEM_WITH_GARDEN + " items");
    }
    else if (!hasGarden && totalPieces > MAX_ITEM_NO_GARDEN) {
        throw new Error("A house without a garden cannot exceed " + MAX_ITEM_NO_GARDEN + " items");
    }
    function calculateItemPayout(quantity, hasBonus) {
        let payout = quantity * unitPrice;
        if (hasBonus) {
            payout += quantity * BASE_BONUS_PRICE;
        }
        return payout;
    }
    ;
    const pizzaPayout = calculateItemPayout(numPizzas, hasPizzaBonus);
    const burgerPayout = calculateItemPayout(numBurgers, hasBurgerBonus);
    const drinksPayout = calculateItemPayout(totalDrinks, hasDrinksBonus);
    return pizzaPayout + burgerPayout + drinksPayout;
}
;
document.addEventListener("DOMContentLoaded", function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    const playerNameInput = (_a = document.querySelector("#player-name")) !== null && _a !== void 0 ? _a : new HTMLInputElement();
    const loadPlayerNameButton = (_b = document.querySelector("#load-player-name-button")) !== null && _b !== void 0 ? _b : new HTMLButtonElement();
    const pizzaCheckbox = (_c = document.querySelector("#pizza-bonus-checkbox")) !== null && _c !== void 0 ? _c : new HTMLInputElement();
    const burgerCheckbox = (_d = document.querySelector("#burger-bonus-checkbox")) !== null && _d !== void 0 ? _d : new HTMLInputElement();
    const drinksCheckbox = (_e = document.querySelector("#drinks-bonus-checkbox")) !== null && _e !== void 0 ? _e : new HTMLInputElement();
    const perPlayerCheckboxes = [
        [pizzaCheckbox, KEY_PIZZA_BONUS],
        [burgerCheckbox, KEY_BURGER_BONUS],
        [drinksCheckbox, KEY_DRINKS_BONUS],
    ];
    const hasLuxuriesManagerElem = (_f = document.querySelector("#luxuries-manager-checkbox")) !== null && _f !== void 0 ? _f : new HTMLInputElement();
    const hasGardenElem = (_g = document.querySelector("#has-garden-checkbox")) !== null && _g !== void 0 ? _g : new HTMLInputElement();
    const discountElem = (_h = document.querySelector("#discounts")) !== null && _h !== void 0 ? _h : new HTMLSelectElement();
    const unitPriceElem = (_j = document.querySelector("#unit-price")) !== null && _j !== void 0 ? _j : new HTMLSpanElement();
    const pizzasElem = (_k = document.querySelector("#pizzas")) !== null && _k !== void 0 ? _k : new HTMLSelectElement();
    const burgersElem = (_l = document.querySelector("#burgers")) !== null && _l !== void 0 ? _l : new HTMLSelectElement();
    const lemonadesElem = (_m = document.querySelector("#lemonades")) !== null && _m !== void 0 ? _m : new HTMLSelectElement();
    const sodasElem = (_o = document.querySelector("#sodas")) !== null && _o !== void 0 ? _o : new HTMLSelectElement();
    const beersElem = (_p = document.querySelector("#beers")) !== null && _p !== void 0 ? _p : new HTMLSelectElement();
    const calculateButton = (_q = document.querySelector("#calculate-button")) !== null && _q !== void 0 ? _q : new HTMLButtonElement();
    const payoutSpan = (_r = document.querySelector("#payout")) !== null && _r !== void 0 ? _r : new HTMLSpanElement();
    const errorSpan = (_s = document.querySelector("#calculate-error-message")) !== null && _s !== void 0 ? _s : new HTMLSpanElement();
    const resetFoodDrinksButton = (_t = document.querySelector("#reset-food-drinks")) !== null && _t !== void 0 ? _t : new HTMLButtonElement();
    const resetAllButton = (_u = document.querySelector("#reset-all-button")) !== null && _u !== void 0 ? _u : new HTMLButtonElement();
    function getInputTypeTextTrimmed(element) {
        var _a;
        const trimmedValue = (_a = element === null || element === void 0 ? void 0 : element.value.trim()) !== null && _a !== void 0 ? _a : "";
        if (element) {
            element.value = trimmedValue;
        }
        return trimmedValue;
    }
    ;
    function loadCheckbox(checkbox, localStorageKey) {
        localStorageKey = getLocalStorageKey(getInputTypeTextTrimmed(playerNameInput), localStorageKey);
        const storedChecked = localStorage.getItem(localStorageKey);
        checkbox.checked = storedChecked === "true";
    }
    ;
    function getLocalStorageKey(playerName, key) {
        playerName = playerName.replace(REGEX_WHITESPACES, "_");
        playerName = playerName + "&" + key;
        playerName = playerName.toUpperCase();
        return playerName;
    }
    ;
    function loadAllPerPlayerCheckboxes() {
        for (const [checkbox, bonusKey] of perPlayerCheckboxes) {
            loadCheckbox(checkbox, bonusKey);
        }
    }
    ;
    function resetAllPerPlayerCheckboxes() {
        for (const [, bonusKey] of perPlayerCheckboxes) {
            const localStorageKey = getLocalStorageKey(getInputTypeTextTrimmed(playerNameInput), bonusKey);
            localStorage.removeItem(localStorageKey);
        }
    }
    ;
    function addEventListenerPerPlayerCheckboxes() {
        for (const [checkbox, bonusKey] of perPlayerCheckboxes) {
            addOnChangeEventCheckbox(checkbox, bonusKey);
        }
    }
    ;
    function getSelectOption(selectInput) {
        var _a;
        const selectedValue = (_a = selectInput === null || selectInput === void 0 ? void 0 : selectInput.options[selectInput.selectedIndex].value) !== null && _a !== void 0 ? _a : "0";
        return parseInt(selectedValue);
    }
    ;
    function addOnChangeEventCheckbox(checkbox, localStorageKey) {
        checkbox === null || checkbox === void 0 ? void 0 : checkbox.addEventListener("change", function () {
            var _a;
            localStorageKey = getLocalStorageKey(getInputTypeTextTrimmed(playerNameInput), localStorageKey);
            const htmlCheckbox = checkbox;
            const checkedValue = (_a = htmlCheckbox === null || htmlCheckbox === void 0 ? void 0 : htmlCheckbox.checked) !== null && _a !== void 0 ? _a : false;
            localStorage.setItem(localStorageKey, checkedValue.toString());
        });
    }
    ;
    function addOnChangeEventUnitPrice(element) {
        element === null || element === void 0 ? void 0 : element.addEventListener("change", function () {
            const discounts = getSelectOption(discountElem);
            const unitPrice = calculateUnitPrice(hasLuxuriesManagerElem === null || hasLuxuriesManagerElem === void 0 ? void 0 : hasLuxuriesManagerElem.checked, hasGardenElem === null || hasGardenElem === void 0 ? void 0 : hasGardenElem.checked, discounts);
            const htmlUnitPriceElem = unitPriceElem;
            htmlUnitPriceElem.textContent = unitPrice.toString();
        });
    }
    ;
    function resetFoodDrinks() {
        pizzasElem.value = "0";
        burgersElem.value = "0";
        lemonadesElem.value = "0";
        sodasElem.value = "0";
        beersElem.value = "0";
        payoutSpan.textContent = "0";
        hasGardenElem.checked = false;
    }
    ;
    addEventListenerPerPlayerCheckboxes();
    loadAllPerPlayerCheckboxes();
    addOnChangeEventUnitPrice(hasLuxuriesManagerElem);
    addOnChangeEventUnitPrice(hasGardenElem);
    addOnChangeEventUnitPrice(discountElem);
    loadPlayerNameButton === null || loadPlayerNameButton === void 0 ? void 0 : loadPlayerNameButton.addEventListener("click", function () {
        loadAllPerPlayerCheckboxes();
    });
    calculateButton === null || calculateButton === void 0 ? void 0 : calculateButton.addEventListener("click", function () {
        var _a, _b, _c, _d, _e;
        try {
            const payout = calculatePayout((_a = pizzaCheckbox === null || pizzaCheckbox === void 0 ? void 0 : pizzaCheckbox.checked) !== null && _a !== void 0 ? _a : false, (_b = burgerCheckbox === null || burgerCheckbox === void 0 ? void 0 : burgerCheckbox.checked) !== null && _b !== void 0 ? _b : false, (_c = drinksCheckbox === null || drinksCheckbox === void 0 ? void 0 : drinksCheckbox.checked) !== null && _c !== void 0 ? _c : false, parseInt((_d = unitPriceElem === null || unitPriceElem === void 0 ? void 0 : unitPriceElem.textContent) !== null && _d !== void 0 ? _d : "0"), (_e = hasGardenElem === null || hasGardenElem === void 0 ? void 0 : hasGardenElem.checked) !== null && _e !== void 0 ? _e : false, getSelectOption(pizzasElem), getSelectOption(burgersElem), getSelectOption(lemonadesElem), getSelectOption(sodasElem), getSelectOption(beersElem));
            payoutSpan.textContent = payout.toString();
            errorSpan === null || errorSpan === void 0 ? void 0 : errorSpan.classList.add(CLASS_HIDDEN_VISILIBITY);
        }
        catch (error) {
            payoutSpan.textContent = "0";
            errorSpan.textContent = error.toString();
            errorSpan === null || errorSpan === void 0 ? void 0 : errorSpan.classList.remove(CLASS_HIDDEN_VISILIBITY);
            return;
        }
    });
    resetFoodDrinksButton === null || resetFoodDrinksButton === void 0 ? void 0 : resetFoodDrinksButton.addEventListener("click", function () {
        resetFoodDrinks();
    });
    resetAllButton === null || resetAllButton === void 0 ? void 0 : resetAllButton.addEventListener("click", function () {
        resetAllPerPlayerCheckboxes();
        pizzaCheckbox.checked = false;
        burgerCheckbox.checked = false;
        drinksCheckbox.checked = false;
        hasLuxuriesManagerElem.checked = false;
        discountElem.selectedIndex = 0;
        unitPriceElem.textContent = BASE_UNIT_PRICE.toString(10);
        unitPriceElem.textContent = "10";
        resetFoodDrinks();
        errorSpan.classList.add(CLASS_HIDDEN_VISILIBITY);
    });
});
