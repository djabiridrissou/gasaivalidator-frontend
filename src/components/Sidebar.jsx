import React, { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { NavLink, useLocation } from "react-router-dom";
import {
  BsAlignBottom,
  BsArrowLeftShort,
  BsInfoCircle,
  BsListColumns,
  BsUsbMini,
} from "react-icons/bs";
import {
  ArrowDownOnSquareIcon,
  Bars3Icon,
  DocumentTextIcon,
  HomeIcon,
  InboxIcon,
  ReceiptPercentIcon,
  RocketLaunchIcon,
  Square3Stack3DIcon,
  CalculatorIcon,
  XMarkIcon,
  ServerStackIcon,
  ServerIcon,
  KeyIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { HomeIcon as SolidHomeIcon } from "@heroicons/react/20/solid";
import { FaI, FaKaggle } from "react-icons/fa6";
import { faKhanda } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { getContractManagement } from "../redux/features/gifmis";
import { getCurentUser } from "../redux/features/auth";
import { getAllNoWorkDone } from "../redux/features/noworkdoneSlice";
import { getAllNoWarrant } from "../redux/features/gifmis";
import { getAllNoContract } from "../redux/features/gifmis";
import { getAllMisclassified } from "../redux/features/misclassifiedSlice";
import { getAllNotInGifmis } from "../redux/features/gifmis";
import { getStoreManagement } from "../redux/features/gifmis";
import { getNoIpc } from "../redux/features/gifmis";
import { getNoJudgement } from "../redux/features/gifmis";
import { getSoa } from "../redux/features/gifmis";

const SidebarMenuItem = ({
  route,
  current,
  onClick,
  icon: Icon,
  name,
  subMenu,
  isParent,
  subMenuOpen,
  setSubMenuOpen,
  open, // Prop open
  setOpen, // Prop setOpen
}) => {
  const hasSubMenu = subMenu && subMenu.length > 0;

  // Créez une référence pour l'élément CSSTransition
  const csstransitionRef = useRef(null);

  return (
    <li>
      <NavLink
        to={route}
        onClick={() => {
          onClick();
          if (hasSubMenu && isParent) {
            setSubMenuOpen(!subMenuOpen);
          }
        }}
        className={`group flex gap-x-6 gap-y-2 rounded-md ml-2 p-2 w-[90%] text-[11px] transition duration-500 leading-6 font-semibold ${current && !hasSubMenu
          ? "bg-gray-800 text-white"
          : "text-gray-400 hover:text-white hover:bg-gray-400 active transition duration-500"
          }`}
      >
        <div className="group flex gap-x-3">
          {isParent && (
            <Icon
              className={`h-5 w-5 transition duration-300 transform ${subMenuOpen ? "rotate-90" : ""
                }`}
              aria-hidden="true"
            />
          )}
          {!isParent && (
            <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
          )}
          <span className={`${open ? "" : "hidden"}`}>{name}</span>
        </div>
      </NavLink>
      {hasSubMenu && (
        <CSSTransition
          in={subMenuOpen && isParent}
          timeout={100}
          classNames="submenu-transition"
          unmountOnExit
          // Utilisez la référence pour accéder directement à l'élément CSSTransition
          nodeRef={csstransitionRef}
        >
          <ul
            // Utilisez la référence pour accéder directement à l'élément de la liste
            ref={csstransitionRef}
            className="ml-4 pr-1 mt-2 space-y-2 flex flex-1 flex-col gap-y-2 text-[12px] w-[80%]"
          >
            {subMenu.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.route}
                  className={`group flex rounded-md ml-2 w-full text-[12px] transition duration-500 leading-6 ${current && item.route === route
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-400 active transition duration-500"
                    }`}
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </CSSTransition>
      )}
    </li>
  );
};

const Sidebar = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const [ConditionsubmenuOpen, setConditionsubmenuOpen] = useState(false);
  const [cargoSubmenuOpen, setCargoSubmenuOpen] = useState(false);
  const [importSubmenuOpen, setImportSubmenuOpen] = useState(false);
  const [setupSubmenuOpen, setSetupSubmenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const isAdmin = currentUser.role?.roleName == "admin";
  const contractManagementList = useSelector((state) => state.gifmis.contractManagement);
  const noWorkDoneList = useSelector((state) => state.noworkdone.noWorkDoneList);
  const nowarrantList = useSelector((state) => state.gifmis.noWarrant);
  const nocontractList = useSelector((state) => state.gifmis.noContract);
  const misclassifiedList = useSelector((state) => state.misclassified.misclassifiedList);
  const notInGifmis = useSelector((state) => state.gifmis.notInGifmis);
  const storeManagementList = useSelector((state) => state.gifmis.storeManagement);
  const noipcList = useSelector((state) => state.gifmis.noIpc);
  const nojudgementList = useSelector((state) => state.gifmis.noJudgement);
  const soaList = useSelector((state) => state.gifmis.soa);

  useEffect(() => {
    const response = dispatch(getContractManagement()).unwrap().then((res) => {
      //console.log("contractManagement", res.data);
    });
    const response2 = dispatch(getAllNoWorkDone()).unwrap().then((res) => {

    });
    const response3 = dispatch(getAllNoWarrant()).unwrap().then((res) => {
      console.log("nowarrant", res.data);
    });
    const response4 = dispatch(getAllNoContract()).unwrap().then((res) => {
      console.log("nocontract", res.data);
    });
    const response5 = dispatch(getAllMisclassified()).unwrap().then((res) => {
      console.log("misclassifiedData", res.data);
    });
    const response6 = dispatch(getAllNotInGifmis()).unwrap().then((res) => {
      console.log("notingifmis", res.data);
    });

    const response7 = dispatch(getStoreManagement()).unwrap().then((res) => {
      console.log("storemanagement", res.data);
    });
    const response8 = dispatch(getNoIpc()).unwrap().then((res) => {
      console.log("noipc", res.data);
    });
    const response9 = dispatch(getNoJudgement()).unwrap().then((res) => {
      console.log("nojudgement", res.data);
    });
    const response10 = dispatch(getSoa()).unwrap().then((res) => {
      console.log("soa", res.data);
    })
    dispatch(getCurentUser()).unwrap().then(res => {
      //console.log("res", res.user);
      setCurrentUser(res.user);
    }).catch(error => {
      console.log(error);
    });
  }, []);
  const Menu = [
    {
      name: "Dashboard",
      icon: HomeIcon,
      route: "/dashboard",
    },
    {
      name: "Payable",
      icon: Square3Stack3DIcon,
      route: "/dashboard/goods",
    },
    {
      name: "Update Entries",
      icon: Square3Stack3DIcon,
      route: "/dashboard/gifmisprocessed",
    },
    {
      name: "Audit Issues",
      icon: Bars3Icon,
      subMenu: [
        {
          name: (
            <span>
              No-Work-Done <sup className="text-red-500">{(noWorkDoneList?.length)}</sup>
            </span>
          ),
          route: "/dashboard/noworkdone",
          icon: DocumentTextIcon
        },
        {
          name: (
            <span>
              No-Warrant <sup className="text-red-500">{(nowarrantList?.length)}</sup>
            </span>
          ), route: "/dashboard/nowarrant", icon: DocumentTextIcon
        },
        {
          name: (
            <span>
              No-Contract <sup className="text-red-500">{(nocontractList?.length)}</sup>
            </span>
          ), route: "/dashboard/nocontract", icon: DocumentTextIcon
        },

        {
          name: (
            <span>
              Misclassified <sup className="text-red-500">{(misclassifiedList?.length)}</sup>
            </span>
          ),
          route: "/dashboard/misclassified",
          icon: DocumentTextIcon,
        },
        {
          name: (
            <span>
              Not in GIFMIS <sup className="text-red-500">{(notInGifmis?.length)}</sup>
            </span>
          ),
          route: "/dashboard/notingifmis",
          icon: DocumentTextIcon,
        },
        {
          name: (
            <span>
              Store Management <sup className="text-red-500">{(storeManagementList?.length)}</sup>
            </span>
          ),
          route: "/dashboard/storemanagement",
          icon: DocumentTextIcon,
        },
        {
          name: (
            <span>
              Contract management <sup className="text-red-500">{(contractManagementList?.length)}</sup>
            </span>
          ),
          route: "/dashboard/contractmanagement",
          icon: DocumentTextIcon,
        },
        {
          name: (
            <span>
              No-Ipc <sup className="text-red-500">{(noipcList?.length)}</sup>
            </span>
          ),
          route: "/dashboard/noipc",
          icon: DocumentTextIcon,
        },
        {
          name: (
            <span>
              No-Judgement <sup className="text-red-500">{(nojudgementList?.length)}</sup>
            </span>
          ),
          route: "/dashboard/nojudgement",
          icon: DocumentTextIcon,
        },
        {
          name: (
            <span>
              SOA <sup className="text-red-500">{(soaList?.length)}</sup>
            </span>
          ),
          route: "/dashboard/soa",
          icon: DocumentTextIcon
        },
        /* {
          name: "Validated",
          route: "#",
          icon: DocumentTextIcon,
        },
        {
          name: "Validated With Issues",
          route: "#",
          icon: DocumentTextIcon,
        }, */
      ],
    },
    {
      name: "Team Leaders",
      icon: BsListColumns,
      route: "/dashboard/teamleaders",
    },
    {
      name: "Team Members",
      icon: BsAlignBottom,
      route: "/dashboard/teammembers",
    },
    {
      name: "Setup",
      icon: Bars3Icon,
      subMenu: [
        {
          name: "Create Department",
          route: "/dashboard/create-department",
          icon: DocumentTextIcon,
        },
        {
          name: "Create Branch",
          route: "/dashboard/create-branch",
          icon: DocumentTextIcon,
        },

        {
          name: "Create users",
          route: "/dashboard/register",
          icon: UserGroupIcon,
        },
      ],
    },
    {
      name: "Upload Data",
      route: "/dashboard/userfileupload",
      icon: DocumentTextIcon,
    },
  ];

  // Créez une référence pour l'élément de la barre latérale
  const sidebarRef = useRef(null);

  return (
    <div>
      <CSSTransition
        in={sidebarOpen}
        timeout={300}
        classNames="sidebar-transition"
        unmountOnExit
      >
        <div className=" inset-0 bg-gray-900/80" />
      </CSSTransition>

      <div
        // Utilisez la référence pour accéder directement à l'élément de la barre latérale
        ref={sidebarRef}
        className={` mt-0 lg:fixed h-screen  bg-gray-900 transition-all duration-700 ${open ? "w-60" : "w-24"
          }`}
      >
        <BsArrowLeftShort
          className={`bg-white z-50 text-gray-900 text-xl rounded-full absolute -right-3 top-6 border border-gray-900 cursor-pointer ${!open && "rotate-180"
            }`}
          onClick={() => setOpen(!open)}
        />
        <nav className="flex flex-1  max-h-[100%] overflow-y-auto flex-col transition-all duration-700 overflow-x-auto">
          <ul role="list" className="flex flex-1 flex-col gap-y-6">
            <div className="mb-4 cube-container sticky top-3 z-40 flex h-8 shrink-0 items-center gap-x-1 border-gray-200 bg-gray-900 px-4 shadow-sm sm:gap-x-2 sm:px-6 lg:px-4">
              <div className="bg-red-500 w-5 h-5 rotate-[-14deg] flex items-center justify-center text-white mr-0 font-bold face front right back ">
                G
              </div>
              <div className="bg-[#f1b92bd9] w-5 h-5 rotate-[16deg] flex items-center justify-center text-white font-bold face front right back">
                A
              </div>
              <div className="bg-green-500 w-5 h-5 rotate-[-12deg] flex items-center justify-center text-white font-bold face front right back animate-shake">
                S
              </div>
              <span
                className={`font-bold h-5 text-xl text-white ${open ? "block" : "hidden"
                  }`}
              >
                AI Validator
              </span>
            </div>
            {Menu.map((menu, index) => {
              if ((menu.name === "Setup" || menu.name === "Team Leaders" || menu.name === "Team Members") && !isAdmin) {
                return null; // Ne pas afficher le menu Setup pour les non-administrateurs
              }

              return ((

                <SidebarMenuItem
                  key={index}
                  route={menu.route}
                  current={menu.route === location.pathname}
                  icon={menu.icon}
                  name={menu.name}
                  subMenu={menu.subMenu}
                  isParent={
                    menu.name === "Audit Issues" ||
                    menu.name === "Cargo" ||
                    menu.name === "Imports" ||
                    menu.name === "Setup"
                  }
                  subMenuOpen={
                    menu.name === "Audit Issues"
                      ? ConditionsubmenuOpen
                      : menu.name === "Cargo"
                        ? cargoSubmenuOpen
                        : menu.name === "Imports"
                          ? importSubmenuOpen
                          : menu.name === "Setup"
                            ? setupSubmenuOpen
                            : false
                  }
                  setSubMenuOpen={
                    menu.name === "Audit Issues"
                      ? setConditionsubmenuOpen
                      : menu.name === "Cargo"
                        ? setCargoSubmenuOpen
                        : menu.name === "Imports"
                          ? setImportSubmenuOpen
                          : menu.name === "Setup"
                            ? setSetupSubmenuOpen
                            : null
                  }
                  open={open} // Prop open
                  setOpen={setOpen} // Prop setOpen
                  onClick={() => {
                    if (menu.name === "Audit Issues") {
                      setConditionsubmenuOpen(!ConditionsubmenuOpen);
                      setCargoSubmenuOpen(false);
                      setImportSubmenuOpen(false);
                      setSetupSubmenuOpen(false);
                    } else if (menu.name === "Cargo") {
                      setCargoSubmenuOpen(!cargoSubmenuOpen);
                      setConditionsubmenuOpen(false);
                      setImportSubmenuOpen(false);
                      setSetupSubmenuOpen(false);
                    } else if (menu.name === "Imports") {
                      setImportSubmenuOpen(!importSubmenuOpen);
                      setCargoSubmenuOpen(false);
                      setConditionsubmenuOpen(false);
                      setSetupSubmenuOpen(false);
                    } else if (menu.name === "Setup") {
                      setSetupSubmenuOpen(!setupSubmenuOpen);
                      setConditionsubmenuOpen(false);
                      setCargoSubmenuOpen(false);
                      setImportSubmenuOpen(false);
                    } else {
                      setConditionsubmenuOpen(false);
                      setCargoSubmenuOpen(false);
                      setImportSubmenuOpen(false);
                      setSetupSubmenuOpen(false);
                    }
                  }}
                />
              ))
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
