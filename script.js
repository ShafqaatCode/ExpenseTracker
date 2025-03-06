document.addEventListener("DOMContentLoaded", () => {
    loadBudget();
    loadExpenses();
})



function setBudget() {
    let budget = document.getElementById("budget").value;
    if (budget === "" || budget < 0) {
        alert("Please Enter the Valid Budget")
        return;
    }

    localStorage.setItem("budget", budget);
    loadBudget();
}


function loadBudget() {
    let budget = localStorage.getItem("budget") || 0;
    document.getElementById("total-budget").innerText = budget;
    updateSummary();
}


function addExpense() {
    let name = document.getElementById("expense-name").value;
    let amount = document.getElementById("expense-amount").value;
    let category = document.getElementById("expense-category").value;
    let date = document.getElementById("expense-date").value;


    if (name === "" || amount === "" || amount < 0) {
        alert("Please Enter valid Expense Details");
        return;
    }

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push({ name, amount, category, date })

    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("expense-name").value = "";
    document.getElementById("expense-amount").value = 0;

    document.getElementById("expense-date").value = 0;

    loadExpenses();
    updateSummary();

}


function loadExpenses() {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    let expenseList = document.getElementById("expense-list");
    expenseList.innerHTML = "";

    expenses.forEach((expense, index) => {
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${expense.name}</td>
        <td>${expense.amount}</td>
        <td>${expense.category}</td>
        <td>${expense.date}</td>
        <td><button onclick="deleteExpense(${index})">Delete</button></td>
        `;

        expenseList.appendChild(row);
    });

}


function deleteExpense(index) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    loadExpenses();
    updateSummary();
}


function updateSummary() {
    let budget = parseFloat(localStorage.getItem("budget")) || 0;
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    let totalExpenses = expenses.reduce((sum, obj) => sum + parseFloat(obj.amount), 0)
    let remainingBalance = budget - totalExpenses;


    document.getElementById("total-expense").innerText = totalExpenses;
    document.getElementById("remaining-balance").innerText = remainingBalance;

    let warningAlert = document.getElementById("warning-alert");
    if (remainingBalance < 0) {
        warningAlert.style.display = "block";

        alert("Warn you , Expenses exceeded the budget!")
    }

    else {
        warningAlert.style.display = "none"
    }
}
