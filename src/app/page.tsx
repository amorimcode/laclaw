"use client";

import { Datatable } from "@/components/Datatable";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useTranslate from "@/hooks/useTranslate";
import { getInstance } from "../../services/instance";
import { useEffect, useState } from "react";

const Home = () => {
  const { t } = useTranslate("HOME");

  const [fieldsToSum, setFieldsToSum] = useState<string[]>([]);
  const [fieldsToDetail, setFieldsToDetail] = useState<string[]>([]);
  const [fieldsToView, setFieldsToView] = useState<string[]>([]);

  const fetchData = async () => {
    const instance = getInstance();
    const response = await instance.get("/api", {
      params: { source: "fonte1" },
    });

    setFieldsToSum(Object.keys(response.data[0]));
    setFieldsToDetail(Object.keys(response.data[0]));
    setFieldsToView(Object.keys(response.data[0]));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col  p-24">
      <div className="flex space-x-4 mb-5">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t("SELECTS.SUM")} />
          </SelectTrigger>
          <SelectContent>
            {fieldsToSum.map((field) => (
              <SelectItem key={field} value={field}>
                {field}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t("SELECTS.VIEW_BY")} />
          </SelectTrigger>
          <SelectContent>
            {fieldsToView.map((field) => (
              <SelectItem key={field} value={field}>
                {field}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t("SELECTS.DETAIL_BY")} />
          </SelectTrigger>
          <SelectContent>
            {fieldsToDetail.map((field) => (
              <SelectItem key={field} value={field}>
                {field}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <RadioGroup defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one">{t("RADIO.GRAPH")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two">{t("RADIO.TABLE")}</Label>
          </div>
        </RadioGroup>
      </div>

      <Datatable />
    </main>
  );
};

export default Home;
