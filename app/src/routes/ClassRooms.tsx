import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

const ClassRooms = () => {
  const events = [
    {
      title: "Physics 2AM",
      start: "2025-11-20T08:00:00",
      end: "2025-11-20T09:30:00",
      display: "block",
      textColor: "white",
      url: "/classrooms/1",
      backgroundColor: "blue",
      allDay: false,
    },
    {
      title: "Math 2AM",
      start: "2025-12-21T10:00:00",
      end: "2025-12-21T11:30:00",
      display: "block",
      textColor: "white",
      url: "/classrooms/2",
      backgroundColor: "green",
      allDay: false,
    },
  ];
  return (
    <div className="w-full overflow-x-auto max-w-7xl mx-auto p-4 h-screen">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="100%"
      />
    </div>
  );
};

export default ClassRooms;
