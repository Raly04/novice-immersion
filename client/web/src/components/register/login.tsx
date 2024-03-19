/** @format */

import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import React, { ChangeEvent, useState } from "react";
import { Label } from "../label";
import { Input } from "../input";
import { cn } from "../../utils/cn";
import axios from "axios";
import { useRecoilState } from "recoil";
import { authenticatedState, currentUserState } from "../../utils/states";
import { useNavigate } from "react-router-dom";
import { socket } from "../../utils/socket";

export default function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState<{
    email: "";
    password: "";
  }>({ email: "", password: "" });

  const [authorization, setAuthorization] = useRecoilState(authenticatedState);
  const [currentUser,setCurrentUser] = useRecoilState(currentUserState)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(login);
    const res = await axios.post("http://localhost:5000/api/v1/login", login);
    console.log(res);
    if (res.data) {
      setAuthorization(true);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("currentUser", JSON.stringify(res.data.user));
      setCurrentUser(res.data.user)
      navigate("/dashboard");
    } else {
      setAuthorization(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin((val) => {
      return {
        ...val,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white text-orBack rounded-none md:rounded-2xl p-4 md:p-8 shadow-input">
      <h2 className="font-bold text-xl">
        Heureux de vous revoir !
      </h2>
      <p className=" text-sm max-w-sm mt-2 dark">
        Veuillez vous connecter et poursuivre votre merveilleuse aventure dans
        la communauté.
      </p>

    <form className="my-8" onSubmit={handleSubmit}>
      <LabelInputContainer>
        <Label htmlFor="email">E-mail</Label>
        <Input
          onChange={handleChange}
          id="email"
          placeholder="ralyandrynyainakadmiel@gmail.com"
          type="text"
          name="email"
          required
        />
      </LabelInputContainer>
      <LabelInputContainer className="mt-4">
        <Label htmlFor="password">Password</Label>
        <Input
          onChange={handleChange}
          id="password"
          placeholder="••••••••"
          name="password"
          type="password"
          required
        />
      </LabelInputContainer>

        <button
          className="bg-secondary relative mt-4 group/btn w-full text-zinc-800 rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Se connecter &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-secondary" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-secondary" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-secondary" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-secondary" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

export const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-secondary to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-secondary to-transparent" />
    </>
  );
};

export const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

function setAuthorization(arg0: boolean) {
  throw new Error("Function not implemented.");
}
