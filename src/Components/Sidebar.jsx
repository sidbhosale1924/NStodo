import React from "react";
import { FaInbox, FaRegCalendarAlt, FaRegCalendar } from "react-icons/fa";

const Sidebar = ({ selectedTab, setSelectedTab }) => {
  console.log(selectedTab);
  return (
    <div className="side-bar">
      <div
        className="active"
        onClick={() => {
          setSelectedTab("INBOX");
        }}
      >
        <FaInbox className="icon" />
        Inbox
      </div>
      <div
        onClick={() => {
          setSelectedTab("TODAY");
        }}
      >
        <FaRegCalendarAlt className="icon" />
        Today
      </div>
      <div
        onClick={() => {
          setSelectedTab("NEXT_7");
        }}
      >
        <FaRegCalendar className="icon" />
        Next 7 Days
      </div>
    </div>
  );
};

export default Sidebar;
