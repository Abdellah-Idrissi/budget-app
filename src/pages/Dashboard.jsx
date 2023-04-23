import { fetchData } from '../Helpers'
import CreateBudget from '../components/CreateBudget'
import {useRef } from 'react'
import Expense from '../components/Expense'
import Budgets from '../components/Budgets'
import ExpensesTable from '../components/ExpensesTable'

const Dashboard = () => {


  const userNameRef = useRef(fetchData('userName'))
  let budgets = fetchData('budgets')
  let expenses = JSON.parse(fetchData('expenses'))
  const isThereAnyBudgets = budgets === null ? false : true

  return (
    <div className='px-5'>
      <h1 className='text-[28px] sm:text-[40px] md:text-[50px] lg:text-[65px] font-bold mt-3 text-center'>Welcome back , <span className='text-mainColor capitalize'>{userNameRef.current}</span></h1>

      {
        !isThereAnyBudgets && 
        <>
          <p className='text-center md:text-[20px] lg:text-[22px] my-1'>Personal budgeting is the secret to financial freedom.</p>
          <p className='text-center md:text-[20px] lg:text-[22px] mt-2'>Create a budget to get started!</p>
        </>
      }

      <div className='flex flex-wrap gap-7 mt-6'>
        <CreateBudget/>
        { isThereAnyBudgets && <Expense oneExpense={false}/> }
      </div>

      { isThereAnyBudgets && 
        <>
          <h2 className='text-[30px] sm:text-[37px] md:text-[45px] lg:text-[58px] font-bold my-4 mb-5 text-center underline'>Existing Budgets</h2>
          <Budgets budgets={budgets}/> 
        </>
      }

      {
        expenses && 
        <>
          <h2 className='text-[30px] sm:text-[37px] md:text-[45px] lg:text-[58px] font-bold my-4 mb-5 text-center underline'>Recent Expenses</h2>
          <ExpensesTable numOfExpensesToShow={5} showLink={true}/> 
        </>
      }

    </div>
  )
}

export default Dashboard