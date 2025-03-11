import { SignUpForm } from "../components/SignUpForm"

export const SignUp = () => {
    return <div className="flex justify-center items-center min-h-screen">
        <div className="flex border-2 px-10 py-5 justify-center items-center">
            <SignUpForm/>
        </div>
    </div>
}