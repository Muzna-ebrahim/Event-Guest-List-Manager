const form = document.getElementById("guest-Form");
const input = document.getElementById("GuestName");
const guestlist = document.getElementById("Guest-List");
const categorySelect = document.getElementById("Guest-Category"); 

let guests = [];

// adding a new guest
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = input.value.trim();
  const category = categorySelect.value;
  if (!name) return;
  if (guests.length >= 10) {
    alert("Guest list limit reached (10 guests)");
    return;
  }

  const guest = {
    id: Date.now(),
    name,
    attending: true,
    category
  };

  guests.push(guest);
  input.value = "";
  renderGuests();
});

function renderGuests() {
  guestlist.innerHTML = "";

  guests.forEach((guest) => {
    const list = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = `${guest.name} - ${guest.category} (${guest.attending ? "Attending" : "Not Attending"})`;

    span.className = guest.attending ? "Attending" : "Not Attending";

    const toggleButton = document.createElement("button");
    toggleButton.textContent = "RSVP";
    toggleButton.onclick = () => {
      guest.attending = !guest.attending;
      renderGuests();
    };

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Remove";
    deleteButton.onclick = () => {
      guests = guests.filter((g) => g.id !== guest.id);
      renderGuests();
    };

    list.append(span, toggleButton, deleteButton);

    guestlist.appendChild(list);
  });
}
