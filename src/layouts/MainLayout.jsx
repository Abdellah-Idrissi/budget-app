import { Link, useLoaderData , Form , useOutlet  } from "react-router-dom"
import logo from "../assets/logomark.svg"
import wave from "../assets/wave.svg"
import { fetchData , createData, wait, createRandomColor, decrementExpensesCount, addExpense } from "../Helpers"
import { toast } from "react-toastify"
import SignIn from "../pages/SignIn"
import Dashboard from "../pages/Dashboard"
import { TrashIcon } from "@heroicons/react/24/solid"


const MainLayout = () => {

  let isUserFound = useLoaderData()

  let outlet = useOutlet()

  let areUsure = (e)=> {
    if(!confirm('Are u sure u want to delete your account ?')) {
      e.preventDefault()
    }
  }

  let dashboardOrSignin = isUserFound ? <Dashboard/> : <SignIn/>

  return (
    <main className="relative min-h-screen flex flex-col justify-between"> 

      <div className="container max-w-[1200px] relative mx-auto grow flex flex-col">
        <header className="flex items-center justify-between p-5">

          <Link className="flex items-center gap-x-1" to={'/'} >
          <img src={logo} alt="logo" className="w-[30px]"/>
          <span className="text-[20px] font-bold">Budget</span>
          </Link>
          {isUserFound && 
          <Form method="post" action="/logout"  onSubmit={areUsure}>
          <button className="redBtn p-2 px-3 sm:px-4 sm:py-3">
            <span className="hidden sm:block">Delete Account</span> 
            <TrashIcon className="w-[20px] inline"/>
            </button>
          </Form>
          }

        </header>

        {
          outlet === null ? dashboardOrSignin : outlet
        }


      </div>

      <img src={wave} alt="" className="mt-5"/>

    </main>
  )
}

export default MainLayout



export const mainLoader = ()=> {
  return fetchData('userName') ? true : false
}

export const mainAction = async ({request})=> {
  let data = await request.formData()
  let actionType = data.get('actionType')

  if(actionType === 'createUser') {
    let userName = data.get('userName')
    createData('userName',userName)
    return toast.success(`Welcome, ${userName}`)
  }

  else if(actionType === 'createBudget') {

    await wait()

    let budgetName = data.get('budgetName')
    let budgetAmount = +data.get('budgetAmount')

    let budgetDetails = {
      amount: budgetAmount,
      spent : 0,
      remaining: budgetAmount,
      color: createRandomColor(),
      createdAt: Date.now()
    }


    let isThereAnyBudgets = fetchData('budgets') == null ? false : true

    if(!isThereAnyBudgets) {
      createData('budgets',JSON.stringify({[budgetName]:budgetDetails}))
    }

    else {
      let budgetsObj = JSON.parse(fetchData('budgets'))
      budgetsObj[budgetName] = budgetDetails

      createData('budgets',JSON.stringify(budgetsObj))
    }
    
    return toast.success(`You've created ${budgetName}`)
  }

  else if(actionType === 'createExpense') {
    await wait()


    let expenseName = data.get('expenseName')
    let expenseAmount = +data.get('expenseAmount')
    let budgets = JSON.parse(fetchData('budgets'))
    let expenseType = data.get('expenseType')
    
    if(expenseType === null) {
      expenseType = Object.keys(budgets)[0]
    }

    let currentBudget = budgets[expenseType]
    let color = currentBudget.color 
    let newExpense = {[expenseName]:{amount:expenseAmount , createdAt:Date.now() , type:expenseType ,color:color}}

    return addExpense(currentBudget,budgets,expenseAmount,newExpense,expenseName,expenseType)

  }

  else if (actionType === 'deleteExpense') {
    let budgets = JSON.parse(fetchData('budgets'))
    let type = data.get('budgetType') , name = data.get('expenseName')
    let expenses = budgets[type].expenses

    expenses.map((expense,index)=> {
      let expenseName = Object.keys(expense)[0]
      let amount = expense[expenseName].amount
      if(expenseName === name) {
        expenses.splice(index,1)
        budgets[type].spent -= amount
        budgets[type].remaining += amount
      }
    })

    !expenses.length ? delete budgets[type].expenses : budgets[type].expenses = expenses

    createData('budgets',JSON.stringify(budgets))

    decrementExpensesCount()

    return toast.success(`You've deleted ${name}`)

  }
  
}
