const {BudgetService, Budget} = require('./index')

describe('budgetService', () => {
    const budgetService = new BudgetService()

    it('same month', () => {
        budgetService.getAll = () => [new Budget('202310', 310)]

        expect(budgetService.query(new Date(2023, 9, 1), new Date(2023, 9, 5))).toBe(50)
        
    })

    it('cross two months', () => {
        budgetService.getAll = () => [new Budget('202310', 310), new Budget('202311', 3000)]

        expect(budgetService.query(new Date(2023, 9, 30), new Date(2023, 10, 3))).toBe(320)
    })

    it('cross three months', () => {
        budgetService.getAll = () => [new Budget('202310', 310), new Budget('202311', 3000), new Budget('202312', 31)]

        expect(budgetService.query(new Date(2023, 9, 29), new Date(2023, 11, 4))).toBe(3034)
    })

    it('no budget data', () => {
        budgetService.getAll = () => []

        expect(budgetService.query(new Date(2023, 9, 1), new Date(2023, 9, 5))).toBe(0)
        
    })

    it('invalid start and end date', () => {
        budgetService.getAll = () => [new Budget('202310', 310), new Budget('202311', 3000), new Budget('202312', 31)]

        expect(budgetService.query(new Date(2023, 9, 10), new Date(2023, 9, 5))).toBe(0)
        
    })

    it('cross year', () => {
        budgetService.getAll = () => [new Budget('202312', 310), new Budget('202401', 30), new Budget('202402', 29), new Budget('202403', 310)]

        expect(budgetService.query(new Date(2023, 11, 30), new Date(2024, 2, 5))).toBe(129)
    })

    it('cross three months with one month no budget data', () => {
        budgetService.getAll = () => [new Budget('202310', 310), new Budget('202312', 31)]

        expect(budgetService.query(new Date(2023, 9, 29), new Date(2023, 11, 4))).toBe(34)
    })
})