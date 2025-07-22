import { Section as PrismaSection } from "@/generated/prisma";
import { SectionBox } from "./section-box";

import { deleteSection, updateSection } from "@/lib/actions";
import { DeleteSection } from "./delete-section";
import { EditTitle } from "@/app/(components)/edit-title";

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

  const onEditSectionName = async (name: string) => {
    "use server";
    await updateSection({
      ...section,
      name,
    });
  };

  return (
    <div className="border">
      <div className="flex p-2 border-b space-x-4 cursor-pointer">
        <EditTitle title={section.name} onEdit={onEditSectionName} />
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
