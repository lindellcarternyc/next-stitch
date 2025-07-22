"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Project } from "@/generated/prisma";

import { createProject, deleteProject } from "@/lib/actions";
import { getProjects } from "@/lib/queries";
import { NewProject } from "./(components)/new-project";
import { QueryState, RenderQuery } from "../(components)/render-query";
import { List } from "../(components)/list";
import { useRouter } from "next/navigation";

type ProjectListState = QueryState<Project[]>;

export default function ProjectList() {
  const router = useRouter();

  const [state, setState] = useState<ProjectListState>({
    type: "loading",
  });
  const { data } = useSession();

  const fetchProjects = useCallback(async () => {
    if (!data?.user) return;

    setState({ type: "loading" });
    try {
      const projects = await getProjects(data.user.id);
      setState({
        type: "success",
        data: projects,
      });
    } catch (err) {
      setState({
        type: "error",
        error: err instanceof Error ? err.message : "Something went wrong",
      });
    }
  }, [data?.user]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleCreateProject = async (name: string) => {
    if (!data?.user) return;
    createProject(data.user.id, name);
    fetchProjects();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <NewProject onSubmit={handleCreateProject} />
      </div>
      <RenderQuery state={state}>
        {(projects) => {
          return projects.length === 0 ? (
            <p>No Projects</p>
          ) : (
            <List
              data={projects}
              onSelect={(project) => router.push(`/projects/${project.id}`)}
            >
              {(project) => (
                <div className="flex justify-between items-center">
                  <span className="text-lg">{project.name}</span>
                  <button
                    title={`Delete ${project.name}`}
                    type="button"
                    className="bg-red-500 p-2 rounded-md cursor-pointer"
                    onClick={async (evt) => {
                      evt.preventDefault();
                      evt.stopPropagation();

                      await deleteProject(project.id);
                      fetchProjects();
                    }}
                  >
                    <TrashIcon className="text-white w-6" />
                  </button>
                </div>
              )}
            </List>
          );
        }}
      </RenderQuery>
    </div>
  );
}
