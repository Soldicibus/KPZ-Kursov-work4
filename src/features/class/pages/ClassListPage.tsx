import { Link } from "@tanstack/react-router";
import { useCreateClass, useDeleteClass } from "@/features/class/api";
import { Route } from "@/routes/class/classes";
import { useState } from "react";
import type { Class } from "../types";

export function ClassListPage(): React.ReactElement {
    const classes = Route.useLoaderData() as Array<Class>;
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
        <div>
            <h1>Class List</h1>
            <ul>
                {classes?.map((cls: Class) => (
                    <li key={cls.class_name}>
                        <Link to="/class/$className" params={{ className: String(cls.class_name) }}>
                            {cls.class_name}
                        </Link>
                        <button
                            onClick={() => deleteClassMutation.mutate(cls.class_name)}
                            disabled={deleteClassMutation.isPending}
                        >
                            {deleteClassMutation.isPending ? " Deleting..." : " Delete"}
                        </button>
                    </li>
                ))}
            </ul>
            <div>
                <h2>Create New Class</h2>
                <input
                    type="text"
                    placeholder="Class Name"
                    value={newClass.name}
                    onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                />
                <button
                    onClick={handleCreate}
                    disabled={createClassMutation.isPending}
                >
                    {createClassMutation.isPending ? "Creating..." : "Create Class"}
                </button>
            </div>
        </div>
    );
}