import Tasks from "@/Components/Tasks";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ tasks }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Task Manager
                </h2>
            }
        >
            <Head title="Task Manager" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Tasks />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
