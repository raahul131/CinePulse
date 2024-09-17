import {FC} from "react";
import Navbar from "../components/Navbar.tsx";

const PageNotFound: FC = () => {
  return(
    <>
      <Navbar />
      <div className={"min-h-screen pt-56 text-white"}>
        <div className={"px-4 md:px-16 text-center flex flex-col"}>
          <p className={"text-[150px] font-extrabold"}>404</p>
          <p className={"text-[44px]"}>Page Not Found!</p>
        </div>
      </div>
    </>
  )
}

export default PageNotFound