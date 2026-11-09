const dressContainer = document.getElementById("dressContainer");
const dressSelect = document.getElementById("dressName");

let dresses = [];

async function loadDresses() {
    try {
        const response = await fetch("/api/dresses");

        if (!response.ok) {
            throw new Error("Unable to load dresses");
        }

        dresses = await response.json();

        dressContainer.innerHTML = "";
        dressSelect.innerHTML =
            '<option value="">Choose a Dress</option>';

        dresses.forEach((dress, index) => {

            const card = document.createElement("div");
            card.className = "dress-card";

            card.innerHTML = `
                <img src="${dress.image}" alt="${dress.name}"
                onerror="this.src='https://placehold.co/400x500?text=Princess+Dress'">

                <div class="dress-info">
                    <h3>${dress.name}</h3>
                    <p>Colour: ${dress.color}</p>
                    <p>Material: ${dress.material}</p>
                    <p>Occasion: ${dress.occasion}</p>
                    <p><strong>Price: ₹${dress.price}</strong></p>

                    <button onclick="explainDress(${index})">
                        🎤 Meet Designer
                    </button>

                    <button onclick="showDetails(${index})">
                        View Details
                    </button>
                </div>
            `;

            dressContainer.appendChild(card);

            const option = document.createElement("option");
            option.value = dress.name;
            option.textContent = dress.name;
            dressSelect.appendChild(option);
        });

    } catch (error) {
        dressContainer.textContent =
            "Unable to load dresses. Please check the server.";
        console.error(error);
    }
}


// Designer explains the dress using voice
function explainDress(index) {
    const dress = dresses[index];

    if (!("speechSynthesis" in window)) {
        alert("Voice explanation is not supported in this browser.");
        return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(
        dress.explanation
    );

    speech.rate = 0.9;
    speech.pitch = 1.1;

    window.speechSynthesis.speak(speech);
}


// Display dress information
function showDetails(index) {
    const dress = dresses[index];

    alert(
        "Dress: " + dress.name +
        "\nDesigner: " + dress.designer +
        "\nColour: " + dress.color +
        "\nMaterial: " + dress.material +
        "\nPrice: ₹" + dress.price +
        "\n\n" + dress.description
    );
}


// Save booking in MongoDB
document.getElementById("bookingForm")
.addEventListener("submit", async function(event) {

    event.preventDefault();

    const booking = {
        customerName:
            document.getElementById("customerName").value,

        email:
            document.getElementById("email").value,

        dressName:
            document.getElementById("dressName").value
    };

    try {
        const response = await fetch("/api/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(booking)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Booking failed");
        }

        document.getElementById("bookingMessage")
        .textContent = "👑 " + result.message;

        document.getElementById("bookingForm").reset();

    } catch (error) {
        document.getElementById("bookingMessage")
        .textContent = "Booking failed: " + error.message;
    }
});


// Load dresses when website opens
loadDresses();