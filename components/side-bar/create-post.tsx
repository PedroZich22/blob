"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { PencilLine } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { CreateBlobForm } from "./create-post-form";

export function CreatePost() {
  const { open, isMobile } = useSidebar();

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button type="button" variant="gooeyRight" className="w-full">
            Postar
            <PencilLine className="size-4 ml-2" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="p-4">
          <DrawerHeader>
            <DrawerTitle>Crie um post</DrawerTitle>
            <DrawerDescription>
              Escreva o que está pensando para o mundo.
            </DrawerDescription>
          </DrawerHeader>
          <CreateBlobForm />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="gooeyRight" className="w-full">
          {open && "Postar"}
          <PencilLine className="size-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crie um post</DialogTitle>
          <DialogDescription>
            Escreva o que está pensando para o mundo.
          </DialogDescription>
        </DialogHeader>
        <CreateBlobForm />
      </DialogContent>
    </Dialog>
  );
}
