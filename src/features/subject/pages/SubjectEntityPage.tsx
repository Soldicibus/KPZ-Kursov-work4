import { useUpdateSubject } from "@/features/subject/api";
import { Route } from "@/routes/subject/$subjectName";
import { useState, useEffect } from "react";
import type { Subject } from "../types";

export function SubjectEntityPage(): React.ReactElement {
    const subjectData = Route.useLoaderData() as unknown;
    
    const updateMutation = useUpdateSubject();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    
    const [formData, setFormData] = useState<{
        subject_name: string;
        subject_desc: string;
    }>({
        subject_name: "",
        subject_desc: "",
    });
    useEffect(() => {
        if (!subjectData || !isEditing) return
        const subject = (Array.isArray(subjectData) ? subjectData[0] : subjectData) as Subject | undefined;
        if (!subject) return
        setFormData({
            subject_name: subject.subject_name,
            subject_desc: subject.subject_desc || "",
        });
    }, [subjectData, isEditing]);
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = event.target;
        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };
    
    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        const subject = (Array.isArray(subjectData) ? subjectData[0] : subjectData) as Subject | undefined;
        if (!subject) return;
        updateMutation.mutate(
            { name: subject.subject_name, data: { subject_name: formData.subject_name, subject_desc: formData.subject_desc } },
            {
                onSuccess: () => {
                    setIsEditing(false);
                },
            }
        );
    };
    
    return (
        <div>
            <h1>Subject Details</h1>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Subject Name:
                            <input
                                type="text"
                                name="subject_name"
                                value={formData.subject_name}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Description:
                            <textarea
                                name="subject_desc"
                                value={formData.subject_desc}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <button type="submit" disabled={updateMutation.isPending}>
                        {updateMutation.isPending ? "Updating..." : "Update Subject"}
                    </button>
                </form>
            ) : (
                <div>
                    <p><strong>Subject Name:</strong> {((Array.isArray(subjectData) ? subjectData[0] : subjectData) as Subject)?.subject_name}</p>
                    <p><strong>Description:</strong> {((Array.isArray(subjectData) ? subjectData[0] : subjectData) as Subject)?.subject_desc || "N/A"}</p>
                    <button onClick={() => setIsEditing(true)}>Edit Subject</button>
                </div>
            )}
        </div>
    );
}