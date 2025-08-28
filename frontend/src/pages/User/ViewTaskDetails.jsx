
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '/src/utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import AvatarGroup from '../../components/AvatarGroup';
import moment from 'moment';
import { LuSquareArrowOutUpRight } from 'react-icons/lu';

const ViewTaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  const getStatusTagColor = (status) => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
      case "Completed":
        return "text-lime-500 bg-lime-50 border border-lime-500/20";
      default:
        return "text-violet-500 bg-violet-50 border border-violet-500/10";
    }
  };

  // Fetch task by ID
  const getTaskDetailsByID = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(id));

      // See full API response
      console.log('Full API response:', response.data);

      const taskInfo = response.data;

      // Set task state with proper keys
      const formattedTask = {
        ...taskInfo,
        todoChecklist: taskInfo.todoChecklist || [],
        attachments: taskInfo.attachments || [],
      };

      setTask(formattedTask);

      console.log('Task state:', formattedTask);
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  useEffect(() => {
    if (id) {
      getTaskDetailsByID();
    }
  }, [id]);

  // Open attachment link
  const handleLinkClick = (link) => {
    window.open(link, "_blank");
  };

  return (
    <DashboardLayout activeMenu='My Tasks'>
      <div className='mt-5'>
        {!task && <p>Loading task details...</p>}
        {task && (
          <div className='grid grid-cols-1 md:grid-cols-4 mt-4'>
            <div className='form-card col-span-3'>
              <div className='flex items-center justify-between'>
                <h2 className='text-sm md:text-xl font-medium'>
                  {task?.title}
                </h2>
                <div
                  className={`text-[13px] md:text-[13px] font-medium ${getStatusTagColor(task?.status)} px-4 py-0.5 rounded`}
                >
                  {task?.status || 'N/A'}
                </div>
              </div>

              <div className='mt-4'>
                <InfoBox label='Description' value={task?.description} />

                {/* TODO Checklist */}
                {task?.todoChecklist?.length > 0 && (
                  <div className="mt-4">
                    <label className="text-xs font-medium text-slate-500">TODO Checklist</label>
                    <ul className="mt-1 List-disc List-inside text-gray-700 text-[13px]">
                      {task.todoChecklist.map((todo, index) => (
                        <li key={index} className={todo.completed ? 'line-through text-gray-400' : ''}>
                          {todo.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Attachments */}
                {task?.attachments?.length > 0 && (
                  <div className="mt-4">
                    <label className="text-xs font-medium text-slate-500">Attachments</label>
                    <ul className="mt-1 list-disc list-inside text-blue-600 text-[13px]">
                      {task.attachments.map((file, index) => (
                        <li
                          key={index}
                          className="hover:underline cursor-pointer"
                          onClick={() => handleLinkClick(file.url || file)}
                        >
                          {file.name ||  file.url || `Attachment ${index + 1}`}
                          <LuSquareArrowOutUpRight className="inline ml-1 text-xs" />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className='grid grid-cols-12 gap-4 mt-4'>
                <div className='col-span-6 md:col-span-4'>
                  <InfoBox label='Priority' value={task?.priority} />
                </div>
                <div className='col-span-6 md:col-span-4'>
                  <InfoBox
                    label='Due Date'
                    value={
                      task?.dueDate
                        ? moment(task?.dueDate).format('Do MMM YYYY')
                        :'N/A'
                    }
                  />
                </div>
                <div className='col-span-6 md:col-span-4'>
                  <label className='text-xs font-medium text-slate-500'>
                    Assigned To
                  </label>
                
                  <AvatarGroup
                    avatars={ Array.isArray(task?.assignedTo) ? task.assignedTo.map(i => i?.profileImageUrl) : [] }
                    maxVisible={5}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewTaskDetails;

const InfoBox = ({label, value})=> {
  return <>
     <label className='text-xs font-medium text-slate-500'>{label}</label>
       <p className='text-[12px] md:text-[13px] font-medium text-gray-700 mt-0.5'>
        {value}
       </p>
  </>
  }
