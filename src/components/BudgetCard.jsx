/* eslint-disable react/prop-types */

import { Link, useNavigate } from "react-router-dom";
import { createData, fetchData, formatCurrency, removeData } from "../Helpers";
import { BanknotesIcon } from "@heroicons/react/24/outline";

export default function BudgetProto({budget , canWeDelete , budgetName}) {

  let {amount , spent , remaining , color} = budget

  let navigate = useNavigate()

  const deleteBudget = ()=> {
    if(confirm('Are u sure u want to delete this budget ?')) {

      let budgets = JSON.parse(fetchData('budgets'))

      let numOfExpenses = budgets[budgetName].expenses !== undefined ? budgets[budgetName].expenses.length : 0

      let expenses = +JSON.parse(fetchData('expenses'))
      expenses -= numOfExpenses

      expenses === 0 ? removeData('expenses') : createData('expenses',expenses)


  
      if(Object.keys(budgets).length > 1) {
        delete budgets[budgetName]
        createData('budgets',JSON.stringify(budgets))
      }
  
      else {
        removeData('budgets')
      }


  
      navigate('/',{replace:true})
    }
  }
  
  return (
    <div key={budgetName} className="self-start shadow-lg w-full md:w-[40%] grow bg-white border-[3px] rounded-[30px] p-5 mt-2" 
    style= {{borderColor: color,'--cardColor': color}}>

      <div className="flex gap-x-4 gap-y-2 justify-between flex-wrap">
        <p className="font-bold text-[20px] capitalize" style={{color:color}}>{budgetName}</p>
        <p style={{color:color}} className="text-[20px] capitalize">{formatCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value={spent} className="my-3 w-full ">
        {`${(remaining / amount) * 100}%`}
      </progress>

      <div className="flex justify-between gap-x-4 gap-y-2 flex-wrap">
        <p className="text-[14px] text-gray-400">{formatCurrency(spent)} spent</p>
        <p className="text-[14px] text-gray-400">{formatCurrency(remaining)} remaining</p>
      </div>

      {
        canWeDelete ? 
        <button className="budgetCardBtn" onClick={deleteBudget} style={{backgroundColor: color}}>
          <span>Delete Budget</span>
          <BanknotesIcon className="w-[20px] inline"/>
        </button> :
        <Link to={`${budgetName}`} className="budgetCardBtn" style={{backgroundColor: color}}>
          <span>View details</span>
          <BanknotesIcon className="w-[20px] inline"/>
        </Link> 
      }
    </div>
  )
}
