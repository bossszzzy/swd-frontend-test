"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export type Person = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age?: number;
};

// --- persistence helpers ---
const LS_KEY = "people_state_v1";
function loadLS(): { items: Person[] } {
  if (typeof window === "undefined") return { items: [] };
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : { items: [] };
  } catch {
    return { items: [] };
  }
}
function saveLS(state: { items: Person[] }) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_KEY, JSON.stringify(state));
}

// --- initial state ---
type FormState = {
  id?: string; // if set -> editing
  firstName: string;
  lastName: string;
  email: string;
  age?: number | undefined;
};

type PeopleState = {
  items: Person[];
  form: FormState;
};

const initial: PeopleState = {
  items: loadLS().items,
  form: { firstName: "", lastName: "", email: "", age: undefined },
};

const peopleSlice = createSlice({
  name: "people",
  initialState: initial,
  reducers: {
    // form reducers (no useState)
    setForm(state, action: PayloadAction<Partial<FormState>>) {
      state.form = { ...state.form, ...action.payload };
    },
    clearForm(state) {
      state.form = {
        firstName: "",
        lastName: "",
        email: "",
        age: undefined,
        id: undefined,
      };
    },
    loadFormFromPerson(state, action: PayloadAction<string>) {
      const p = state.items.find((i) => i.id === action.payload);
      if (p)
        state.form = {
          id: p.id,
          firstName: p.firstName,
          lastName: p.lastName,
          email: p.email,
          age: p.age,
        };
    },

    // data reducers
    createPerson(state) {
      const f = state.form;
      const newItem: Person = {
        id: uuid(),
        firstName: f.firstName.trim(),
        lastName: f.lastName.trim(),
        email: f.email.trim(),
        age: f.age ? Number(f.age) : undefined,
      };
      state.items.unshift(newItem);
      saveLS({ items: state.items });
      // reset form
      state.form = { firstName: "", lastName: "", email: "", age: undefined };
    },
    updatePerson(state) {
      if (!state.form.id) return;
      const idx = state.items.findIndex((i) => i.id === state.form.id);
      if (idx >= 0) {
        state.items[idx] = {
          id: state.form.id,
          firstName: state.form.firstName.trim(),
          lastName: state.form.lastName.trim(),
          email: state.form.email.trim(),
          age: state.form.age ? Number(state.form.age) : undefined,
        };
        saveLS({ items: state.items });
        state.form = { firstName: "", lastName: "", email: "", age: undefined };
      }
    },
    deletePerson(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      saveLS({ items: state.items });
      // if you were editing the same one, clear form
      if (state.form.id === action.payload) {
        state.form = { firstName: "", lastName: "", email: "", age: undefined };
      }
    },
  },
});

export const {
  setForm,
  clearForm,
  loadFormFromPerson,
  createPerson,
  updatePerson,
  deletePerson,
} = peopleSlice.actions;

export default peopleSlice.reducer;
