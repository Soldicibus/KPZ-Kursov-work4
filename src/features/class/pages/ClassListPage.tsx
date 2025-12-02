import { Link } from "@tanstack/react-router";
import { useCreateClass, useDeleteClass } from "@/features/class/api";
import { Route } from "@/routes/class/classes";
import { useState } from "react";
import type { Class } from "../types";

export function ClassListPage(): React.ReactElement {
    const classesData = Route.useLoaderData() as unknown;
    // Defensive: loader may return a single object or something unexpected.
    const classes: Array<Class> = Array.isArray(classesData)
        ? (classesData as Array<Class>)
        : classesData && typeof classesData === 'object' && 'class_name' in (classesData as any)
        ? [classesData as Class]
        : [];

    // DEBUG: show raw loader data if we ended up with empty classes
    // eslint-disable-next-line no-console
    console.log('ClassList loader raw data:', classesData);
    const deleteClassMutation = useDeleteClass();
    const createClassMutation = useCreateClass();
    
    const [newClass, setNewClass] = useState({
        name: "",
    });
    const handleCreate = (): void => {
        createClassMutation.mutate({ class_name: newClass.name }, {
            onSuccess: () => {
                setNewClass({
                    name: "",
                });
            }
        });
    };
    
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white/80 dark:bg-slate-800 rounded-lg shadow text-slate-900 dark:text-white">
            <h1 className="text-2xl font-semibold mb-4">Class List</h1>
            <ul className="space-y-3">
                {classes?.map((cls: Class) => (
                    <li key={cls.class_name} className="flex items-center justify-between gap-3 p-3 bg-white dark:bg-slate-700/40 rounded">
                        <Link className="text-blue-600 hover:underline" to="/class/$className" params={{ className: String(cls.class_name) }}>
                            {cls.class_name}
                        </Link>
                        <button
                            className="bg-red-600 text-white px-3 py-1 rounded"
                            onClick={() => deleteClassMutation.mutate(cls.class_name)}
                            disabled={deleteClassMutation.isPending}
                        >
                            {deleteClassMutation.isPending ? " Deleting..." : " Delete"}
                        </button>
                    </li>
                ))}
            </ul>
            <div className="mt-6">
                <h2 className="text-lg font-medium mb-2">Create New Class</h2>
                <div className="flex gap-2">
                    <input
                        className="border rounded px-3 py-2 flex-1"
                        type="text"
                        placeholder="Class Name"
                        value={newClass.name}
                        onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                    />
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded"
                        onClick={handleCreate}
                        disabled={createClassMutation.isPending}
                    >
                        {createClassMutation.isPending ? "Creating..." : "Create Class"}
                    </button>
                </div>
            </div>
        </div>
    );
}