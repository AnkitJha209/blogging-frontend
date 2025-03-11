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
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setToken } from '../redux/authSlice'
import { RootState } from '../redux/store'

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(2, {
        message: "Password must be atleast 5 characters"
    })
})



export const SignInForm = () =>{
    const dispatch = useDispatch()
    const {loading} = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          password: "",
          email:""
        },
      })

    async function onSubmit(values: z.infer<typeof formSchema>){
        dispatch(setLoading(true));
    try {
      const { data } = await axios.post("http://localhost:4000/api/v1/auth/signin", values);
      if (data.success) {
        console.log(data)
        toast.success("Signed in successfully!");
        dispatch(setToken(data.token))
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
    } finally {
    dispatch(setLoading(true));;
      form.reset(); // Reset form after submission
    }
    }
    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormDescription>
                Sign In Form
              </FormDescription>
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