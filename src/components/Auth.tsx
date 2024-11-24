import React, { useCallback, useState } from "react";
import Logo from "../assets/cinepulse-logo.png";
import Input from "./Input";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { setDoc, doc } from "firebase/firestore";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VscLoading } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const Auth: React.FC = () => {
  const dispatch = useDispatch();
  const [variant, setVariant] = useState<string>("login");
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const submitHandler = async () => {
    setIsLoading(true);
    try {
      if (variant === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Signed in successfully!!", {
          position: "top-right",
          theme: "dark",
          autoClose: 3000,
          transition: Slide,
        });
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: name,
        });

        if (auth.currentUser) {
          const { uid, email, displayName } = auth.currentUser;
          dispatch(
            addUser({ uid: uid, email: email, displayName: displayName })
          );
          await setDoc(doc(db, "Users", uid), {
            email: email,
            name: name,
          });
          toast.success("Account created successfully!!", {
            position: "top-center",
          });
        }
      }
    } catch (error) {
      console.error("Error during sign up", (error as Error).message);
      toast.error((error as Error).message, {
        position: "bottom-center",
      });
    } finally {
      setIsLoading(false);
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="relative h-screen w-full bg-no-repeat bg-fixed bg-cover bg-[url('./assets/hero.jpg')]">
      <div className="bg-[#01061d] h-full w-full lg:bg-opacity-45">
        <nav className="px-12 py-5">
          <img
            src={Logo}
            alt="Logo"
            className="h-14 transform scale-[3] mx-10"
          />
        </nav>
        <div className="flex justify-center">
          <div
            className="bg-slate-900/40 px-16 py-16 self-center mt-2 lg:w-2/5 
          lg:max-w-md rounded-md w-full"
          >
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Sign up"}
            </h2>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-4"
            >
              {variant === "register" && (
                <Input
                  label="Username"
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                    setName(ev.target.value)
                  }
                  id="name"
                  type="text"
                  value={name}
                />
              )}

              <Input
                label="Email"
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(ev.target.value)
                }
                id="email"
                type="email"
                value={email}
              />

              <Input
                label="Password"
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(ev.target.value)
                }
                id="password"
                type="password"
                value={password}
              />
              <button
                onClick={submitHandler}
                className="py-3 text-white rounded-md w-full mt-10 bg-blue-800 
                font-semibold tracking-wider flex justify-center items-center hover:bg-blue-900"
                disabled={isLoading}
              >
                {isLoading ? (
                  <VscLoading size={25} className="animate-spin" />
                ) : variant === "login" ? (
                  "Sign In"
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
            <p className="text-neutral-500 mt-12 text-sm">
              {variant === "login"
                ? "First time using Movix?"
                : "Already an user?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? " Create an account" : "Please sign in"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer limit={1} />
    </div>
  );
};

export default Auth;
