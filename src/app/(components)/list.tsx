import { ReactNode } from "react";

interface ListProps<T extends { id: string }> {
  data: T[];
  children: (item: T) => ReactNode;
  onSelect?: (item: T) => void;
}

export function List<T extends { id: string }>({
  data,
  children,
  onSelect,
}: ListProps<T>) {
  return (
    <ul className="border">
      {data.map((item, idx) => {
        return (
          <li
            key={item.id}
            className={`hover:bg-slate-200 p-2 cursor-pointer ${
              data[idx + 1] ? "border-b" : ""
            }`}
            onClick={() => onSelect && onSelect(item)}
          >
            {children(item)}
          </li>
        );
      })}
    </ul>
  );
}
