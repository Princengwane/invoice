let invoiceCounter = localStorage.getItem("invoiceCounter") || 1001;

document.getElementById("invoiceNumber").innerText =
"Invoice #: INV-" + invoiceCounter;

document.getElementById("invoiceDate").innerText =
new Date().toLocaleDateString();

function addItem(){

const table = document.getElementById("items");

const row = table.insertRow();

row.innerHTML = `

<td><input class="input item"></td>

<td><input type="number" class="input qty" value="1"></td>

<td><input type="number" class="input price" value="0"></td>

<td class="itemTotal">R0</td>

<td><button onclick="removeItem(this)">X</button></td>

`;

}

function removeItem(btn){

btn.parentElement.parentElement.remove();

calculate();

}


function calculate(){

let subtotal = 0;

const rows = document.querySelectorAll("#items tr");

rows.forEach(row=>{

let qty = row.querySelector(".qty").value;

let price = row.querySelector(".price").value;

let total = qty * price;

row.querySelector(".itemTotal").innerText = "R" + total.toFixed(2);

subtotal += total;

});


let discountPercent = document.getElementById("discount").value;

let vatPercent = document.getElementById("vat").value;

let discountAmount = subtotal * (discountPercent / 100);

let vatAmount = (subtotal - discountAmount) * (vatPercent / 100);

let grandTotal = subtotal - discountAmount + vatAmount;


document.getElementById("subtotal").innerText = "R" + subtotal.toFixed(2);

document.getElementById("discountTotal").innerText = "-R" + discountAmount.toFixed(2);

document.getElementById("vatTotal").innerText = "R" + vatAmount.toFixed(2);

document.getElementById("grandTotal").innerText = "R" + grandTotal.toFixed(2);


localStorage.setItem("invoiceCounter", ++invoiceCounter);

}