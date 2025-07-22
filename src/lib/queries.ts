"use server";

import prisma from "./prisma";

export const getProjects = async (userId: string) => {
  return await prisma.project.findMany({
    where: { userId },
  });
};

export const getProjectById = async (projectId: string) => {
  return await prisma.project.findFirst({
    where: { id: projectId },
    include: { sections: true },
  });
};
