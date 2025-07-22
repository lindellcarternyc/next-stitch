import { getProjectById } from "@/lib/queries";
import { NewSection } from "./(components)/new-section";
import { createSection, editProjectName } from "@/lib/actions";
import { Section } from "./(components)/section";
import { EditTitle } from "@/app/(components)/edit-title";

interface ProjectPageProps {
  params: Promise<{
    projectId: string;
  }>;
}
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const project = await getProjectById(projectId);

  if (!project) return <p>Project Not Found!</p>;

  const onSubmit = async (name: string) => {
    "use server";
    await createSection(projectId, name);
  };

  const onEditProjectName = async (name: string) => {
    "use server";
    await editProjectName(projectId, name);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-4 items-center">
        <EditTitle
          title={project.name}
          className="text-2xl font-bold"
          onEdit={onEditProjectName}
        />
        <NewSection onSubmit={onSubmit} />
      </div>
      <ul className="space-y-4">
        {project.sections.map((section) => {
          return (
            <li key={section.id}>
              <Section section={section} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
