import { toast } from "react-toastify"

export const fetchData = (key)=> {
  return localStorage.getItem(key)
}

export const createData = (key,value)=> {
  localStorage.setItem(key,value)
}

export const removeData = (key)=> {
  return localStorage.removeItem(key)
}

export const wait = ()=> (
  new Promise((res)=> {
    return setTimeout(res,800)
  })
)

export const createRandomColor = ()=> {

  let length

  fetchData('budgets') !== null ? length = Object.keys(JSON.parse(fetchData('budgets'))).length : length = 0


  return `hsl(${length * 34 },65%,50%)`

}

export const formatCurrency = (currency)=> {
  return currency.toLocaleString('en-US',{style:'currency',currency:'usd'})
}

export const formatToDate = (date)=> {
  return new Date(date).toLocaleDateString()
}

export const increaseExpensesCount = ()=> {
  let expenses = JSON.parse(fetchData('expenses'))
  if(expenses === null) {
    expenses = 1
  }
  else {
    expenses += 1
  }
  createData('expenses',expenses)
}

export const decrementExpensesCount = ()=> {
  let expenses = JSON.parse(fetchData('expenses'))
  if(expenses === 1) {
    removeData('expenses')
  }

  else {
    expenses -= 1
    createData('expenses',expenses)
  }
}

export const bringExpenses = (specificExpense , numOfExpensesToShow)=> {
  let budgets = JSON.parse(fetchData('budgets'))
  let budgetsKeys = Object.keys(budgets)
  let expensesArray = []

  budgetsKeys.map(budgetName=> {
    let budgetExpenses = budgets[budgetName].expenses

    if(budgetExpenses !== undefined) {
        expensesArray = [...expensesArray , ...budgetExpenses]
    }
  })

  expensesArray = expensesArray.sort((expenseOne , expenseTwo)=> {
    let expenseOneName = Object.keys(expenseOne)[0]
    let expenseOneTime = expenseOne[expenseOneName].createdAt

    let expenseTwoName = Object.keys(expenseTwo)[0]
    let expenseTwoTime = expenseTwo[expenseTwoName].createdAt

    return expenseTwoTime - expenseOneTime
  }).slice(0,numOfExpensesToShow).map(expense => {
    let expenseName = Object.keys(expense)[0]
    let {amount , createdAt , type , color} = expense[expenseName]

    return {name: expenseName , amount , createdAt , type , color}
  })

  if(specificExpense !== undefined) {
    expensesArray = expensesArray.filter((expense)=> {
      return expense.type === specificExpense
    })
  }

  return expensesArray

}

export const addExpense = (budget,budgets,expenseAmount,newExpense,expenseName,expenseType)=> {
  
  let isThereAnyExpense = budget.expenses === undefined ? false : true

  budget.remaining -= expenseAmount
  budget.spent += expenseAmount

  if(budget.spent > budget.amount) {
    return toast.warn("You dont have enough amount")
  }

  if(!isThereAnyExpense) {
    budget.expenses = [newExpense] 
  }

  else {
    let budgetExpenses = budget.expenses
    budgetExpenses.push(newExpense) 
    budget.expenses = budgetExpenses
  }

  budgets[expenseType] = budget
  createData('budgets',JSON.stringify(budgets))


  increaseExpensesCount()
  return toast.success(`You've created ${expenseName} expense`)

}

export const isItEmpty = (firstInput,secondInput,e)=> {
  firstInput = firstInput.current.value.trim() , secondInput = secondInput.current.value.trim()
  if(firstInput === '' || secondInput === '') {
    toast.warn('Please fill out the Inputs!',{toastId:'unoqueId'})
    e.preventDefault()
  }
}