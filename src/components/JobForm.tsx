import { useState } from "react";

interface JobFormProps {
  onSuccess?: () => void;
}

export default function JobForm({ onSuccess }: JobFormProps) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    salary: ""
  });

  const submit = async () => {
    try {
      const res = await fetch("http://localhost:4000/jobs", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, salary: Number(form.salary) }),
      });
      if (!res.ok) throw new Error("Failed to create job");
      alert("Job created successfully");
      onSuccess?.();
    } catch {
      alert("Admin access required");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Create Job</h2>

      <input
        className="input"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        className="input"
        placeholder="Company"
        value={form.author}
        onChange={(e) => setForm({ ...form, author: e.target.value })}
      />
      <input
        className="input"
        placeholder="Salary"
        value={form.salary}
        onChange={(e) => setForm({ ...form, salary: e.target.value })}
      />
      <textarea
        className="input"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <button
        onClick={submit}
        className="w-full bg-black text-white py-2 rounded mt-4"
      >
        Create Job
      </button>
    </div>
  );
}