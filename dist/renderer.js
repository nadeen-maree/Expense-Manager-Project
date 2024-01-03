class Renderer {
     renderExpenses(expenses) {
      const expensesList = $('#expensesList')
        const source = $('#expenses-template').html()
        const template = Handlebars.compile(source)
        expensesList.html(template({ expenses }))
    }
  
    renderAdd() {
      const addExpenseForm = $('#addExpenseForm')
        const source = $('#add-expense-template').html()
        const template = Handlebars.compile(source)
        addExpenseForm.html(template())
    }
}
  