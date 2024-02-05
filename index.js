document.addEventListener("DOMContentLoaded", () => {
  const toggleClasses = [
    "roof",
    "houseLeft",
    "houseRight",
    "basement",
    "insulation",
  ];

  // Event-Listener für alle Elemente mit den Klassen in toggleClasses
  toggleClasses.forEach((cls) => {
    const elements = document.querySelectorAll(`.${cls}`);
    elements.forEach((element) => {
      element.addEventListener("click", () => {
        // Toggle der 'disabled' Klasse beim Klicken
        element.classList.toggle("disabled");
      });
    });
  });
  const adjustTemperature = (element, delta) => {
    // Finde das Temperaturelement im aktuellen Raum
    const tempElement =
      element.parentNode.parentNode.querySelector(".temperature");
    let tempValue = parseInt(tempElement.innerText.replace("°C", ""));
    tempValue += delta;

    // Aktualisiere die Temperatur im Raum
    tempElement.innerText = `${tempValue}°C`;

    // Aktualisiere die Klasse basierend auf der neuen Temperatur
    const roomElement = element.closest(".item");
    for (let i = 16; i <= 26; i++) {
      roomElement.classList.remove(`room${i}`);
    }
    if (tempValue >= 16 && tempValue <= 26) {
      roomElement.classList.add(`room${tempValue}`);
    }
  };

  // Event-Listener für die Temperatur-Buttons
  document.querySelectorAll(".roomTempBtn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const delta = event.target.value === "+" ? 1 : -1;
      adjustTemperature(event.target, delta);
    });
  });
});
