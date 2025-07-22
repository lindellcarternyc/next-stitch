import { Section as PrismaSection } from "@/generated/prisma";
import { SectionBox } from "./section-box";

import { deleteSection, updateSection } from "@/lib/actions";
import { DeleteSection } from "./delete-section";

interface SectionProps {
  section: PrismaSection;
}

export const Section = async ({ section }: SectionProps) => {
  const onChange = async (name: "Rows" | "Stitches", value: number) => {
    "use server";

    const key = name === "Rows" ? "rows" : "stitches";
    await updateSection({
      ...section,
      [key]: value,
    });
  };

  const onDeleteSection = async (sectionId: string) => {
    "use server";
    await deleteSection(sectionId);
  };

  return (
    <div className="border">
      <div className="relative p-2 border-b">
        <h3 className="text-lg text-center">{section.name}</h3>
        <DeleteSection sectionId={section.id} deleteSection={onDeleteSection} />
      </div>
      <div className="flex">
        <SectionBox value={section.rows} name="Rows" onChange={onChange} />
        <SectionBox
          value={section.stitches}
          name="Stitches"
          onChange={onChange}
        />
      </div>
    </div>
  );
};
