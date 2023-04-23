/* eslint-disable react/prop-types */
import { Listbox, Transition } from "@headlessui/react"
import {ChevronUpDownIcon} from "@heroicons/react/24/solid"

export default function Select({budgets,selectedBudget,setSelectedBudget}) {

  return (
    <div>
      <Listbox
        value={selectedBudget}
        onChange={setSelectedBudget}
        as={"div"}
        className="h-fit relative   block "
      >
        <Listbox.Button className="bg-bgColor  ease-linear duration-200 text-[14px] border-[2px] overflow-hidden border-gray-400 ui-open:rounded-b-none  rounded-lg p-3 py-[10px]  w-full flex items-center gap-x-1 justify-between">
          <span className="whitespace-nowrap truncate">{selectedBudget}</span>
          <ChevronUpDownIcon className="w-[18px] inline text-gray-600" />
        </Listbox.Button>

        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Listbox.Options className="w-full mt-1 absolute rounded-b-lg overflow-hidden shadow-cardShdow ">
            {budgets.map((budget) => (
              <Listbox.Option
                key={budget}
                value={budget}
                className={`bg-bgColor ui-active:text-white ease-linear duration-100 text-[14px] p-2 cursor-pointer ui-active:bg-mainColor`}
              >
                {budget}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
}
