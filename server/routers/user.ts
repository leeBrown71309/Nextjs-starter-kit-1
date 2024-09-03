/**
 * Ce fichier contient la définition du routeur des utilisateurs
 *
 * @packageDocumentation
 */
import { z } from "zod";
import { procedure, router } from "../trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userRouter = router({
  getUsers: procedure.query(async () => {
    const response = await prisma.user.findMany();
    return response;
  }),

  addUser: procedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
        },
      });
    }),
});
