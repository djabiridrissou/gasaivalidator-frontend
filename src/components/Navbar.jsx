import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { UserCircleIcon } from '@heroicons/react/20/solid';
import { FaEdit, FaTimes } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurentUser } from "../redux/features/auth";
import { current } from '@reduxjs/toolkit';
import Snowfall from 'react-snowfall';
import { HiMiniInformationCircle } from "react-icons/hi2";

const navigation = [
 /*  { name: 'Dashboard', href: '#', current: true },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Teams', href: '#', current: false },
  { name: 'Directory', href: '#', current: false } */,
]
const userNavigation = [
  { name: 'Profile', href: '/dashboard/profile' },
  { name: 'Sign out', href: '/' },
]

const user = [];
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function NavB() {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const [isSnowing, setIsSnowing] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  const handleSnowing = () => {
    const newState = !isSnowing;
    setIsSnowing(newState);
    localStorage.setItem('snowState', JSON.stringify(newState));
  };

  useEffect(() => {
    dispatch(getCurentUser()).unwrap().then(res => {
      //console.log("res", res.user);
      setCurrentUser(res.user);
    }).catch(error => {
      console.log(error);
    });
    const snowState = localStorage.getItem('snowState');
    if (snowState) {
      setIsSnowing(JSON.parse(snowState));
    }
  }, []);
  return (
    <>
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Popover
        as="header"
        className={({ open }) =>
          classNames(
            open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
            'bg-white shadow-sm lg:static lg:overflow-y-visible'
          )
        }
      >
        {({ open }) => (
          <>
            <div className="mx-auto w-full py-3 mb-3 px-6 sm:px-6 lg:px-8 shadow-md ml-1">
              <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">

                <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
                  <div className="flex flex-shrink-0 items-center">
                    {/* <a href="#">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                    </a> */}
                  </div>
                </div>
                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6 items-center justify-center">

                  <div className="flex items-center justify-between px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                    <div className="tooltip">
                      <HiMiniInformationCircle className="info-icon w-6 h-6" />
                      <span className="tooltiptext">Use the "Profile" section under your username to change your password</span>
                    </div>
                    <div style={{ width: '35px', height: '35px', border: '1px solid #ccc', borderRadius: '50%', overflow: 'hidden' }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {isHovered ? (
                        <button
                          onClick={() => handleSnowing()}
                          style={{
                            position: 'absolute',
                            transform: 'translate(-50%, -50%)',
                            height: '30px',
                            top: '50%',
                            borderRadius: '4px',
                            color: '#fff',
                            cursor: 'pointer',
                            zIndex: '1',
                            background: isSnowing ? 'red' : 'green',
                          }}
                        >
                          {isSnowing ? 'Stop Snow' : 'is Snowing'}
                        </button>
                      ) : (
                        <img
                          src="/images/neige.jpg"
                          alt="Description de l'image"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      )}
                    </div>
                    {/* <div className="w-full">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                        {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div> 
                        {/* <input
                          id="search"
                          name="search"
                          className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                          placeholder="Search"
                          type="search"
                        />
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="relative -mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>
                <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                  <button
                    type="button"
                    className="relative ml-5 flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-5 flex-shrink-0">
                    <div className='flex flex-col items-center'>
                      <Menu.Button className="relative flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <UserCircleIcon // Use the blank user icon from Heroicons here
                          className="h-8 w-8 rounded-full"
                          aria-hidden="true"
                        />

                      </Menu.Button>
                      <span className=''>{currentUser.lastname}</span>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  {/*  <a
                    href="#"
                    className="ml-6 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    New Project
                  </a> */}
                </div>
              </div>
            </div>

            <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
              <div className="mx-auto max-w-3xl space-y-1 px-2 pb-3 pt-2 sm:px-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50',
                      'block rounded-md py-2 px-3 text-base font-medium'
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800"></div>
                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                  </div>
                  <button
                    type="button"
                    className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
                  {userNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
      {isSnowing && (
        <Snowfall
          snowflakeCount={250} // Augmenter le nombre de flocons
          snowflakeZIndex={2}
          color="#808080b3" // Utiliser une couleur contrastante
          snowflakePosition="absolute"
          snowflakeBottom="-50px"
          snowflakeSizeMin={10} // Augmenter la taille minimale des flocons
          snowflakeSizeMax={20} // Augmenter la taille maximale des flocons
          windSpeed={1} // Diminuer la vitesse des flocons
        />
      )}
    </>
  )
}