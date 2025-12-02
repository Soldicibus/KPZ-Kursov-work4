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
        <div className="max-w-3xl mx-auto p-6 bg-white/80 dark:bg-slate-800 rounded-lg shadow text-slate-900 dark:text-white">
            <h1 className="text-2xl font-semibold mb-4">Subject Details</h1>
            {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2">
                            <div className="text-sm font-medium">Subject Name</div>
                            <input
                                className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                type="text"
                                name="subject_name"
                                value={formData.subject_name}
                                onChange={handleChange}
                            />
                        </label>
                        <label className="block mb-2">
                            <div className="text-sm font-medium">Description</div>
                            <textarea
                                className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                name="subject_desc"
                                value={formData.subject_desc}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit" disabled={updateMutation.isPending}>
                            {updateMutation.isPending ? "Updating..." : "Update Subject"}
                        </button>
                        <button className="bg-gray-200 px-4 py-2 rounded" type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </form>
            ) : (
                <div className="space-y-2">
                    <p className="text-lg"><strong>Subject Name:</strong> {((Array.isArray(subjectData) ? subjectData[0] : subjectData) as Subject)?.subject_name}</p>
                    <p><strong>Description:</strong> {((Array.isArray(subjectData) ? subjectData[0] : subjectData) as Subject)?.subject_desc || "N/A"}</p>
                    <button className="mt-3 bg-blue-600 text-white px-3 py-1 rounded" onClick={() => setIsEditing(true)}>Edit Subject</button>
                </div>
            )}
        </div>
    );
}