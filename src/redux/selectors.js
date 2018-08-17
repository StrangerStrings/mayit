
const getVisibleExpenses = (expenses, { textSearch, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate != 'number' || startDate <= expense.createdAt
        const endDateMatch = typeof endDate != 'number' || endDate >= expense.createdAt
        const textSearchMatch = expense.description.toLowerCase().includes(textSearch.toLowerCase());
        
        return textSearchMatch && startDateMatch && endDateMatch
    }).sort((expenseA, expenseB) => (
        sortBy == 'amount' ? expenseB.amount - expenseA.amount : expenseB.createdAt - expenseA.createdAt
    ))
}


export default getVisibleExpenses