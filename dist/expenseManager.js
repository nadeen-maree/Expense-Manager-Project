const render = new Renderer()

class ExpenseManager {
    constructor() {
        this.expenses = []
    }

    addExpense(newExpense) {
        return $.post('expense', newExpense, function(data){
            console.log(data)
            expenseManager.expenses.push(data)
        })
    }

    getExpenses() {
        return $.get('expenses', function(data){
            console.log(data)
            expenseManager.expenses = data
        })
    }
}

  