import type { Job } from "../types/job.types";
import { useRole } from "../context/RoleContext.tsx";

const JobCard = ({ job, onDelete }: { job: Job; onDelete: () => void }) => {
  const { role } = useRole(); // ✅ role is now "user" | "admin"


  return (
    <div className="border p-5 rounded-xl shadow-sm bg-white
                hover:shadow-lg hover:-translate-y-1
                transition-all duration-300">

      <h2 className="text-lg font-bold">{job.title}</h2>
      <p className="text-sm text-gray-600">{job.author}</p>
      <p className="mt-2">{job.description}</p>

      {role === "admin" && (
  <div className="mt-4 flex gap-4">
    <button
      className="text-blue-600 hover:text-blue-800 font-medium"
    >
      Edit
    </button>
    <button
      onClick={onDelete}
      className="text-red-600 hover:text-red-800 font-medium"
    >
      Delete
    </button>
  </div>
)}
    </div>
    
  );
};

export default JobCard;