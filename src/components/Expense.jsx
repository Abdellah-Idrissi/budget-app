/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react"
import { fetchData, isItEmpty } from "../Helpers"
import { useFetcher } from "react-router-dom"
import { PlusCircleIcon } from "@heroicons/react/24/solid"
import Select from "./Select"


export default function Expense({oneExpense,budgetName}) {
  let budgets = Object.keys(JSON.parse(fetchData('budgets')))
  let isMoreThanOneBudget = budgets.length > 1 ? true : false
  let fetcher = useFetcher()
  let formRef = useRef() , btnRef = useRef() , expenseNameRef = useRef() , expenseAmountRef = useRef()
  let isSubmitting = fetcher.state
  const [selectedBudget, setSelectedBudget] = useState(budgets[0])



  useEffect(()=> {

    if(isSubmitting === 'loading') {
      formRef.current.reset()
    }
  },[isSubmitting])

  return (
    <div className="shadow-cardShdow rounded-xl p-4 w-full md:w-[40%] grow">

      <div className="border-[2px] border-dashed rounded-xl border-black p-6">

        <p className="text-[22px] capitalize font-bold mb-5 underline">Add new <span className="text-mainColor underline decoration-mainColor">
          {/* {!isMoreThanOneBudget && budgetName }
          {oneExpense && budgetName}  */}
          {isMoreThanOneBudget === false ? `${budgets[0]} ` : oneExpense === true ? `${budgetName} ` : ''} 
          </span>
          Expense
        </p>

        <fetcher.Form method="post" ref={formRef}>
            <label htmlFor="expense" className="cursor-pointer text-[17px] font-semibold mb-2 block">Expense Name</label>
            <input type="text" id="expense" className="inputStyle" placeholder="e.g, jeans" ref={expenseNameRef} name="expenseName"/>
            
            <div className="flex gap-x-3">
              <div className="w-[40%] grow ">
                <label htmlFor="expAmount" className="cursor-pointer text-[17px] font-semibold mb-2 block mt-4">Amount</label>
                <input type="number" id="expAmount" className="inputStyle" placeholder="expense amount" ref={expenseAmountRef} name="expenseAmount" step="0.5" inputMode="decimal" />
              </div>
              {
                isMoreThanOneBudget && !oneExpense &&
                <div className="w-[40%] grow self-end">
                  <label htmlFor="hd" className="cursor-pointer text-[17px] font-semibold mb-2 block mt-4">Category</label>
                  <Select budgets={budgets} selectedBudget={selectedBudget} setSelectedBudget={setSelectedBudget}/>
                </div>
              }
            </div>


          <input type="hidden" name="actionType" value='createExpense'/>
          <input type="hidden" name="expenseType" value={selectedBudget}/>


          <button disabled={isSubmitting === 'submitting'}  ref={btnRef} onClick={(e)=> {isItEmpty(expenseNameRef,expenseAmountRef,e)}}>
              {
                isSubmitting !== 'submitting' &&
                <span className='blackBtn mt-4'>Add Expense <PlusCircleIcon className="w-[20px] inline"/> </span>
              }

              {
                isSubmitting === 'submitting' && 
                <span className='opacity-50 blackBtn mt-4'>Adding Expense...</span>
              }

          
          </button>  

        </fetcher.Form>     
      </div>

    </div>
  )
}