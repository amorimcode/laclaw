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
import Chart from "@/components/Chart";
import { ViewMode } from "@/enumerators";

const Home = () => {
  const { t } = useTranslate("HOME");

  const [data, setData] = useState<any[]>([]);
  const [fields, setFields] = useState<string[]>([]);
  const [currentSource, setCurrentSource] = useState<string>(SOURCES[0]);
  const [sumField, setSumField] = useState<string>("");
  const [viewBy, setViewBy] = useState<string>("");
  const [detailBy, setDetailBy] = useState<string>("");
  const [viewMode, setViewMode] = useState<string>(ViewMode.TABLE);

  const fetchData = async () => {
    const instance = getInstance();
    const response = await instance.get("/", {
      params: { source: currentSource },
    });

    setFields(Object.keys(response.data[0]));
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSource]);

  const filteredFields = fields.filter(
    (field) =>
      typeof data[0][field] === "number" &&
      field !== "ano" &&
      field !== "mes" &&
      field !== "id"
  );

  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="flex space-x-4 mb-5">
        <div>
          <Label>{t("SELECTS.SOURCE")}</Label>
          <Select onValueChange={(value) => setCurrentSource(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("SELECTS.SELECT")} />
            </SelectTrigger>
            <SelectContent>
              {SOURCES.map((source) => (
                <SelectItem key={source} value={source}>
                  {source}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>{t("SELECTS.SUM")}</Label>
          <Select onValueChange={(value) => setSumField(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("SELECTS.SELECT")} />
            </SelectTrigger>
            <SelectContent>
              {filteredFields.map((field) => (
                <SelectItem key={field} value={field}>
                  {field}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>{t("SELECTS.VIEW_BY")}</Label>
          <Select onValueChange={(value) => setViewBy(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("SELECTS.SELECT")} />
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
          <Label>{t("SELECTS.DETAIL_BY")}</Label>
          <Select onValueChange={(value) => setDetailBy(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("SELECTS.SELECT")} />
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
      </div>

      <div>
        <RadioGroup
          onValueChange={(value) => setViewMode(value)}
          defaultValue={ViewMode.TABLE}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={ViewMode.GRAPH} id={ViewMode.GRAPH} />
            <Label htmlFor={ViewMode.GRAPH}>{t("RADIO.GRAPH")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={ViewMode.TABLE} id={ViewMode.TABLE} />
            <Label htmlFor={ViewMode.TABLE}>{t("RADIO.TABLE")}</Label>
          </div>
        </RadioGroup>
      </div>

      {viewMode === ViewMode.GRAPH ? (
        <Chart
          data={data}
          sumField={sumField}
          viewBy={viewBy}
          detailBy={detailBy}
        />
      ) : (
        <Datatable
          data={data}
          sumField={sumField}
          viewBy={viewBy}
          detailBy={detailBy}
        />
      )}
    </main>
  );
};

export default Home;
