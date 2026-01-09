import Link from "next/link";

const page = () => {
  return (
    <div>
      <h1>items page</h1>
      <Link href="/dashboard/items/add-items">Add Item</Link>
    </div>
  );
};

export default page;
