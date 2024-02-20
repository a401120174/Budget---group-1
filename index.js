const dayjs = require('dayjs')

class Budget {
    constructor (yearMonth, amount) {
        this.yearMonth = yearMonth
        this.amount = amount
    }
}


class BudgetService {
    getAll() {
        return []
    }

    getBudgetBy(date, day) {
        const budget = this.getAll().find(budget => budget.yearMonth === date.format('YYYYMM'))
        if (!budget) {
            return 0
        }
        if (!day) {
            return budget.amount
        }

        const monthDay = date.daysInMonth()
        return budget.amount / monthDay * day
    }

    query(start, end) {
        if(start > end) {
            return 0
        }

        const startDate = dayjs(start)
        const endDate = dayjs(end)

        if (startDate.isSame(endDate,'month') ) {
            const diff = endDate.diff(startDate, 'day') + 1
            return this.getBudgetBy(startDate, diff)
        }

        const startMonthDay = startDate.daysInMonth() - startDate.date() + 1
        const endMonthDay = endDate.date()
        let budget = this.getBudgetBy(startDate, startMonthDay) + this.getBudgetBy(endDate, endMonthDay)

        let currentMonth = startDate.add(1, 'month')
        while (currentMonth.isBefore(endDate)) {
            budget += this.getBudgetBy(currentMonth)
            currentMonth = currentMonth.add(1, 'month')
        }

        return budget
    }

}

module.exports = {Budget, BudgetService}