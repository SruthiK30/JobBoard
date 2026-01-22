export const fetchJobs = async (page: number, limit: number) => {
  const res = await fetch(
    `http://localhost:4000/jobs?page=${page}&limit=${limit}`,
    { credentials: "include" }
  );

  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
};

export const deleteJob = async (id: string) => {
  const res = await fetch(`http://localhost:4000/jobs/${id}`, {
    method: "DELETE",
    credentials: "include"
  });

  if (!res.ok) throw new Error("Delete failed");
};
