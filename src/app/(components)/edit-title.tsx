"use client";

import { ChangeEvent, FormEvent, ReactNode, useRef, useState } from "react";
import { RenderIf } from "./render-if";
import {
  CheckIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useKeydown } from "../(hooks)/use-keydown";
import { useClickOutside } from "../(hooks)/use-click-outside";

type Level = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingLevel = `h${Level}`;

interface EditTitleProps {
  title: string;
  as?: HeadingLevel;
  className?: string;
  onEdit(title: string): void;
}

const getHeading = ({
  title,
  as,
  className,
}: Pick<EditTitleProps, "as" | "title" | "className">): ReactNode => {
  switch (as) {
    case "h6":
      return <h1 className={className}>{title}</h1>;
    case "h5":
      return <h5 className={className}>{title}</h5>;
    case "h4":
      return <h4 className={className}>{title}</h4>;
    case "h3":
      return <h3 className={className}>{title}</h3>;
    case "h2":
      return <h2 className={className}>{title}</h2>;
    default:
      return <h1 className={className}>{title}</h1>;
  }
};

export const EditTitle = ({ title, as, className, onEdit }: EditTitleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const formRef = useRef<HTMLFormElement | null>(null);

  useKeydown({
    key: "Escape",
    handler: () => setIsEditing(false),
  });

  useClickOutside({
    ref: formRef,
    handler: () => setIsEditing(false),
  });

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    const title = editTitle.trim();
    if (!title) return;

    onEdit(title);
    setIsEditing(false);
  };

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setEditTitle(evt.target.value);
  };

  return (
    <div className="grow">
      <RenderIf
        condition={isEditing}
        if={
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2"
            ref={formRef}
          >
            <input
              type="text"
              name="title"
              id="title"
              title="Edit title"
              value={editTitle}
              onChange={onChange}
              className="grow border rounded-md p-2"
              required
            />
            <div>
              <button
                type="button"
                title="Cancel"
                className="cursor-pointer"
                onClick={() => setIsEditing(false)}
              >
                <XMarkIcon width={24} />
              </button>
              <button type="submit" title="Edit" className="cursor-pointer">
                <CheckIcon width={24} />
              </button>
            </div>
          </form>
        }
        else={
          <div className="flex justify-between items-center">
            {getHeading({ title, as, className })}
            <button
              title="Edit title"
              type="button"
              className="border rounded-md p-2"
              onClick={() => setIsEditing(true)}
            >
              <PencilSquareIcon width={20} />
            </button>
          </div>
        }
      />
    </div>
  );
};
