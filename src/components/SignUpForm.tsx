import {z} from 'zod'
import axios from 'axios'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be atleast 2 characters"
    }),
    email: z.string().email(),
    password: z.string().min(2, {
        message: "Password must be atleast 5 characters"
    })
})



export const SignUpForm = () =>{
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          password: "",
          email:""
        },
      })

    async function onSubmit(values: z.infer<typeof formSchema>){
      setLoading(true)
        const res = await axios.post("http://localhost:4000/api/v1/auth/signup",{
            username: values.username,
            email: values.email,
            password: values.password
        })
        console.log(res.data)
        navigate('/signin')
      setLoading(false)
    }
    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormDescription>
                Sign Up Form
              </FormDescription>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter User Username here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Email here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder="Enter Password here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className='cursor-pointer' disabled={loading}>Submit</Button>
          </form>
        </Form>
      )
}