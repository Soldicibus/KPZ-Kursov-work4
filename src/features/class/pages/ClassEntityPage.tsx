import { Route } from "@/routes/class/$className";
import { useUpdateClass } from "../api";
import { useState } from "react";

export function ClassEntityPage(): React.ReactElement {
    const classEntity = Route.useLoaderData();

    const updateMutation = useUpdateClass();
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        teacher: "",
    });
    if (classEntity && isEditing && formData.name === "") {
        setFormData({
            name: classEntity.class_name ?? "",
            teacher: classEntity.teacher ? `${classEntity.teacher.teacher_surname} ${classEntity.teacher.teacher_name}` : "",
        });
    }
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };
    
    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        updateMutation.mutate(
            { name: classEntity.class_name, data: { class_name: formData.name } },
            {
                onSuccess: () => {
                    setIsEditing(false);
                },
            }
        );
    };
    
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white/80 dark:bg-slate-800 rounded-lg shadow text-slate-900 dark:text-white">
            <h1 className="text-2xl font-semibold mb-4">Class Details</h1>
            {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2">
                            <div className="text-sm font-medium">Class Name</div>
                            <input
                                className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </label>
                        <label className="block mb-2">
                            <div className="text-sm font-medium">Teacher</div>
                            <input
                                className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                type="text"
                                name="teacher"
                                value={formData.teacher}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit" disabled={updateMutation.isPending}>
                            {updateMutation.isPending ? "Updating..." : "Update Class"}
                        </button>
                        <button className="bg-gray-200 px-4 py-2 rounded" type="button" onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className="space-y-2">
                    <p><strong>Class Name:</strong> {classEntity.class_name}</p>
                    <p><strong>Head Teacher:</strong> {classEntity.teacher ? `${classEntity.teacher.teacher_surname} ${classEntity.teacher.teacher_name}` : 'No head teacher assigned'}</p>
                    <button className="mt-3 bg-blue-600 text-white px-3 py-1 rounded" onClick={() => setIsEditing(true)}>Edit Class</button>
                </div>
            )}
        </div>
    );
}