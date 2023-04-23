import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";
import { isItEmpty } from "../Helpers";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

export default function CreateBudget() {
  let fetcher = useFetcher()
  let isSubmitting = fetcher.state
  let formRef = useRef() , budgetNameRef = useRef() , buttonRef = useRef() , amountRef = useRef()


  useEffect(()=> {

    if(isSubmitting === 'loading') {
      formRef.current.reset()
    }


  },[isSubmitting])


  return (
    <div className="w-full md:w-[40%] grow shadow-cardShdow rounded-xl p-4">
      <div className="border-[2px] border-dashed rounded-xl border-black p-6">
      <fetcher.Form ref={formRef} method="post">
      <p className="text-[22px] capitalize font-bold mb-5 underline">create budget</p>

      <label htmlFor="budget" className="cursor-pointer text-[17px] font-semibold mb-2 block">Budget Name</label>
      <input type="text" id="budget" placeholder='e.g, Clothes' className="inputStyle" name="budgetName" ref={budgetNameRef} />
      <label htmlFor="amount" className="cursor-pointer text-[17px] font-semibold mb-2 block mt-4">Amount</label>
      <input type="number" id="amount" step="0.5" className="inputStyle" inputMode="decimal" ref={amountRef} placeholder='e.g, 350$' name="budgetAmount" />
      <input type="hidden" name="actionType" value='createBudget'/>
      <button disabled={isSubmitting === 'submitting'}  ref={buttonRef} onClick={(e)=> {isItEmpty(budgetNameRef,amountRef,e)}}>
        {
          isSubmitting !== 'submitting' &&
          <span className='blackBtn mt-4'>Create Budget <CurrencyDollarIcon className="w-[20px] inline"/></span>
        }

        {
          isSubmitting === 'submitting' && 
          <span className='opacity-50 blackBtn mt-4'>Creating Budget...</span>
        }

        
      </button>
    </fetcher.Form>

      </div>
    </div>
  )
}
