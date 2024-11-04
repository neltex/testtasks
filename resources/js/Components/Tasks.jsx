import React, { useState, useEffect } from "react";
import CreateTasks from "./CreateTasks";
import { usePage } from "@inertiajs/react";
import TasksCard from "./TasksCard";

const Tasks = () => {
    // Sometimes (most of the time) message is null, so we handle client side errors.
    const { task, message } = usePage().props;
    const [taskCounts, setTaskCounts] = useState({
        pending: 0,
        in_progress: 0,
        completed: 0,
    });

    useEffect(() => {
        if (task) {
            const counts = {
                pending: 0,
                in_progress: 0,
                completed: 0,
            };

            task.forEach((taskItem) => {
                if (counts.hasOwnProperty(taskItem.status)) {
                    counts[taskItem.status]++;
                }
            });

            setTaskCounts(counts);
        }
    }, [task]);

    return (
        <div className="grid md:grid-cols-3 grid-cols-1 md:space-x-10 space-x-0 md:space-y-0 space-y-10 bg-transparent md:px-0 px-5">
            <div className="bg-gray-200 rounded-xl min-h-[40em] p-5 flex flex-col">
                <div className="flex justify-between items-center mb-4 flex-row rounded-full p-2 border w-1/2 text-left px-5 bg-white">
                    <h1>Pending</h1>
                    <h1 className="text-black">{taskCounts.pending}</h1>
                </div>
                <CreateTasks />
                <div className="mt-4">
                    {task &&
                        task.map(
                            (tasks) =>
                                tasks.status === "pending" && (
                                    <TasksCard key={tasks.id} task={tasks} />
                                )
                        )}
                </div>
            </div>

            <div className="bg-blue-100 rounded-xl min-h-[40em] p-5">
                <div className="flex justify-between items-center mb-4 flex-row rounded-full p-2 border w-1/2 text-left px-5 bg-white">
                    <h1>In Progress</h1>
                    <h1 className="text-black">{taskCounts.in_progress}</h1>
                </div>
                <div className="mt-4">
                    {task &&
                        task.map(
                            (tasks) =>
                                tasks.status === "in_progress" && (
                                    <TasksCard key={tasks.id} task={tasks} />
                                )
                        )}
                </div>
            </div>

            <div className="bg-green-300 rounded-xl min-h-[40em] p-5">
                <div className="flex justify-between items-center mb-4 flex-row rounded-full p-2 border w-1/2 text-left px-5 bg-white">
                    <h1>Completed</h1>
                    <h1 className="text-black">{taskCounts.completed}</h1>
                </div>
                <div className="mt-4">
                    {task &&
                        task.map(
                            (tasks) =>
                                tasks.status === "completed" && (
                                    <TasksCard key={tasks.id} task={tasks} />
                                )
                        )}
                </div>
            </div>
        </div>
    );
};

export default Tasks;
