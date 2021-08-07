const parkingArea = document.getElementById("parking-area");
const status = document.getElementById("status");
const availableSlot = [];
const slotUsed = [];
let used = 0;
let totalSlot = 0;
let idx = 0; //variabel for search empty slot
let date = new Date();
const costReg = 5000; //cost parking
const cost2H = 7000;
const maxCost = 75000;
const income = [];
var profit = 0;

function fnInputQty() {
  const inputSet = prompt("Input number of slot parking: ");
  let qtyslot = +inputSet;

  // mapping amount of available slot parking
  if (qtyslot == 0) {
    for (let i = 0; i < qtyslot; i++) {
      parkingArea.innerHTML += `<div class="slot"></div>`;
    }
  } else {
    parkingArea.innerHTML = null;
    for (let i = 0; i < qtyslot; i++) {
      parkingArea.innerHTML += `<div class="slot"></div>`;
    }
  }

  availableSlot.list = document.querySelectorAll(".slot");
  totalSlot = availableSlot.list.length;

  //set list for slot used
  for (let i = 0; i < totalSlot; i++) {
    slotUsed[i] = "";
  }

  localStorage.setItem("qtyNumSlot", qtyslot);
}

//Status
function fnCekStatus() {
  document.getElementById("slot-used").innerText = used;
  document.getElementById("empty-slot").innerText = slotUsed.length - used;
  if (used == slotUsed.length) {
    document.getElementById("in").disabled = true;
  } else {
    document.getElementById("in").disabled = false;
  }
}

//couunt used slot
function countUsedSlot() {
  used = 0;
  for (let i = 0; i < slotUsed.length; i++) {
    if (slotUsed[i] !== "") {
      used += 1;
    }
  }
}

function btnIn() {
  //signed slot used
  if (availableSlot.list[idx].classList == "slot") {
    availableSlot.list[idx].classList.add("parked");
    availableSlot.list[
      idx
    ].innerText = `${date.getHours()}${date.getMinutes()}${idx}`; //add tag in used slot
    slotUsed[idx] = `${date.getHours()}${date.getMinutes()}${idx}`; //input no. ticket to list slotUsed
    idx += 1;
  } else if (availableSlot.list[idx].classList == "slot parked") {
    availableSlot.list[idx + 1].classList.add("parked");
    availableSlot.list[
      idx + 1
    ].innerText = `${date.getHours()}${date.getMinutes()}${idx + 1}`; //add tag in used slot
    slotUsed[idx] = `${date.getHours()}${date.getMinutes()}${idx}`; //input no. ticket to list slotUsed
    idx += 1;
  }

  localStorage.setItem(
    "slotparked",
    JSON.stringify(document.querySelectorAll(".slot"))
  );

  idx = slotUsed.indexOf("");
  countUsedSlot();
  fnCekStatus();
}

function btnOut() {
  const ticketNo = prompt("Input No. Ticket: ");
  const howLong = +prompt("Input Hour of Parking");

  if (howLong > 2) {
    let totalCost = costReg + (howLong - 2) * cost2H;
    if (totalCost >= maxCost) {
      totalCost = maxCost;
    }
    income.push({ noTicktet: ticketNo, hour: howLong, cost: totalCost });
    profit += totalCost; //count total profit
    alert(totalCost);
  } else {
    let totalCost = costReg;
    income.push({ noTicktet: ticketNo, hour: howLong, cost: totalCost });
    profit += totalCost; //count total profit
    alert(totalCost);
  }

  let cekIdx = slotUsed.indexOf(ticketNo); //check no of index in slotUsed  based on No. Ticket
  slotUsed[cekIdx] = ""; //delete data in slotUsed
  availableSlot.list[cekIdx].innerText = null; //remove tag
  availableSlot.list[cekIdx].classList.remove("parked"); //remove sign

  idx = slotUsed.indexOf("");

  localStorage.setItem(
    "slotparked",
    JSON.stringify(document.querySelectorAll(".slot"))
  );

  countUsedSlot();
  fnCekStatus();
}

function fnCekProfit() {
  alert(`Total Profit: ${profit}`);
}

function fnClose() {
  window.close();
}
