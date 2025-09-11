/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Video {
  title: string;
  url: string;
  duration?: number;
  isPreview?: boolean;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  videos: Video[];
}

interface FormVideo {
  title: string;
  url: string;
  duration: string;
  isPreview: boolean;
}

export default function CourseManager() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    courseId: "",
    title: "",
    description: "",
    price: 0,
    imageUrl: "",
    videos: [{ title: "", url: "", duration: "", isPreview: false }] as FormVideo[],
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/course");
      setCourses(res.data.courses);
    } catch {
      setError("Failed to fetch courses.");
    } finally {
      setLoading(false);
    }
  };

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
      courseId: "",
      title: "",
      description: "",
      price: 0,
      imageUrl: "",
      videos: [{ title: "", url: "", duration: "", isPreview: false }],
    });
  };

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        ...form,
        price: form.price,
        videos: form.videos.map((v) => ({
          ...v,
          duration: Number(v.duration),
        })),
      };

      if (form.courseId) {
        await axios.put("/api/admin/course", payload);
      } else {
        await axios.post("/api/admin/course", payload);
      }

      fetchCourses();
      resetForm();
    } catch {
      setError("Something went wrong while saving course.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (course: Course) => {
    setForm({
      courseId: course._id,
      title: course.title,
      description: course.description,
      price: course.price,
      imageUrl: course.imageUrl,
      videos: course.videos.map((v) => ({
        title: v.title,
        url: v.url,
        duration: v.duration?.toString() ?? "",
        isPreview: v.isPreview ?? false,
      })),
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
      await axios.delete("/api/admin/course", { data: { courseId: id } });
      fetchCourses();
    } catch {
      setError("Failed to delete course.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">
        {form.courseId ? "Edit Course" : "Create New Course"}
      </h1>

      {error && <p className="text-red-600">{error}</p>}

      <form className="space-y-4 border p-4 rounded" onSubmit={handelSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
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
          className="px-4 py-2 border rounded bg-gray-100"
        >
          Add Video
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {submitting
            ? "Saving..."
            : form.courseId
            ? "Update Course"
            : "Create Course"}
        </button>
      </form>

      <h2 className="text-xl font-bold">All Courses</h2>

      {loading ? (
        <p>Loading courses...</p>
      ) : courses.length === 0 ? (
        <p className="text-gray-500">No courses available.</p>
      ) : (
        <ul className="space-y-4">
          {courses.map((course) => (
            <li key={course._id} className="border p-4 rounded shadow-sm">
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p>{course.description}</p>
              <p>₹{course.price}</p>
              {course.imageUrl && (
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full max-w-xs h-32 object-cover my-2"
                />
              )}
              <div className="flex gap-4">
                <button
                  onClick={() => handleEdit(course)}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
