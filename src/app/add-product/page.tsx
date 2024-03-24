import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
export const metadata = {
  title: "Add Product- Next-hive",
};

async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("All fields are required");
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect("/");
}

export default function AddProductPage() {
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add products</h1>
      <form>
        <input
          className="input-bordered mb-3 w-full "
          required
          name="name"
          placeholder="Name"
        />
        <textarea
          className="textarea-bordered textarea mb-3 w-full"
          required
          name="description"
          placeholder="Description"
        />
        <input
          className="input-bordered mb-3 w-full "
          required
          name="imagerurl"
          type="url"
          placeholder="Image URL"
        />
        <input
          className="input-bordered mb-3 w-full "
          required
          name="price"
          placeholder="Price"
          type="number"
        />
        <button className="btn-primary btn-block btn" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}
