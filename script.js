// ======================================================
// BEIJING SMOKE VISUALIZER
// ======================================================

// ------------------------------------------------------
// ELEMENTS
// ------------------------------------------------------

const smokeSlots = document.querySelectorAll(".smokeSlot");
const smokeButtons = document.querySelectorAll(".smokeButton");

const deleteButton = document.getElementById("deleteButton");
const resetButton = document.getElementById("resetButton");

// ------------------------------------------------------
// SMOKE IMAGES
// ------------------------------------------------------

const smokeImages = {
    1: "Images/LeftSmoke.png",
    2: "Images/CenterSmoke.png",
    3: "Images/RightSmoke.png"
};

// ------------------------------------------------------
// PLACEMENT HISTORY
// ------------------------------------------------------

let placementHistory = [];


// ======================================================
// PLACE SMOKE
// ======================================================

function placeSmoke(number) {

    // Find the next empty slot
    const emptySlot = Array.from(smokeSlots).find(
        slot => !slot.classList.contains("filled")
    );

    // Board is full
    if (!emptySlot) {
        return;
    }

    // Create smoke image
    const image = document.createElement("img");

    image.src = smokeImages[number];

    image.alt =
        number === 1
            ? "Left Smoke"
            : number === 2
                ? "Center Smoke"
                : "Right Smoke";

    // Put smoke into slot
    emptySlot.appendChild(image);

    emptySlot.classList.add("filled");

    // Remember what was placed
    placementHistory.push({
        slot: emptySlot,
        number: number
    });
}


// ======================================================
// DELETE LAST SMOKE
// ======================================================

function deleteLastSmoke() {

    if (placementHistory.length === 0) {
        return;
    }

    const lastPlacement =
        placementHistory.pop();

    const slot = lastPlacement.slot;

    slot.innerHTML = "";

    slot.classList.remove("filled");
}


// ======================================================
// RESET
// ======================================================

function resetVisualizer() {

    smokeSlots.forEach(slot => {

        slot.innerHTML = "";

        slot.classList.remove("filled");

    });

    placementHistory = [];
}


// ======================================================
// SMOKE BUTTONS
// ======================================================

smokeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const number =
            Number(button.dataset.smoke);

        placeSmoke(number);

    });

});


// ======================================================
// DELETE BUTTON
// ======================================================

deleteButton.addEventListener("click", () => {

    deleteLastSmoke();

});


// ======================================================
// RESET BUTTON
// ======================================================

resetButton.addEventListener("click", () => {

    resetVisualizer();

});


// ======================================================
// KEYBOARD CONTROLS
// ======================================================

document.addEventListener("keydown", event => {

    // 1 = Left Smoke
    if (event.key === "1") {

        placeSmoke(1);

        return;
    }

    // 2 = Center Smoke
    if (event.key === "2") {

        placeSmoke(2);

        return;
    }

    // 3 = Right Smoke
    if (event.key === "3") {

        placeSmoke(3);

        return;
    }

    // Backspace = delete most recent smoke
    if (event.key === "Backspace") {

        event.preventDefault();

        deleteLastSmoke();

    }

});
