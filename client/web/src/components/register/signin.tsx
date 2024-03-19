/** @format */

import React, { ChangeEvent, useState } from "react";
import { Label } from "../label";
import { Input } from "../input";
import { cn } from "../../utils/cn";
import axios from "axios";
import { useRecoilState } from "recoil";
import { authenticatedState } from "../../utils/states";
import { useNavigate } from "react-router-dom";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";

export default function SignIn() {
  const navigate = useNavigate();
  const [sign, setSign] = useState<{
    email: "";
    password: "";
    username: "";
  }>({ email: "", password: "", username: "" });
  const [authorization, setAuthorization] = useRecoilState(authenticatedState);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await axios.post(
      "http://localhost:5000/api/v1/register",
      sign
    );
    if (data.data) {
      setAuthorization(true);
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("id", data.data.id);
      navigate("/");
    } else {
      setAuthorization(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSign((val) => {
      return {
        ...val,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Bienvenu
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Créez votre compte et intégrez une communauté active.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer>
          <Label htmlFor="firstname">Nom et Prénom *</Label>
          <Input
            onChange={handleChange}
            id="firstname"
            placeholder="Tyler"
            type="text"
            name="username"
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mt-4">
          <Label htmlFor="email">Email *</Label>
          <Input
            onChange={handleChange}
            id="email"
            placeholder="projectmayhem@fc.com"
            name="email"
            type="email"
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mt-4">
          <Label htmlFor="password">Mot de passe *</Label>
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
          className="bg-gradient-to-br relative group/btn mt-4 text-back bg-secondary w-full rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Créez votre compte &rarr;
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
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
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
