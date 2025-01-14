import React, { useState, useEffect, useRef } from "react";
import { DeleteNotification, DotsThreeOutline, MarkRead } from "@/assets/icons";

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onClearAll: () => void;
  onMarkAllRead: () => void;
}

const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onClearAll,
  onMarkAllRead,
}) => {
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    []
  );
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleSelectNotification = (id: string) => {
    setSelectedNotifications((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((notificationId) => notificationId !== id)
        : [...prevSelected, id]
    );
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={modalRef}
      className={`absolute top-16 right-[8%] bg-white rounded-lg w-[407px] h-[496px] shadow-lg z-50 ${isOpen ? "block" : "hidden"}`}
      style={{
        width: "407px",
        height: "496px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-[28px] leading-10 font-semibold ">Notifications</h2>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-xl font-semibold cursor-pointer"
          >
            <DotsThreeOutline />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 w-[123px] h-[62px] mt-2 px-2 bg-white border rounded shadow-lg">
              <button
                onClick={onClearAll}
                className="flex justify-start items-center w-full py-1 text-[12px] text-[#6433C4]"
              >
                <DeleteNotification className="mr-1" />
                Clear all
              </button>
              <button
                onClick={onMarkAllRead}
                className="flex justify-start items-center w-full py-1 text-[12px] leading-[19px] text-[#0F1D40]"
              >
                <MarkRead className="mr-1" />
                Mark all read
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        className="py-2 overflow-y-auto "
        style={{ height: "calc(100% - 128px)" }}
      >
        {notifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => handleSelectNotification(notification.id)}
            className={`mb-4 py-4 border-b flex justify-between items-center cursor-pointer ${notification.read ? "bg-gray-100" : ""} ${selectedNotifications.includes(notification.id) ? "bg-[#ECE8FF]" : ""}`}
            style={{
              color: "#0F1D40",
              fontFamily: "General Sans",
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "25.6px",
            }}
          >
            <div>
              <div className="my-1 text-[#0F1D40] font-semibold text-[16px] leading-[25.6px]">
                {notification.title}
              </div>
              <div className="my-1 text-[#0F1D40] font-medium text-[16px] leading-[25.6px]">
                {notification.message}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsModal;
