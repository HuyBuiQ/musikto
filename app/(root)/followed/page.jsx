import Feed from "../../../components/layout/Feed";

export default async function Home() {
  let data = [];
  try {
    const result = await fetch(process.env.URL + "/api/post/followed", {
      method: "POST",
      cache: "no-store",
    });
    data = await result.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <div className="min-h-screen max-w-xl mx-auto">
      <Feed data={data} />
    </div>
  );
}

