const expenseManager = new ExpenseManager()
const renderer = new Renderer()


expenseManager.getExpenses()
.then(() =>{
    console.log(expenseManager.expenses)
    renderer.renderExpenses(expenseManager.expenses)
})
    

renderer.renderAdd()
const addExpenseForm = document.querySelector('#addExpenseForm form')
addExpenseForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(addExpenseForm)
    const newExpense = {
        item: formData.get('item'),
        amount: parseFloat(formData.get('amount')),
        group: formData.get('group'),
        date: formData.get('date'),
    }
    expenseManager.addExpense(newExpense)
    .then(()=>{
        console.log(expenseManager.expenses)
        renderer.renderExpenses(expenseManager.expenses)
    })
})


