const BASE_URL = "https://v6.exchangerate-api.com/v6/6d12c1920ad087d0be8eb769/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");

// Populate dropdowns
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = true;
    }
    select.append(newOption);
  }
}

// Function to update exchange rate
const updateExchangeRate = async () => {
  const fromCurr = document.querySelector(".from select").value;
  const toCurr = document.querySelector(".to select").value;
  const amount = parseFloat(document.querySelector(".amount input").value);
  const url = `${BASE_URL}/${fromCurr}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching exchange rates");
    }
    const data = await response.json();
    if (data.result !== "success") {
      throw new Error("Invalid response from API");
    }
    const exchangeRate = data.conversion_rates[toCurr];
    if (!exchangeRate) {
      throw new Error("Invalid conversion rate");
    }
    const convertedAmount = amount * exchangeRate;
    msg.innerText = `${amount} ${fromCurr} = ${convertedAmount.toFixed(2)} ${toCurr}`;
  } catch (error) {
    msg.innerText = error.message;
  }
};

// Event listener for button click
btn.addEventListener("click", updateExchangeRate);

document.addEventListener("DOMContentLoaded", function() {
  // Select the container element
  const container = document.querySelector(".container");

  // container.style.display = "none";

  // Use GSAP to animate the container with a fade-in effect
   gsap.from(container, {
  opacity: 0, // Start with opacity 0
  rotation: 360, // Rotate 360 degrees
  duration: 1, // Animation duration (in seconds)
  delay: 0.5, // Delay before the animation starts (in seconds)
  ease: "bounce.out",
  onStart: function() {
    // Display the container when animation completes
    container.style.display = "block";
  }
  });

 
});
