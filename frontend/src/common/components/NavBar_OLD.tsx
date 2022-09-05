import React, { useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLogOutMutation } from "../../app/enhancedApi";
import { useAppSelector } from "../../app/hooks";
import classNames from "classnames";
import NavBarLink from "./NavBarLink";
import ComboBox from "../ui/ComboBox";
import ChannelSearch from "../../features/channels/ChannelSearch";

const NavBar_OLD: React.FC = () => {
  const {
    present,
    user: { role },
  } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const [logOut] = useLogOutMutation();
  const toggleRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  const onNavSelected = useCallback(() => {
    if (toggleRef.current !== null && (toggleRef.current as HTMLInputElement).checked) {
      (toggleRef.current as HTMLInputElement).checked = false;
    }
  }, [toggleRef]);

  const onProfileSelected = useCallback(() => {
    if (profileRef.current !== null && (profileRef.current as HTMLInputElement).checked) {
      (profileRef.current as HTMLInputElement).checked = false;
    }
  }, [profileRef]);

  return <div>navbar old</div>;

  // return (
  //   <div className="grid grid-cols-2 items-center justify-between items-end px-4 py-3 bg-white shadow">
  //     <input type="checkbox" ref={toggleRef} className="hidden peer transition-all" id="toggle" />
  //     <Link to="/" onClick={onNavSelected} className="col-span-1 text-md lg:hidden inline-flex flex-row gap-1">
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         fill="none"
  //         viewBox="0 0 24 24"
  //         strokeWidth={1.5}
  //         stroke="currentColor"
  //         className="w-6 h-6"
  //       >
  //         <path
  //           strokeLinecap="round"
  //           strokeLinejoin="round"
  //           d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
  //         />
  //       </svg>
  //     </Link>
  //     <label htmlFor="toggle" className="lg:hidden px-4 cursor-pointer ml-auto w-fit col-span-1">
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         className="h-6 w-6"
  //         fill="none"
  //         viewBox="0 0 24 24"
  //         stroke="currentColor"
  //         strokeWidth={2}
  //       >
  //         <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  //       </svg>
  //     </label>
  //
  //     <nav className="peer-checked:block hidden lg:block w-full col-span-full">
  //       <div className="flex flex-col lg:flex-row gap-1 lg:gap-0 justify-start lg:justify-between items-center pb-2 lg:pb-0">
  //         <div className="flex flex-col lg:flex-row gap-1 lg:gap-0 justify-start lg:justify-between items-center w-full lg:w-fit">
  //           <Link to="/" onClick={onNavSelected} className="px-2 hidden lg:inline-flex flex-row gap-1 w-fit">
  //             <svg
  //               xmlns="http://www.w3.org/2000/svg"
  //               fill="none"
  //               viewBox="0 0 24 24"
  //               strokeWidth={1.5}
  //               stroke="currentColor"
  //               className="w-6 h-6"
  //             >
  //               <path
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
  //               />
  //             </svg>
  //             <span className="uppercase">CommApp</span>
  //           </Link>
  //
  //           <div>
  //             <input type="checkbox" ref={searchRef} className="hidden peer transition-all" id="search" />
  //             <label htmlFor="search" className="hidden lg:block">
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 fill="none"
  //                 viewBox="0 0 24 24"
  //                 strokeWidth={1.5}
  //                 stroke="currentColor"
  //                 className="w-6 h-6"
  //               >
  //                 <path
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  //                 />
  //               </svg>
  //             </label>
  //             <div>
  //               <ChannelSearch />
  //             </div>
  //           </div>
  //
  //           {process.env.MODE === "dev" && (
  //             <NavBarLink to="/debug" onClick={onNavSelected}>
  //               Debug
  //             </NavBarLink>
  //           )}
  //           {present && role === "ADMIN" && (
  //             <NavBarLink to="/schools" onClick={onNavSelected}>
  //               Schools
  //             </NavBarLink>
  //           )}
  //         </div>
  //         <div className="flex flex-row gap-4 justify-between items-center">
  //           <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-center w-full lg:w-fit gap-4">
  //             <input type="checkbox" ref={profileRef} className="hidden peer transition-all" id="profile" />
  //             <label htmlFor="profile" className="hidden lg:block">
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 fill="none"
  //                 viewBox="0 0 24 24"
  //                 strokeWidth={1.5}
  //                 stroke="currentColor"
  //                 className="w-6 h-6"
  //               >
  //                 <path
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
  //                 />
  //               </svg>
  //             </label>
  //             <div className="flex flex-col gap-1 peer-checked:lg:flex lg:hidden lg:fixed lg:top-14 lg:right-2 lg:bg-white lg:shadow lg:p-4 w-full lg:w-fit">
  //               <NavBarLink to="#" onClick={onProfileSelected}>
  //                 Profile
  //               </NavBarLink>
  //               <NavBarLink to="#">Log out</NavBarLink>
  //             </div>
  //
  //             {/*{present && (*/}
  //             {/*  <button*/}
  //             {/*    type="button"*/}
  //             {/*    onClick={() => {*/}
  //             {/*      logOut();*/}
  //             {/*      onNavSelected();*/}
  //             {/*    }}*/}
  //             {/*    className={classNames(*/}
  //             {/*      "border-2 hover:bg-gray border-transparent rounded-md lg:rounded-none lg:border-x-0 lg:border-t-0 px-6 w-full text-center transition-all"*/}
  //             {/*    )}*/}
  //             {/*  >*/}
  //             {/*    Log Out*/}
  //             {/*  </button>*/}
  //             {/*)}*/}
  //           </div>
  //         </div>
  //       </div>
  //     </nav>
  //   </div>
  // );
};

export default NavBar_OLD;
