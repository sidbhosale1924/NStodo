import React, { useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import dateFnsFormat from "date-fns/format";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import addDays from "date-fns/addDays";
import isToday from "date-fns/isToday";
const FORMAT = "dd / MM / yyyy";
const AddTask = ({ onCancel, onAddClick }) => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");

  function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
  }
  return (
    <div className="task-conatiner">
      <input
        type="text"
        value={task}
        onChange={(e) => {
          setTask(e.target.value);
        }}
      />
      <div className="task-actions">
        <div className="action-btn">
          <button
            disabled={!task}
            className="save-btn"
            onClick={() => {
              onAddClick(task, date);
              setTask("");
              onCancel();
            }}
          >
            Add task
          </button>
          <button
            className="cancel-btn"
            onClick={() => {
              onCancel();
              setTask("");
            }}
          >
            Cancel
          </button>
        </div>
        <div className="icon-container">
          <DayPickerInput
            onDayChange={(day) => setDate(day)}
            placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
            formatDate={formatDate}
            format={FORMAT}
            dayPickerProps={{
              modifiers: {
                disabled: [{ before: new Date() }],
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

const Task_header_mapping = {
  INBOX: "Inbox",
  TODAY: "Today",
  NEXT_7: "Next 7 Days",
};

const TaskItems = ({ selectedTab, tasks }) => {
  let tasksToRender = [...tasks];
  if (selectedTab === "NEXT_7") {
    tasksToRender = tasksToRender.filter(
      (task) =>
        isAfter(task.date, new Date()) &&
        isBefore(task.date, addDays(new Date(), 7))
    );
  }

  if (selectedTab === "TODAY") {
    tasksToRender = tasksToRender.filter((task) => isToday(task.date));
  }
  return (
    <div className="list-container">
      {tasksToRender.map((task) => (
        <div className="list-items">
          <li className="list">{task.text}</li>
          <p>{dateFnsFormat(new Date(task.date), FORMAT)}</p>
        </div>
      ))}
    </div>
  );
};

const Task = ({ selectedTab }) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [list, setList] = useState([]);

  const addList = (text, date) => {
    const addDate = { text, date: date || new Date() };
    setList((prevList) => [...prevList, addDate]);
  };

  return (
    <div className="tasks">
      <h1>{Task_header_mapping[selectedTab]}</h1>
      {selectedTab === "INBOX" ? (
        <div
          className="add-btn"
          onClick={() => {
            setShowAddTask(!showAddTask);
          }}
        >
          <span className="plus">+</span>
          <span className="add-text-btn">Add Taks..</span>
        </div>
      ) : null}
      {showAddTask ? (
        <AddTask
          onAddClick={addList}
          onCancel={() => {
            setShowAddTask(false);
          }}
        />
      ) : null}
      <hr className="hrline" />
      {list.length > 0 ? (
        <TaskItems tasks={list} selectedTab={selectedTab} />
      ) : (
        <b>No Task Available</b>
      )}
    </div>
  );
};

export default Task;
