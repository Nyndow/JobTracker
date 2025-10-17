import React, { useState, useEffect, useRef } from "react";
import {
  EllipsisHorizontalIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";

export default function Menu({ items = [], orientation = "horizontal" }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const Icon =
    orientation === "vertical" ? EllipsisVerticalIcon : EllipsisHorizontalIcon;

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Ellipsis button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded hover:bg-gray-100"
      >
        <Icon className="h-5 w-5 text-gray-600" />
      </button>

      {/* Dropdown menu */}
      {open && (
        <ul className="absolute right-0 mt-2 bg-white shadow-md rounded-md p-2 w-36 z-10">
          {items.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  item.onClick?.();
                  setOpen(false); // close after click
                }}
                className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
