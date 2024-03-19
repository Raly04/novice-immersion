/** @format */

import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { registerCompenentState } from "../../utils/states";

const navItems = [
  {
    label: "Accueil",
    target: "#imersion",
    isSelected: true,
  },
  {
    label: "A propos",
    target: "#description",
    isSelected: false,
  },
  {
    label: "Club",
    target: "#club",
    isSelected: false,
  },
];

export default function NavBar() {
  const [navItemState, setNavItemState] = useState(navItems);
  const [current_register_component, setCRC] = useRecoilState(registerCompenentState);
  const navigate = useNavigate();

  const navigateTo = (path, action) => {
    if (action == "Signin") {
      setCRC("SignIn");
    } else {
      setCRC("Login");
    }
    navigate(path);
  };

  const setActiveItem = (item) => {
    const items = navItemState.map((i) => {
      if (i == item) {
        return { ...i, isSelected: true };
      } else {
        return { ...i, isSelected: false };
      }
    });
    setNavItemState(items);
  };

  return (
    <Navbar maxWidth="full" className=" z-[99999999999999] bg-trnasparent text-white">
      <NavbarBrand>
       <img src="/logo-no-background.png" alt="" className="w-20 h-12"/>
      </NavbarBrand>
      <NavbarContent className="sm:flex gap-4 text-white" justify="center">
        {navItemState.map((item, key) => {
          if (item.isSelected) {
            return (
              <NavbarItem key={key}>
                <Link
                  onClick={() => setActiveItem(item)}
                  className="text-secondary font-semibold"
                  href={item.target}
                >
                  {item.label}
                </Link>
              </NavbarItem>
            );
          } else {
            return (
              <NavbarItem key={key}>
                <Link
                  onClick={() => setActiveItem(item)}
                  className="text-white font-semibold"
                  href={item.target}
                >
                  {item.label}
                </Link>
              </NavbarItem>
            );
          }
        })}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            color="secondary"
            className="px-4 py-2 rounded-full text-white font-semibold"
            onClick={() => navigateTo("/register", "Login")}
            variant="flat"
          >
            Se connecter
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            className="bg-secondary text-black px-4 py-2 rounded-full font-semibold"
            as={Link}
            variant="flat"
            onClick={() => navigateTo("/register", "Signin")}
          >
            S'inscrire
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    // <Navbar className="bg-transparent">
    //   <NavbarBrand >
    //     {/* <AcmeLogo /> */}
    //     <p className="font-bold text-inherit">ACME</p>
    //   </NavbarBrand>
    //   <NavbarContent className="hidden sm:flex gap-4" justify="center">
    //     <NavbarItem>
    //       <Link color="foreground" href="#">
    //         Features
    //       </Link>
    //     </NavbarItem>
    //     <NavbarItem isActive>
    //       <Link href="#" aria-current="page">
    //         Customers
    //       </Link>
    //     </NavbarItem>
    //     <NavbarItem>
    //       <Link color="foreground" href="#">
    //         Integrations
    //       </Link>
    //     </NavbarItem>
    //   </NavbarContent>
    //   <NavbarContent justify="end">
    //     <NavbarItem className="hidden lg:flex">
    //       <Link href="#">Login</Link>
    //     </NavbarItem>
    //     <NavbarItem>
    //       <Button as={Link} color="primary" href="#" variant="flat">
    //         Sign Up
    //       </Button>
    //     </NavbarItem>
    //   </NavbarContent>
    // </Navbar>

  );
}
