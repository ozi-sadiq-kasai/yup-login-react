import './Form.css'
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import {yupResolver} from '@hookform/resolvers/yup'

function Form() {
  // generate schema for how data should look
  const schema = yup.object().shape({
    name: yup.string().required('Your  Name is required'),
    address: yup.string().required('Your Address is required'),
    email: yup.string().email().required("Your is Email required"),
    password: yup.string().min(5).max(10).required( "Password must be more than 5 letters and under 10"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null],"Passwords Do not match")
      .required(),
  })

 const { register, handleSubmit, formState:{errors} } = useForm({resolver: yupResolver(schema)})

  const onSubmit = (data) =>{
   console.log(data)
  }
  return (
    <div>
      <h1> Login Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input type="text" placeholder="Name" {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
        <input type="text" placeholder="Address" {...register('address')} />
        {errors.address && <p>{errors.address.message}</p>}
        <input type="email" placeholder="Email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          type="password"
          placeholder="Password"
          {...register('password')}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <input
          type="password"
          placeholder="Confirm Password"
          {...register('confirmPassword')}
        />

        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
export default Form