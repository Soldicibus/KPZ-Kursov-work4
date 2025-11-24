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
        <div>
            <h1>Class Details</h1>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Class Name:
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Teacher:
                            <input
                                type="text"
                                name="teacher"
                                value={formData.teacher}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <button type="submit" disabled={updateMutation.isPending}>
                        {updateMutation.isPending ? "Updating..." : "Update Class"}s
                    </button>
                    <button type="button" onClick={() => setIsEditing(false)}>
                        Cancel
                    </button>
                </form>
            ) : (
                <div>
                    <p><strong>Class Name:</strong> {classEntity.class_name}</p>
                    <p><strong>Head Teacher:</strong> {classEntity.teacher ? `${classEntity.teacher.teacher_surname} ${classEntity.teacher.teacher_name}` : 'No head teacher assigned'}</p>
                    <button onClick={() => setIsEditing(true)}>Edit Class</button>
                </div>
            )}
        </div>
    );
}