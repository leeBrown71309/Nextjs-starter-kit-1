"use client";
import { trpc } from "@/server/client";
import { useUserStore } from "@/app/home/store/user-store";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const setUsers = useUserStore((state) => state.setUsers);
  const { data, error, isLoading, refetch }: any =
    trpc.user.getUsers.useQuery();
  const addUser = trpc.user.addUser.useMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await addUser.mutateAsync(formData);
      refetch(); // Rafraîchit la liste des utilisateurs
      setFormData({ name: "", email: "" }); // Réinitialise le formulaire
    } catch (error) {
      console.log("🚀 ~ onError ~ error:", error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data, setUsers]);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="mb-5">
        <h1 className="text-5xl text-black font-black text-center">
          hello!!! It is my starter kit for Nest js
        </h1>
        <div className="text-center text-lg text-indigo-500">
          Starter kit build with : Next js / Prisma / Trpc / Zustand
        </div>
      </div>
      <Image
        src="/assets/starter-kit.png"
        alt="Starter kit background"
        className="rounded-md"
        width={800}
        height={800}
        priority
      />

      {/* {isLoading && <div>Chargement...</div>}

      {!isLoading && data?.length && (
        <div>
          <h1 className="text-3xl text-indigo-600 text-center">hello</h1>
          {data?.map((user: any) => (
            <div className="text-center" key={user.email}>
              {user.name}
            </div>
          ))}
        </div>
      )}
      {!isLoading && !data?.length && (
        <div className="text-center">Aucun utilisateur</div>
      )}

      <form onSubmit={handleSubmit} className="mt-4">
        <label className="block mb-2">
          Nom :
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </label>
        <label className="block mb-2">
          Email :
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </label>
        <br />
        <div className="flex justify-between gap-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Enregistrer
          </button>
         
        </div>
      </form> */}
    </main>
  );
}
