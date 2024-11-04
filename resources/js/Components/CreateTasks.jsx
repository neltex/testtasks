import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { Plus } from "lucide-react";

export default function CreateTasks() {
    const [task, setTask] = useState({
        title: "",
        description: "",
        due_date: "",
    });

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(
            "/tasks",
            { ...task, status: "pending" },
            {
                onError: (errors) => setErrors(errors),
                onSuccess: () => {
                    setTask({
                        title: "",
                        description: "",
                        due_date: "",
                    });
                    setIsFormVisible(false);
                    setIsSuccess(true);
                },
            }
        );
    };

    return (
        <div className="mt-3">
            {!isFormVisible ? (
                <button
                    className="rounded-xl flex flex-row  justify-between items-center p-2 border w-3/5 text-left pl-5 bg-white"
                    onClick={() => setIsFormVisible(true)}
                >
                    <h1>New Task</h1>
                    <Plus size={16} />
                </button>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-2"
                >
                    <input
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="p-2 border rounded"
                        required
                    />

                    <textarea
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="p-2 border rounded"
                        required
                    />

                    <input
                        type="date"
                        name="due_date"
                        value={task.due_date}
                        onChange={handleChange}
                        className="p-2 border rounded"
                        required
                    />

                    <div className="flex space-x-2">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsFormVisible(false)}
                            className="bg-gray-500 text-white p-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
