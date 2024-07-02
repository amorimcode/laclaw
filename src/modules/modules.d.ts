import { EventRepeatRule, Gender, MaritalStatus } from "./enum";
import { ScheduleType } from "./enum/schedule";
import { UserRole } from "./enum/user";

export as namespace models;

export type Product = {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  quantidade: number;
  ano: number;
  mes: number;
  cor: string;
  fabricante: string;
};
