/**
 * Ce fichier contient la définition de l'objet `appRouter` qui est le routeur
 * principal de l'application.
 *
 * @packageDocumentation
 */
import { router } from "./trpc";
import { userRouter } from "./routers/user";

export const appRouter = router({
  user: userRouter,
});

export type AppRouter = typeof appRouter;
