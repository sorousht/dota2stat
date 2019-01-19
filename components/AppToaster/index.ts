import { IToaster, Position, Toaster } from "@blueprintjs/core";

export const AppToaster: IToaster | undefined = (typeof window !== "undefined")
? Toaster.create({
  className: "recipe-toaster",
  position: Position.TOP,
})
: undefined;
