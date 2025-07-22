import { getProjectById } from "@/lib/queries";
import { NewSection } from "./(components)/new-section";
import { createSection } from "@/lib/actions";
import { Section } from "./(components)/section";

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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">{project.name}</h1>
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
