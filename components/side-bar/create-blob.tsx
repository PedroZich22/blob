"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { PencilLine } from "lucide-react";
import { SidebarMenuButton, useSidebar } from "../ui/sidebar";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { CreateBlobForm } from "./create-blob-form";

export function CreateBlob() {
  const { isMobile } = useSidebar();

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <SidebarMenuButton
            size={"lg"}
            className="bg-primary text-primary-foreground hover:bg-primary/50 transition-all"
          >
            <PencilLine />
            <span>Crie um Blob</span>
          </SidebarMenuButton>
        </DrawerTrigger>
        <DrawerContent className="p-4">
          <DrawerHeader>
            <DrawerTitle>Crie um Blob</DrawerTitle>
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
        <SidebarMenuButton
          size={"lg"}
          className="bg-primary text-primary-foreground hover:bg-primary/50 transition-all"
        >
          <PencilLine />
          <span>Cire um Blob</span>
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crie um Blob</DialogTitle>
          <DialogDescription>
            Escreva o que está pensando para o mundo.
          </DialogDescription>
        </DialogHeader>
        <CreateBlobForm />
      </DialogContent>
    </Dialog>
  );
}
