const cal = document.getElementById("calendar");
const modal = document.getElementById("modal");
const modalDate = document.getElementById("modalDate");
const modalInput = document.getElementById("modalInput");

let selectedDay = null;
let data = JSON.parse(localStorage.getItem("monthlyData")) || {};

function renderCalendar() {
  cal.innerHTML = "";

  for (let i = 1; i <= 31; i++) {
    const d = document.createElement("div");
    d.className = "date";

    d.innerHTML = `<b>${i}</b>`;

    if (data[i]) {
      d.innerHTML += `
        <div class="note">
          ${data[i]}
          <span class="delete-note" onclick="deleteTask(event, ${i})">✕</span>
        </div>
      `;
    }

    d.onclick = () => openModal(i);
    cal.appendChild(d);
  }
}

function openModal(day) {
  selectedDay = day;
  modalDate.innerText = `day ${day}`;
  modalInput.value = data[day] || "";
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
}

function saveTask() {
  const text = modalInput.value.trim();

  if (text) {
    data[selectedDay] = text;
  } else {
    delete data[selectedDay];
  }

  localStorage.setItem("monthlyData", JSON.stringify(data));
  closeModal();
  renderCalendar();
}

function deleteTask(e, day) {
  e.stopPropagation(); // prevents opening modal
  delete data[day];
  localStorage.setItem("monthlyData", JSON.stringify(data));
  renderCalendar();
}

renderCalendar();
