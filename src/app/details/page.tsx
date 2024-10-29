import Link from "next/link";

function DetailPage() {
  return (
    <>
      <h4>Detail Page</h4>
      <button className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700">
        <Link href={"/"}>Back Home</Link>
      </button>
    </>
  );
}

export default DetailPage;
