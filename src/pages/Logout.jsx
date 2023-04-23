import { toast } from "react-toastify"
import { removeData } from "../Helpers"
import {  useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Logout = () => {
  let navigate = useNavigate()

  useEffect(()=> {
    {navigate('/',{replace:true})}
  })

}

export default Logout

export const logoutAction = ()=> {
  removeData('userName')
  removeData('budgets')
  removeData('expenses')

  return toast.success(`You've deleted your account`)
}