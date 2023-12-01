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
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { HomeIcon as SolidHomeIcon } from "@heroicons/react/20/solid";
import { FaI, FaKaggle } from "react-icons/fa6";
import { faKhanda } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { getContractManagement, getOverpayment, getWithoutIssue, getPerformanceIssue, getBtaIssued, getBtaNotIssued } from "../redux/features/gifmis";
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
import { getFailedVisit } from "../redux/features/gifmis";
import { getOverpaymentCount } from "../redux/features/gifmis";
import WithoutIssue from "../pages/WithoutIssue";
import FailedVisit from "../pages/FailedVisit";
import BtaIssued from "../pages/BtaIssued";
import BtaNotIssued from "../pages/BtaNotIssued";
import { BiAccessibility } from "react-icons/bi";

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
  const [summarySubmenuOpen, setSummarySubmenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const isAdmin = currentUser.role?.roleName == "admin";

const [overpaymentLength, setOverpaymentLength] = useState(0);
  const [soaLength, setSoaLength] = useState(0);
  const [noWorkLength, setNoWorkLength] = useState(0);
  const [noWarrantLength, setNoWarrantLength] = useState(0);
  const [noContractLength, setNoContractLength] = useState(0);
  const [misclassifiedLength, setMisclassifiedLength] = useState(0);
  const [notInGifmisLength, setNotInGifmisLength] = useState(0);
  const [storemanagementLength, setStoremanagementLength] = useState(0);
  const [contractManagementLength, setContractManagementLength] = useState(0);
  const [noIpcLength, setNoIpcLength] = useState(0);
  const [withoutLength, setWithoutLength] = useState(0);
  const [fieldLength, setFieldLength] = useState(0);
  const [performanceLength, setPerformanceLength] = useState(0);
  const [btaIssuedLength, setBtaIssuedLength] = useState(0);
  const [btaNotIssuedLength, setBtaNotIssuedLength] = useState(0);
  function customParse(str) {
    str = str?.replace(/,/g, "");
    str = str?.replace(".", ",");
    return parseFloat(str);
  }

  const calculateContractAmount = (contracts) => {
    let total = 0;
    const totalContracts = contracts.map((item) => {
        const amount = customParse(item.unitPrice);
        //console.log("dans contrat", item, amount);
        if (!isNaN(amount)) {
            total += amount;
        } else {
            total += 0;
        }
    });
    //console.log("totalcontracts", total);
    return total;
};

const calculateTransactionAmount = (transactions) => {
    let total = 0;
    const totalTransactions = transactions.map((item) => {
        const amount = customParse(item.amountPaid);
        //console.log("dans calc", item, amount);
        if (!isNaN(amount)) {
            total += amount;
        } else {
            total += 0;
        }
    });
    //console.log("total", total);
    return total;
};






  useEffect(() => {
    const response = dispatch(getContractManagement()).unwrap().then((res) => {
      //console.log("contractManagement", res.data);
      setContractManagementLength(res.total);
    });
    const response2 = dispatch(getAllNoWorkDone()).unwrap().then((res) => {
        setNoWorkLength(res.total);
    });
    const response3 = dispatch(getAllNoWarrant()).unwrap().then((res) => {
      //console.log("nowarrant", res.data);
      setNoWarrantLength(res.total);
    });
    const response4 = dispatch(getAllNoContract()).unwrap().then((res) => {
      //console.log("nocontract", res.data);
      setNoContractLength(res.total);
    });
    const response5 = dispatch(getAllMisclassified()).unwrap().then((res) => {
      //console.log("misclassifiedData", res.data);
      setMisclassifiedLength(res.total);
    });
    const response6 = dispatch(getAllNotInGifmis()).unwrap().then((res) => {
      //console.log("notingifmis", res.data);
      setNotInGifmisLength(res.total);
    });

    const response7 = dispatch(getStoreManagement()).unwrap().then((res) => {
      //console.log("storemanagement", res.data);
      setStoremanagementLength(res.total);
    });
    const response8 = dispatch(getNoIpc()).unwrap().then((res) => {
      //console.log("noipc", res.data);
      setNoIpcLength(res.total);
    });
    const response9 = dispatch(getNoJudgement()).unwrap().then((res) => {
      //console.log("nojudgement", res.data);
    });
    const response10 = dispatch(getSoa()).unwrap().then((res) => {
      
      setSoaLength(res.total);
    })
    const response11 = dispatch(getOverpayment()).unwrap().then((res) => {
      //console.log("overpayment", res.data);
      setOverpaymentLength(res?.total);
    })
    const response12 = dispatch(getWithoutIssue()).unwrap().then((res) => {
      //console.log("withoutissue", res.data);
      setWithoutLength(res.total);
    })
    const response13 = dispatch(getFailedVisit()).unwrap().then((res) => {
      //console.log("failedvisit", res.data);
      setFieldLength(res.total);
    })
    const response14 = dispatch(getPerformanceIssue()).unwrap().then((res) => {
      //console.log("performanceissue", res.data);
      setPerformanceLength(res.total);
    })
    const response15 = dispatch(getBtaIssued()).unwrap().then((res) => {
      //console.log("bta issued", res.data);
      setBtaIssuedLength(res.total);
    })
    const response16 = dispatch(getBtaNotIssued()).unwrap().then((res) => {
      //console.log("bta not issued", res.data);
      setBtaNotIssuedLength(res.total);
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
      name: "Assign Payable",
      icon: ShareIcon,
      route: "/dashboard/affect",
    },
    /* {
      name: "Delete user transactions",
      icon: TrashIcon,
      route: "/dashboard/deleteusertransactions",
    }, */
    {
      name: "Audit Issues",
      icon: Bars3Icon,
      subMenu: [
        {
          name: (
            <span>
              No-Work-Done <sup className="text-red-500">{noWorkLength}</sup>
            </span>
          ),
          route: "/dashboard/noworkdone",
          icon: DocumentTextIcon
        },
        {
          name: (
            <span>
              No-Warrant <sup className="text-red-500">{noWarrantLength}</sup>
            </span>
          ), route: "/dashboard/nowarrant", icon: DocumentTextIcon
        },
        {
          name: (
            <span>
              No-Contract <sup className="text-red-500">{noContractLength}</sup>
            </span>
          ), route: "/dashboard/nocontract", icon: DocumentTextIcon
        },

        {
          name: (
            <span>
              Misclassified <sup className="text-red-500">{misclassifiedLength}</sup>
            </span>
          ),
          route: "/dashboard/misclassified",
          icon: DocumentTextIcon,
        },
        {
          name: (
            <span>
              Not in GIFMIS <sup className="text-red-500">{notInGifmisLength}</sup>
            </span>
          ),
          route: "/dashboard/notingifmis",
          icon: DocumentTextIcon,
        },

        {
          name: (
            <span>
              No-Ipc <sup className="text-red-500">{noIpcLength}</sup>
            </span>
          ),
          route: "/dashboard/noipc",
          icon: DocumentTextIcon,
        },
        {
          name: (
            <span>
              Over-Payment <sup className="text-red-500">{overpaymentLength}</sup>
            </span>
          ),
          route: "/dashboard/overpayment",
          icon: DocumentTextIcon,
        },
        
      ],
    },
    
    {
      name: "Summary Report",
      icon: Bars3Icon,
      subMenu: [
        {
          name: (
            <span>
              Store Management <sup className="text-red-500">{storemanagementLength}</sup>
            </span>
          ),
          route: "/dashboard/storemanagement",
          icon: DocumentTextIcon,
        },
        {
          name: (
            <span>
              Contract management <sup className="text-red-500">{contractManagementLength}</sup>
            </span>
          ),
          route: "/dashboard/contractmanagement",
          icon: DocumentTextIcon,
        },
        {
          name: (
            <span>
              SOA <sup className="text-red-500">{soaLength}</sup>
            </span>
          ),
          route: "/dashboard/soa",
          icon: DocumentTextIcon
        },
        {
          name: (
            <span>
              Without Issue <sup className="text-red-500">{withoutLength}</sup>
            </span>
          ),
          route: "/dashboard/withoutissue",
          icon: DocumentTextIcon
        },
        {
          name: (
            <span>
              Field Visit <sup className="text-red-500">{fieldLength}</sup>
            </span>
          ),
          route: "/dashboard/failedvisit",
          icon: DocumentTextIcon
        },
        {
          name: (
            <span>
              Performance Issue <sup className="text-red-500">{performanceLength}</sup>
            </span>
          ),
          route: "/dashboard/performanceissue",
          icon: DocumentTextIcon
        },
        {
          name: (
            <span>
              BTA Issued <sup className="text-red-500">{btaIssuedLength}</sup>
            </span>
          ),
          route: "/dashboard/btaissued",
          icon: DocumentTextIcon
        },
        {
          name: (
            <span>
              BTA Not Issued <sup className="text-red-500">{btaNotIssuedLength}</sup>
            </span>
          ),
          route: "/dashboard/btanotissued",
          icon: DocumentTextIcon
        },

      ]
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
              if ((menu.name === "Setup" || menu.name === "Team Leaders" || menu.name === "Team Members" || menu.name === "Assign Payable" || menu.name === "Delete user transactions") && !isAdmin) {
                return null; // Ne pas afficher le menu Setup pour les non-administrateurs
              }

              if ((currentUser?.role?.id == 3) && ((menu.name === "Upload Data") || (menu.name === "Assign Payable") || (menu.name === "Delete user transactions"))) {
                return null;
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
                    menu.name === "Setup" ||
                    menu.name === "Summary Report"
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
                            : menu.name === "Summary Report"
                              ? summarySubmenuOpen
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
                            : menu.name === "Summary Report"
                              ? setSummarySubmenuOpen
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
                      setSummarySubmenuOpen(false);
                    } else if (menu.name === "Cargo") {
                      setCargoSubmenuOpen(!cargoSubmenuOpen);
                      setConditionsubmenuOpen(false);
                      setImportSubmenuOpen(false);
                      setSetupSubmenuOpen(false);
                      setSummarySubmenuOpen(false);
                    } else if (menu.name === "Imports") {
                      setImportSubmenuOpen(!importSubmenuOpen);
                      setCargoSubmenuOpen(false);
                      setConditionsubmenuOpen(false);
                      setSetupSubmenuOpen(false);
                      setSummarySubmenuOpen(false);
                    } else if (menu.name === "Setup") {
                      setSetupSubmenuOpen(!setupSubmenuOpen);
                      setConditionsubmenuOpen(false);
                      setCargoSubmenuOpen(false);
                      setImportSubmenuOpen(false);
                      setSummarySubmenuOpen(false);
                    } else if (menu.name === "Summary Report") {
                      setSummarySubmenuOpen(!summarySubmenuOpen);
                      setConditionsubmenuOpen(false);
                      setCargoSubmenuOpen(false);
                      setImportSubmenuOpen(false);
                      setSetupSubmenuOpen(false);
                    } else {
                      setConditionsubmenuOpen(false);
                      setCargoSubmenuOpen(false);
                      setImportSubmenuOpen(false);
                      setSetupSubmenuOpen(false);
                      setSummarySubmenuOpen(false);
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
