import React, { useState } from "react";
import { meetings } from "./meetings";

function App() {
  const [sorting, setSorting] = useState("none");

  const sortMeetingsByDay = (array) => {
    const sorter = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };

    return array
      .map((item) => [item.day, item])
      .sort(([a], [b]) => sorter[a] - sorter[b])
      .map(([, item]) => item);
  };

  const sortedDays = sortMeetingsByDay(meetings);

  const sortMeetingsByTime = (array) => {
    return array
      .map((item) => [Date.parse(`2020/04/04 ${item.time}`), item])
      .sort(([a], [b]) => a - b)
      .map(([, item]) => item);
  };

  const sortedTime = sortMeetingsByTime(meetings);

  const tableContent = () => {
    switch (sorting) {
      case "none":
        return meetings;
      case "day":
        return sortedDays;
      case "time":
        return sortedTime;
      default:
        break;
    }
  };

  return (
    <div
      className="App"
      style={{
        fontSize: "0.7rem",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <table cellPadding="5" width="40%">
        <tbody>
          <tr>
            <th>Name</th>
            <th>
              <button
                onClick={() => setSorting(sorting === "day" ? "none" : "day")}
              >
                Day
              </button>
            </th>
            <th>
              <button
                onClick={() => setSorting(sorting === "time" ? "none" : "time")}
              >
                Time
              </button>
            </th>
            <th>Platform</th>
            <th>Dial Number</th>
            <th>Date</th>
          </tr>
          {tableContent().map((meeting) => {
            return (
              <tr key={meeting.name}>
                <td>{meeting.name}</td>
                <td>{meeting.day}</td>
                <td>{meeting.time}</td>
                <td>{meeting.platform}</td>
                <td>{meeting.dial_number}</td>
                <td>{meeting.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
