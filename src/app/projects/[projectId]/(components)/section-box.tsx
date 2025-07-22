"use client";

import { ChangeEvent, MouseEvent } from "react";
import styles from "./section-box.module.css";

interface SectionBoxProps {
  name: "Rows" | "Stitches";
  value: number;
  onChange: (name: "Rows" | "Stitches", value: number) => void;
}

export const SectionBox = ({ name, value, onChange }: SectionBoxProps) => {
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(evt.target.value);
    if (isNaN(value)) return;
    onChange(name, value);
  };

  const onClick = (evt: MouseEvent<HTMLButtonElement>) => {
    const delta = parseInt(evt.currentTarget.dataset.delta || "");
    if (!delta || isNaN(delta)) return;

    onChange(name, Math.max(0, value + delta));
  };

  return (
    <div className="border grow text-center">
      <h4>{name}</h4>
      <div className="flex p-2">
        <button
          type="button"
          className="text-lg grow cursor-pointer"
          data-delta="-1"
          onClick={onClick}
        >
          -
        </button>
        <input
          type="number"
          name={name}
          id={name}
          title={name}
          value={value}
          onChange={handleChange}
          min={0}
          className={`text-xl text-center max-w-20 ${styles.input}`}
        />
        <button
          type="button"
          className="text-lg grow cursor-pointer"
          data-delta="1"
          onClick={onClick}
        >
          +
        </button>
      </div>
    </div>
  );
};
