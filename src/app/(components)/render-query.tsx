import { ReactNode } from "react";

export type QueryState<T> =
  | { type: "loading" }
  | { type: "error"; error: string }
  | { type: "success"; data: T };

interface RenderQueryProps<T> {
  state: QueryState<T>;
  loading?: ReactNode;
  error?: (error: string) => ReactNode;
  children: (data: T) => ReactNode;
}

export function RenderQuery<T>({
  state,
  loading,
  error,
  children,
}: RenderQueryProps<T>) {
  switch (state.type) {
    case "loading":
      return loading ?? <p>Loading...</p>;
    case "error":
      return error ? error(state.error) : <p>Something went wrong.</p>;
    case "success":
      return children(state.data);
  }
}
