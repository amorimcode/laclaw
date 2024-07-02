"use client";

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
import Datatable from "@/components/Datatable";
import { SOURCES } from "@/constants";

const Home = () => {
  const { t } = useTranslate("HOME");

  const [data, setData] = useState<any[]>([]); // [{}]
  const [fields, setFields] = useState<string[]>([]);
  const [currentSource, setCurrentSource] = useState<string>(SOURCES[0]);

  const fetchData = async () => {
    const instance = getInstance();
    const response = await instance.get("/api", {
      params: { source: currentSource },
    });

    setFields(Object.keys(response.data[0]));
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, [currentSource]);

  return (
    <main className="flex min-h-screen flex-col  p-24">
      <div className="flex space-x-4 mb-5">
        <Select onValueChange={(value) => setCurrentSource(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t("SELECTS.SOURCE")} />
          </SelectTrigger>
          <SelectContent>
            {SOURCES.map((source) => (
              <SelectItem key={source} value={source}>
                {source}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t("SELECTS.SUM")} />
          </SelectTrigger>
          <SelectContent>
            {fields.map((field) => (
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
            {fields.map((field) => (
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
            {fields.map((field) => (
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

      <Datatable data={data} />
    </main>
  );
};

export default Home;
