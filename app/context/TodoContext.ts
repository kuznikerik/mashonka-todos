import { createContext } from "react";
import { ITodoContext } from "../types";

export const TodoContext = createContext<ITodoContext | undefined>(undefined)
