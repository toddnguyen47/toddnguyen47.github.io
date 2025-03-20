const BUTTON_TEXT_SHOW_MORE = "Show More";
const BUTTON_TEXT_SHOW_LESS = "Show Less";

const toggleList = (event) => {
    // console.log(event);
    // const listItems = document.querySelectorAll("#myList li");
    // const button = document.querySelector(".expand-btn");
    // const isExpanded = button.innerText === "Show Less";

    // listItems.forEach((item, index) => {
    //     if (index >= 3) {
    //         if (isExpanded) {
    //             item.style.opacity = "0";
    //             item.style.transform = "translateY(-5px)";
    //             setTimeout(() => (item.style.display = "none"), 300);
    //         } else {
    //             item.style.display = "list-item";
    //             setTimeout(() => {
    //                 item.style.opacity = "1";
    //                 item.style.transform = "translateY(0)";
    //             }, 10);
    //         }
    //     }
    // });

    // button.innerText = isExpanded ? "Show More" : "Show Less";

    const parent = event.target.parentElement;
    const ul = parent.querySelector('.expandable-list');
    const listItems = ul.querySelectorAll('li');
    const button = event.target;
    const isExpanded = button.innerText === BUTTON_TEXT_SHOW_LESS;
    for (let i = 0; i < listItems.length; i++) {
        const item = listItems[i];
        // Apply animation beyond the first 3
        if (i >= 3) {
            if (isExpanded) {
                item.style.opacity = "0";
                item.style.transform = "translateY(-5px)";
                setTimeout(() => (item.style.display = "none"), 300);
            } else {
                item.style.display = "list-item";
                setTimeout(() => {
                    item.style.opacity = "1";
                    item.style.transform = "translateY(0)";
                }, 10);
            }
            item.classList.add("visible");
        }
    }

    button.innerText = isExpanded ? BUTTON_TEXT_SHOW_MORE : BUTTON_TEXT_SHOW_LESS;
}
