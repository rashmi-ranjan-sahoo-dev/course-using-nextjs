/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface FormVideo {
  title: string;
  url: string;
  duration: string; // keep as string for input
  isPreview: boolean;
}

export default function CourseManager() {

  const router = useRouter();
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    imageUrl: "",
    videos: [{ title: "", url: "", duration: "", isPreview: false }] as FormVideo[],
  });

  const handleVideoChange = (index: number, field: keyof FormVideo, value: any) => {
    const updatedVideos = [...form.videos];
    updatedVideos[index] = { ...updatedVideos[index], [field]: value };
    setForm({ ...form, videos: updatedVideos });
  };

  const addVideo = () => {
    setForm({
      ...form,
      videos: [...form.videos, { title: "", url: "", duration: "", isPreview: false }],
    });
  };

  const removeVideo = (index: number) => {
    const updatedVideos = form.videos.filter((_, i) => i !== index);
    setForm({ ...form, videos: updatedVideos });
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      price: 0,
      imageUrl: "",
      videos: [{ title: "", url: "", duration: "", isPreview: false }],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        ...form,
        videos: form.videos.map((v) => ({
          ...v,
          duration: Number(v.duration), // convert string -> number
        })),
      };

      await axios.post("/api/admin/course", payload);

      resetForm();
      alert("Course saved successfully!");
      router.push("/Courses");
    } catch (err: any) {
      console.log(err.response?.data?.message);
      setError(err.response?.data?.error || "Something went wrong while saving course.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Create New Course</h1>

      {error && <p className="text-red-600">{error}</p>}

      <form className="space-y-4 border p-4 rounded" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 border rounded"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-2 border rounded"
        ></textarea>

        <input
          type="number"
          placeholder="Price"
          value={form.price.toString()}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          className="w-full p-2 border rounded"
        />

        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="Preview"
            className="w-32 h-20 object-cover rounded"
          />
        )}

        <h2 className="font-semibold text-lg">Videos</h2>

        {form.videos.map((video, index) => (
          <div key={index} className="space-y-1 border p-2 rounded">
            <input
              type="text"
              placeholder="Video Title"
              value={video.title}
              onChange={(e) => handleVideoChange(index, "title", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Video URL"
              value={video.url}
              onChange={(e) => handleVideoChange(index, "url", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Duration (seconds)"
              value={video.duration}
              onChange={(e) => handleVideoChange(index, "duration", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={video.isPreview}
                onChange={(e) => handleVideoChange(index, "isPreview", e.target.checked)}
              />
              Is Preview
            </label>
            <button
              type="button"
              onClick={() => removeVideo(index)}
              className="text-red-600 text-sm"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addVideo}
          className="text-black px-4 py-2 border rounded bg-gray-100"
        >
          Add Video
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
        >
          {submitting ? "Saving..." : "Create Course"}
        </button>
      </form>
    </div>
  );
}
