import React from 'react'
import Progress from "../Progress";
import AvatarGroup from "../AvatarGroup";
import { LuPaperclip } from "react-icons/lu";
import moment from "moment";

const TaskCard = (title, description,
        priority,status,progress,createdAt,dueDate,assignedToattachments,
        completedTodoCount,
        todoChecklist,onClick) => {

            const getStatusTagColor = () => {
  switch (status) {
    case "In Progress":
      return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";

    case "Completed":
      return "text-lime-500 bg-lime-50 border border-lime-500/20";

    default:
      return "text-violet-500 bg-violet-50 border border-violet-500/10";
  }
};

const getPriorityTagColor = () => {
  switch (priority) {
    case "Low":
        return "text-emerald-500 bg-emerald-50 border border-emerald-500/10";

case "Medium":
  return "text-amber-500 bg-amber-50 border border-amber-500/10";

default:
  return "text-rose-500 bg-rose-50 border border-rose-500/10";
  }
};
  return (
    <div className=''>
        className={onClick=onClick}

<div className={`text-[11px] font-medium ${getStatusTagColor()} px-4 py-0.5 rounded-full`}>
  {status}
</div>

<div className={`text-[11px] font-medium ${getPriorityTagColor()} px-4 py-0.5 rounded-full`}>
  {priority} Priority
</div>

<div
  className={`px-4 border-l-[3px] ${
    status === "In Progress"
      ? "border-cyan-500"
      : status === "Completed"
      ? "border-indigo-500"
      : ""
  }`}
></div>
      
    </div>
  )
}

export default TaskCard
