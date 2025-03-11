import { Button } from "./ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "./ui/navigation-menu";
import { AlignJustify } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b-1 border-black fixed z-50 top-0 left-0 shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Brand Name */}
        <NavLink to="/" className="text-2xl font-bold text-gray-900">
          BlogSphere
        </NavLink>
        <NavigationMenu className="hidden md:flex space-x-6">
          <NavigationMenuList className="flex justify-between gap-10 ">
            <NavigationMenuItem>
              <NavLink to="/" className="text-gray-700 hover:text-black">
                Home
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink to="/about" className="text-gray-700 hover:text-black">
                About Us
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink to="/contact" className="text-gray-700 hover:text-black">
                Contact Us
              </NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Buttons (Hidden on Small Screens) */}
        <div className="hidden md:flex space-x-4">
          <ModeToggle/>   
          <NavLink to='/signin'><Button className="cursor-pointer" variant="outline">Sign In</Button></NavLink>
          <NavLink to='/signup'><Button className="cursor-pointer">Sign Up</Button></NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          <AlignJustify size={24} />
        </button>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="absolute top-16 right-6 w-48 bg-white shadow-md rounded-lg py-2 flex flex-col space-y-2">
            <NavLink to="/" className="px-4 py-2 text-black hover:bg-gray-100">
              Home
            </NavLink>
            <NavLink to="/about" className="px-4 py-2 text-black hover:bg-gray-100">
              About Us
            </NavLink>
            <NavLink to="/contact" className="px-4 py-2 text-black hover:bg-gray-100">
              Contact Us
            </NavLink>
            <Button variant="outline" className="w-full">Sign In</Button>
            <Button className="w-full">Sign Up</Button>
            <ModeToggle/>
          </div>
        )}
      </div>
    </nav>
  );
}
