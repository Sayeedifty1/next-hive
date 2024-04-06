import FormSubmitButton from "@/components/FormSubmitButton";
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
      <form action={addProduct}>
        <input
          className="rounded-xs input-bordered mb-3 w-full rounded-md p-1"
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
          className="input-bordered mb-3 w-full rounded-md p-1"
          required
          name="imageUrl"
          type="url"
          placeholder="Image URL"
        />
        <input
          className="input-bordered mb-3 w-full rounded-md p-1"
          required
          name="price"
          placeholder="Price"
          type="number"
        />
        <FormSubmitButton className="btn-block" type="submit">
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
}
