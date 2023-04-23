import { Link, useLoaderData } from "react-router-dom";
import { addExpense , fetchData, wait } from "../Helpers";
import BudgetCard from "../components/BudgetCard";
import Expense from "../components/Expense";
import ExpensesTable from "../components/ExpensesTable";
import { HomeIcon } from "@heroicons/react/24/solid";

export default function Budget() {

  let budgetName = useLoaderData()
  let budget = JSON.parse(fetchData('budgets'))[budgetName]



  return (
    <div className="px-5">

      <div className="flex flex-wrap gap-5">
        <BudgetCard budget={budget} budgetName={budgetName} canWeDelete={true}/>

        <Expense oneExpense={true} budgetName={budgetName}/>

      </div>


      <ExpensesTable specificExpense={budgetName} dontShowBudget={true} />
      <Link to={'/'} className="blackBtn w-fit mt-[30px]">
        <span className="inline-block mr-1">Go back</span>
        <HomeIcon className="w-[18px] inline relative -top-[2px]"/>
      </Link>
      
    </div>
  )
}


export const budgetLoader = ({params})=> {

  let {budget} = params
  let budgetsObj = JSON.parse(fetchData('budgets'))
  let budgetObj = budgetsObj[budget]


  if(budgetObj !== undefined) {
    return budget
  }

  else {
    throw Error('khoya hadchi mkynch ghayarha')
  }

}

export const budgetAction = async ({params,request}) => {
  
  let data = await request.formData()
  await wait()

  let {budget} = params
  let expenseName = data.get('expenseName')
  let expenseAmount = +data.get('expenseAmount')
  let budgetsObj = JSON.parse(fetchData('budgets'))
  let currentBudget = budgetsObj[budget]
  let color = currentBudget.color 

  let newExpense = {[expenseName]:{amount:expenseAmount , createdAt:Date.now(), type:budget,color:color}}


  return addExpense(currentBudget,budgetsObj,expenseAmount,newExpense,expenseName,budget)  

}