class Budget {
    constructor (yearMonth, amount) {
        this.yearMonth = yearMonth
        this.amount = amount
    }
}

class BudgetRepo {
    getAll() {
        return []
    }
}

module.exports = {BudgetRepo, Budget}