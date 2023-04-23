/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { Link, useFetcher } from "react-router-dom"
import { bringExpenses, formatToDate } from "../Helpers"
import { HomeIcon, TrashIcon } from "@heroicons/react/24/solid"

export default function ExpensesTable({numOfExpensesToShow , specificExpense , dontShowBudget , showLink , showGoBack}) {


  let expenses = bringExpenses(specificExpense,numOfExpensesToShow)
  let fetcher = useFetcher()

  return (
    <>
      {
        expenses.length >= 1 && 
        <div className="overflow-auto tableContainer">
          <table className="rounded-lg border-separate border-spacing-[4px] w-full min-w-[700px]">

            <thead>
              <tr>
                <th>name</th>
                <th>amount</th>
                <th>date</th>
                {!dontShowBudget && <th>budget</th>}
                <th>delete</th>
              </tr>
            </thead>

            <tbody>
              {expenses.map((expense,index)=> {
                let {name,amount,createdAt,type,color} = expense

                return (
                  <tr key={name+index} className="even:bg-transparent odd:bg-[#edf2f3c2]" style={{'--category-color':color}}>
                    <td>{name}</td>
                    <td>{amount}</td>
                    <td>{formatToDate(createdAt)}</td>
                    {!dontShowBudget && <td><Link to={`/${type}`}  className="tableBtn">{type}</Link></td>}
                    <td >
                      <fetcher.Form method="post" action="/">
                        <input type="hidden" name="budgetType" value={type}/>
                        <input type="hidden" name="expenseName" value={name}/>
                        <input type="hidden" name="actionType" value='deleteExpense' />
                        <button className="redBtn px-4 py-2 mx-auto"><TrashIcon width={20}/></button>
                      </fetcher.Form>
                    </td>
                  </tr>
                )
              })}
            </tbody>

          </table>
        </div>
      }

      {
        showLink === true && expenses.length > 4 && 
        <Link to={'/expenses'} className="blackBtn w-fit mt-[30px]">View All Expenses</Link>
      }

      {
        showGoBack === true && 
          <Link to={'/'} className="blackBtn w-fit mt-[30px]">
            <span className="inline-block mr-1">Go back</span>
            <HomeIcon className="w-[18px] inline relative -top-[2px]"/>
          </Link>
      }


    </>
  )

}

