/** @format */

import React, { useEffect, useState } from "react";
import { ImagesSlider } from "../components/image.slider";
import { motion } from "framer-motion";
import { imageSliders } from "../utils/const";
import { useRecoilState } from "recoil";
import { registerCompenentState } from "../utils/states";
import Login from "../components/register/login";
import SignIn from "../components/register/signin";

const components = {
  SignIn,
  Login
};

export function RegisterPage() {
  const [text, setText] = useState("Sign up");
  const [current_register_component, setCRC] = useRecoilState(
    registerCompenentState
  );
  useEffect(() => {
    if (current_register_component == "SignIn") {
      setText("Se connecter");
    } else {
      setText("S'inscrir");
    }
  }, [current_register_component]);

  const swapComponent = () => {
    if (text == "Sign up") {
      setCRC("SignIn");
      setText("Login");
    } else {
      setCRC("Login");
      setText("Sign up");
    }
  };
  const DynamicComponent =
    components[current_register_component] || (() => <div>Not found</div>);

  return (
    <div className=" grid grid-cols-3 h-screen">
      <ImagesSlider className="col-span-2 h-screen" images={imageSliders}>
        <motion.div
          initial={{
            opacity: 0,
            y: -80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="z-50 flex flex-col justify-center items-center"
        >
          <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
            Aidez la communauté à s'agrandir
          </motion.p>
          <button
            onClick={swapComponent}
            className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4"
          >
            <span>{text} →</span>
            <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
          </button>
        </motion.div>
      </ImagesSlider>
      <div className="flex items-center justify-cente">
        <DynamicComponent />
      </div>
    </div>
  );
}
