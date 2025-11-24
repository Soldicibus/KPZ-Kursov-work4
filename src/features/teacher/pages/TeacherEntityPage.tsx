import { useUpdateTeacher } from "@/features/teacher/api";
import { Route } from "@/routes/teachers/$teacherId";
import { useState, useEffect } from "react";
import type { Teacher } from "../types";

export function TeacherEntityPage(): React.ReactElement {
    // Loader data could be an array or single object
    const teacherDataRaw = Route.useLoaderData() as Teacher | Teacher[] | undefined;

    const teacher = Array.isArray(teacherDataRaw)
        ? teacherDataRaw[0]
        : teacherDataRaw;

    const updateMutation = useUpdateTeacher();
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        teacher_name: "",
        teacher_surname: "",
        teacher_email: "",
        teacher_position: "",
    });

    // Initialize form when teacher data is loaded
    useEffect(() => {
        if (!teacher) return;
        setFormData({
            teacher_name: teacher.teacher_name ?? "",
            teacher_surname: teacher.teacher_surname ?? "",
            teacher_email: teacher.teacher_email ?? "",
            teacher_position: teacher.teacher_position ?? "",
        });
    }, [teacher]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!teacher) return;

        updateMutation.mutate(
            { id: teacher.teacher_id, data: { ...formData } },
            { onSuccess: () => setIsEditing(false) }
        );
    };

    if (!teacher) {
        return <p>Loading teacher data...</p>;
    }

    return (
        <div>
            <h1>Teacher Details</h1>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="teacher_name"
                            value={formData.teacher_name}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Surname:
                        <input
                            type="text"
                            name="teacher_surname"
                            value={formData.teacher_surname}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="text"
                            name="teacher_email"
                            value={formData.teacher_email}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Position:
                        <input
                            type="text"
                            name="teacher_position"
                            value={formData.teacher_position}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit" disabled={updateMutation.isPending}>
                        {updateMutation.isPending ? "Saving..." : "Save"}
                    </button>
                    <button type="button" onClick={() => setIsEditing(false)}>
                        Cancel
                    </button>
                </form>
            ) : (
                <div>
                    <p><strong>Name:</strong> {teacher.teacher_name}</p>
                    <p><strong>Surname:</strong> {teacher.teacher_surname}</p>
                    <p><strong>Email:</strong> {teacher.teacher_email}</p>
                    <p><strong>Position:</strong> {teacher.teacher_position}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </div>
            )}
        </div>
    );
}
