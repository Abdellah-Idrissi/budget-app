import ExpensesTable from "../components/ExpensesTable"


export default function Expenses() {

  return (
    <div className="px-5">
      <h2 className='text-[30px] sm:text-[37px] md:text-[45px] lg:text-[58px] font-bold my-4 mb-5 text-center underline'>All Expenses</h2>

      <ExpensesTable showGoBack={true} />
    </div>
  )
}
