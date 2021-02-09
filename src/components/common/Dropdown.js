import { Menu, Transition } from "@headlessui/react";

export const Dropdown = ({ title, children, menuPos = "left" }) => {
  return (
    <div className="relative inline-block text-left">
      <Menu>
        {({ open }) => (
          <>
            <span className="rounded-md shadow-sm">
              <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-gray-700 border border-gray-300 rounded-md hover:text-gray-100 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
                <span>{title}</span>
              </Menu.Button>
            </span>

            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className={`absolute ${menuPos}-0 w-56 mt-2 origin-top-right bg-gray-700 border border-gray-700 divide-y divide-gray-100 rounded-md shadow-lg outline-none`}
              >
                <div className="py-1">{children}</div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};

export const DropdownItem = ({
  children,
  component: Component = "div",
  ...props
}) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <Component
          className={`${
            active ? "bg-gray-500 text-gray-900" : "text-white"
          } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left transition-colors `}
          {...props}
        >
          {children}
        </Component>
      )}
    </Menu.Item>
  );
};
