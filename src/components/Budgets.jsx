/* eslint-disable react/prop-types */

import BudgetCard from "./BudgetCard"

export default function Budgets({budgets}) {
  budgets = JSON.parse(budgets)
  let budgetsKeys = Object.keys(budgets)

  return (
    <div className="flex flex-wrap gap-4">
      {
        budgetsKeys.map(budgetName=> (
          <BudgetCard key={budgetName} canWeDelete={false} budget={budgets[budgetName]} budgetName={budgetName}/>
        ))
      }
    </div>
  )
}

