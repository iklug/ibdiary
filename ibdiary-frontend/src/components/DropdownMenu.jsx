import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { addData } from "../redux/calendarSlice";
import { useDispatch, useSelector } from "react-redux";
import exampleData from "../utils/exampleData";
import { changeRoute, selectRoute } from "../redux/routeSlice";

export default function DropdownMenu() {
  const dispatch = useDispatch();

  const dispatchExampleData = () => {
    dispatch(addData(exampleData));
  };

  const viewGraph = () => {
    dispatch(changeRoute("graph"));
  };
  const viewCalendar = () => {
    dispatch(changeRoute("calendar"));
  };

  const route = useSelector(selectRoute);

  return (
    <Menu as="div" className="relative ml-6 md:hidden">
      <MenuButton className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
        <span className="sr-only">Open menu</span>
        <EllipsisHorizontalIcon className="size-5" aria-hidden="true" />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              Profile
            </a>
          </MenuItem>
        </div>
        <div className="py-1">
          {route === "graph" ? (
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                onClick={() => viewCalendar()}
              >
                Calendar
              </a>
            </MenuItem>
          ) : (
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                onClick={() => viewGraph()}
              >
                Analyze Diary
              </a>
            </MenuItem>
          )}
        </div>
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
              onClick={() => dispatchExampleData()}
            >
              Example Data
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
