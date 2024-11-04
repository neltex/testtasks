import { useEffect, useState } from "react";

export default function TaskCounter({ task }) {
    const [taskCountPending, setTaskCountPending] = useState(0);
    const [taskCountInProgress, setTaskCountInProgress] = useState(0);
    const [taskCountCompleted, setTaskCountCompleted] = useState(0);
    useEffect(() => {
        if (task) {
            let count = 0;
            {
                task &&
                    task.map((tasks) => {
                        if (
                            tasks.status === "pending" ||
                            tasks.status === "in_progress" ||
                            tasks.status === "completed"
                        ) {
                            count++;
                        }
                    });
            }

            setTaskCount(count);
        } else {
            setTaskCount(0);
        }
    });
    return (
        <div className="">
            <h1 className="text-black">{taskCount}</h1>
        </div>
    );
}
