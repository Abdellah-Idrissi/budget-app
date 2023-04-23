import { Form } from "react-router-dom"
import { useRef } from "react"
import { toast } from "react-toastify"
import heroImg from "../assets/illustration (1).jpg"
import { UserPlusIcon } from '@heroicons/react/24/solid'

const SignIn = () => {
  let inputRef = useRef(null)
  
  let onSubmitFn = (e)=> {
    let value = inputRef.current.value.trim()
    if(value === false || value.length < 3) {
      e.preventDefault()
      toast.warn('Enter a Username!', { toastId: 'usernameId'})
    }
  }


  return (
    <div className="p-5 grow flex gap-y-3 flex-wrap content-center justify-center lg:items-center">

      <div className="lg:w-[40%] lg:grow text-center lg:text-left">
        <h1 className="font-bold text-[40px] md:text-[70px] leading-[1.1]">Take Control of <span className="text-mainColor">Your Money</span></h1>
        <p className="mt-3 text-[17px] mx-auto lg:ml-0 max-w-[470px] md:text-[20px] lg:text-[23px] mb-5">Personal budgeting is the secret to financial freedom. Start your journey today.</p>
        
        <Form method="post" onSubmit={onSubmitFn}>
          <input type="text" ref={inputRef} name="userName" placeholder="Enter your Name" className="md:w-[300px] border-[2px] border-gray-300 px-[10px] py-[8px] outline-none rounded-md" />
          <input type="hidden" value="createUser" name="actionType" />
          <button className="blackBtn mx-auto mt-4 lg:mr-auto lg:ml-0">Create Account <UserPlusIcon className="w-[20px] inline"/>  </button>
        </Form>
      </div>

      <div className="lg:w-[40%] lg:grow bg-green-400">
        <img src={heroImg} alt="" className=""/>
      </div>

    </div>
  )
}

export default SignIn