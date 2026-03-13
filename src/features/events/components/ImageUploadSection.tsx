"use client";

import React, { useState } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { EventFormValues } from "../schemas/event-schema";
import { Upload, X } from "lucide-react";

interface Props {
    register: UseFormRegister<EventFormValues>;
    errors: FieldErrors<EventFormValues>;
    setValue: UseFormSetValue<EventFormValues>;
}

export default function ImageUploadSection({ register, errors, setValue }: Props) {
    const [preview, setPreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("image", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setPreview(null);
        setValue("image", null);
    };

    return (
        <section className="space-y-6 bg-[#0f172a]/50 p-6 rounded-xl border border-slate-800">
            <h3 className="text-xl font-semibold text-white mb-4">Event Image</h3>

            <div className="relative group">
                {!preview ? (
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-700 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-500/5 transition-all">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-10 h-10 text-gray-400 mb-3 group-hover:text-blue-500" />
                            <p className="mb-2 text-sm text-gray-400">
                                <span className="font-semibold text-blue-500">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 800x400px)</p>
                        </div>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </label>
                ) : (
                    <div className="relative h-64 w-full rounded-xl overflow-hidden border border-slate-700">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute top-4 right-4 p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all shadow-lg"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
            {errors.image && <p className="text-xs text-red-500 mt-1">{errors.image.message as string}</p>}
        </section>
    );
}
