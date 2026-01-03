let balance = localStorage.getItem("balance");
if(balance === null){
  balance = 1000;
}
else{
  balance = Number(balance);
}
let history = [];
let hasTransaction = false;

function updateUI(){
  document.getElementById("balance").innerText = `Balance: PHP${balance}`;
  let historyList = document.getElementById("history");
  historyList.innerHTML = "";

  history.forEach(item => {
    let li = document.createElement("li");
    li.innerText = item;
    historyList.appendChild(li);
  });
  document.getElementById("printBtn").disable = !hasTransaction;
  document.getElementById("cleatBtn").disable = !hasTransaction;
}
function deposit() {
    let amount = Number(document.getElementById("amount").value);
  
    if (amount <= 0) {
      alert("Invalid amount");
      return;
    }
  
    balance = balance + amount;

    history.push(`Deposited: ₱ ${amount}`);
    hasTransaction = true;

    localStorage.setItem("balance", balance);

    updateUI();
  }
  
  function withdraw() {
    let amount = Number(document.getElementById("amount").value);
  
    if (amount <= 0) {
      alert("Invalid amount");
      return;
    }
  
    if (amount > balance) {
      alert("Insufficient balance");
      return;
    }
  
    balance = balance - amount;

    history.push(`Withdrawn: ₱ ${amount}`);
    hasTransaction = true;

    localStorage.setItem("balance", balance);
    

    updateUI();
  }
   function printReceipt(){
    if(!hasTransaction){
      alert("No transaction: Please Enter Transaction")
      return;
    }
    let receipt = "=====BANK RECEIPT ====="
    receipt += `Current Balance: PHP${balance}\n\n`;
    receipt += "Transactions:\n";
    history.forEach(item =>{
    receipt += `- ${item}\n`;
    });
    alert(receipt);
  }
  function clearTransaction(){
    if (history.length === 0){
      alert("There is no Transaction to Clear.");
      return;
    }
    history = [];
    hasTransaction = false;
    alert("Transaction Cleared")
    updateUI();
  }
  updateUI();
