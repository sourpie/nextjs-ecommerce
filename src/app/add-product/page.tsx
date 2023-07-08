import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import {redirect} from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: 'Flowmazon',
}

async function addProduct(formData: FormData){
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString()
  const imageUrl = formData.get("imageUrl")?.toString()
  const price = Number(formData.get("price") || 0)

  if(!name || !description || !imageUrl || !price){
    throw Error("Missing required Feilds")
  }

  for(let i=0;i<50;i++){
    await prisma.product.create({
      data: {name,description,imageUrl,price}
    })
  }
  
  

  redirect("/")
}

export default async function AddProductPage(){
  const session = await getServerSession(authOptions)

  if(!session){
    redirect("/api/auth/signin?callbackUrl=/add-product")
  }

  return(
    <div>
      <h1 className="text-lg mb-3 font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Name"
          className="input input-bordered mb-3 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="description"
          className="textarea-bordered textarea mb-3 w-full"
        />
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          className="input input-bordered mb-3 w-full"
        />
        <input
          required
          name="price"
          placeholder="Price"
          className="input input-bordered mb-3 w-full"
        />
        <FormSubmitButton className="btn-block">
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  )
}