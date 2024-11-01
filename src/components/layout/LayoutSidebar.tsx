import Link from "next/link";
import Image from "next/image";
import profilePic from "../../../public/avatar2.png";
import { FaAngleDown } from "react-icons/fa6";
import { BsNintendoSwitch } from "react-icons/bs";
import { RiNotification2Line } from "react-icons/ri";
import { CiSearch, CiViewTable } from "react-icons/ci";
import { IoMdAddCircle } from "react-icons/io";
import { WiDaySunny } from "react-icons/wi";
import { LuCalendarDays } from "react-icons/lu";
import { CgToday } from "react-icons/cg";
function LayoutSidebar() {
  return (
    <div className="bg-sidebar-color p-4 min-w-72 flex flex-col">
      <header className="flex justify-between">
        <button className="flex hover:bg-hover-color px-2 py-2 rounded">
          <Image
            src={profilePic}
            alt="Img"
            width={24}
            height={24}
            className="rounded-full"
          />
          <div className="ml-2 flex items-center">
            <span className="font-semibold">Toai</span>
            <span className="ml-2">
              <FaAngleDown />
            </span>
          </div>
        </button>
        <div className="flex items-center">
          <button className="hover:bg-hover-color h-10 w-10 flex items-center justify-center px-2 py-2 rounded ">
            <RiNotification2Line />
          </button>
          <button className="hover:bg-hover-color h-10 w-10 flex items-center justify-center ml-2 px-2 py-2 rounded">
            <BsNintendoSwitch />
          </button>
        </div>
      </header>

      <section className="flex-grow">
        <button className="flex w-full items-center hover:bg-hover-color rounded">
          <span className="h-8 w-8 rounded flex items-center justify-center text-primary-color">
            <IoMdAddCircle />
          </span>
          <span className="flex-1 text-start font-semibold ml-2 text-primary-color">
            Add task
          </span>
        </button>

        <button className="flex w-full items-center hover:bg-hover-color rounded">
          <span className="h-8 w-8 rounded flex items-center justify-center text-text-color">
            <CiSearch />
          </span>
          <span className="flex-1 text-start ml-2 text-text-color">Search</span>
        </button>

        <div className="w-full hover:bg-hover-color rounded">
          <Link href="/todos" passHref>
            <div className="w-full flex items-center">
              <span className="h-8 w-8 rounded flex items-center justify-center text-text-color">
                <CiViewTable />
              </span>
              <span className="ml-2 flex-grow text-text-color">Todos</span>
            </div>
          </Link>
        </div>

        <div>
          <div className="flex w-full items-center hover:bg-hover-color rounded">
            {/* Active: text-primary-color */}

            <div className="w-full bg-active-color text-primary-color">
              <Link href="/today" passHref>
                <div className="flex items-center">
                  <span className="h-8 w-8 rounded flex items-center justify-center ">
                    <WiDaySunny />
                  </span>
                  <span className="flex-grow ml-2">Today</span>
                  <span className="px-2 py-1 text-xs">2</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="flex w-full items-center hover:bg-hover-color rounded">
            <a href="#" className="w-full flex items-center">
              <span className="h-8 w-8 rounded flex items-center justify-center text-text-color">
                <LuCalendarDays />
              </span>
              <span className="flex-grow ml-2 text-text-color">Upcoming</span>
              <span className="px-2 py-1 text-xs text-text-color">2</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="flex w-full items-center hover:bg-hover-color rounded">
        <a href="#" className="w-full flex items-center">
          <span className="h-8 w-8 rounded flex items-center justify-center text-text-color">
            <CgToday />
          </span>
          <span className="font-semibold text-text-color ml-2">Cartoon</span>
        </a>
      </footer>
    </div>
  );
}

export default LayoutSidebar;
