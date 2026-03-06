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

function toggleEmailForm(){
const form = document.getElementById("emailForm");
form.classList.toggle("hidden");
}

function downloadPDF(){
const element = document.getElementById("invoice");
const invoiceNum = document.getElementById("invoiceNumber").innerText.replace("Invoice #: ", "");

const opt = {
margin: 0.5,
filename: `${invoiceNum}.pdf`,
image: { type: 'jpeg', quality: 0.98 },
html2canvas: { scale: 2 },
jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
};

html2pdf().set(opt).from(element).save();
}

function sendEmailWithPDF(){
const recipientEmail = document.getElementById("recipientEmail").value;
if(!recipientEmail){
alert("Please enter recipient email address");
return;
}

const billerName = document.getElementById("billerName").value || "Biller";
const clientName = document.getElementById("clientName").value || "Client";
const invoiceNum = document.getElementById("invoiceNumber").innerText;
const grandTotal = document.getElementById("grandTotal").innerText;

// Generate and download PDF
const element = document.getElementById("invoice");
const filename = invoiceNum.replace("Invoice #: ", "");

const opt = {
margin: 0.5,
filename: `${filename}.pdf`,
image: { type: 'jpeg', quality: 0.98 },
html2canvas: { scale: 2 },
jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
};

html2pdf().set(opt).from(element).save().then(() => {
// After PDF is generated, open email client
const subject = `${invoiceNum}`;
const body = `Dear ${clientName},%0D%0A%0D%0A` +
`Please find attached the invoice ${invoiceNum}.%0D%0A%0D%0A` +
`Total Amount: ${grandTotal}%0D%0A%0D%0A` +
`Bank Details:%0D%0A` +
`Bank: ${document.getElementById("bankName").value}%0D%0A` +
`Account Name: ${document.getElementById("accountName").value}%0D%0A` +
`Account Number: ${document.getElementById("accountNumber").value}%0D%0A` +
`Branch Code: ${document.getElementById("branchCode").value}%0D%0A%0D%0A` +
`Thank you for your business!%0D%0A%0D%0A` +
`Best regards,%0D%0A${billerName}`;

window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
});
}