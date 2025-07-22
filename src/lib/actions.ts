"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { Section } from "@/generated/prisma";

export const createProject = async (userId: string, projectName: string) => {
  try {
    await prisma.project.create({
      data: {
        userId,
        name: projectName,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const editProjectName = async (projectId: string, name: string) => {
  try {
    await prisma.project.update({
      where: { id: projectId },
      data: { name },
    });
    revalidatePath(`/projects/${projectId}`);
  } catch (err) {
    console.log(err);
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    await prisma.project.delete({
      where: { id: projectId },
    });
  } catch (err) {
    console.log(err);
  }
};

export const createSection = async (projectId: string, name: string) => {
  try {
    await prisma.section.create({
      data: { projectId, name },
    });
    revalidatePath(`/projects/${projectId}`);
  } catch (err) {
    console.log(err);
  }
};

export const updateSection = async (section: Section) => {
  try {
    await prisma.section.update({
      where: {
        id: section.id,
      },
      data: section,
    });
    revalidatePath(`/projects/${section.projectId}`);
  } catch (err) {
    console.log(err);
  }
};

export const deleteSection = async (id: string) => {
  try {
    await prisma.section.delete({ where: { id } });
    revalidatePath(`/projects/${id}`);
  } catch (err) {
    console.log(err);
  }
};
