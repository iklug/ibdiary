"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useRef } from "react";
import ChevronButtons from "../components/ChevronButtons";
import DropdownMenu from "../components/DropdownMenu";
import CalendarHeader from "../components/CalendarHeader";
import CalendarContainer from "../components/CalendarContainer";
import DateButton from "../components/DateButton";
import CalendarWeek from "../components/CalendarWeek";
import today from "../utils/today";
import constructWeek from "../utils/constructWeek";
import monthArray from "../utils/monthArray";
import ReflectionContainer from "../components/ReflectionContainer";
export default function Calendar() {
  return (
    <div className="h-screen w-full flex flex-col">
      <CalendarContainer>
        <CalendarHeader>
          <ChevronButtons />
          <DropdownMenu />
        </CalendarHeader>
        <CalendarWeek />
      </CalendarContainer>
      <ReflectionContainer />
    </div>
  );
}
