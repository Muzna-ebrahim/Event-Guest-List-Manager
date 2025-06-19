const form = document.getElementById("guest-Form");
const input = document.getElementById("GuestName");
const selectCategory = document.querySelectorAll("#guest-category button");  //this is the caategory
const guestlist = document.getElementById("Guest-List");


let guests = [];
let selectedCategory = "friend";

// adding a new guest
form.addEventListener("submit", (e) => {
  e.preventDefault();
//the name place
  let name = input.value.trim();
  const category = selectedCategory;
  if (!name) return;
  if (guests.length >= 10) {
    alert("Guest list limit reached (10 guests)");
    return;
  }

  let guest = {
    id: Date.now(),
    name,
    attending: true,
    category,
    timestamp : new Date().toLocaleString()
  };

  guests.push(guest);
  input.value = "";
  renderGuests();
});


//selected category
 selectCategory.forEach((btn) => {
    btn.addEventListener("click", () => {
    selectedCategory = btn.getAttribute("data-category");
//to reove then to add respectively for the buttons 
    selectCategory.forEach(b =>b.classList.remove("active"));
    btn.classList.add("active")
 });
 });

// the list of the guest in the event 
function renderGuests() {
  guestlist.innerHTML = "";

  guests.forEach((guest) => {
    const list = document.createElement("li");

    const span = document.createElement("span");
    span.innerHTML = `
    <strong>${guest.name}</strong> - ${guest.category}
    <small>[${guest.timestamp}]</small>
    <em class ="${guest.attending ? "attending" : "not-attending"}" >
    (${guest.attending ? "Attending" : "Not Attending"}) </em>
    `;

    const toggleButton = document.createElement("button");
    toggleButton.textContent = guest.attending ? "Mark Not Attending": "Mark Attending";
    toggleButton.className = "RSVP-btn"
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
