import { ThemeProvider } from "./components/theme-provider"
import { Outlet } from "react-router-dom"
import { NavBar } from "./components/NavBar"
import { Footer } from "./components/Footer"


function App() {

  return (
    <ThemeProvider>
      <NavBar/>
      <div className="pt-20">
      <Outlet/>
      <Footer/>
      </div>
    </ThemeProvider>
  )
}

export default App
