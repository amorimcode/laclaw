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
import Loading from "@/components/Loading";

const Home = () => {
  const { t } = useTranslate("HOME");

  const [data, setData] = useState<any[]>([]);
  const [fields, setFields] = useState<string[]>([]);
  const [currentSource, setCurrentSource] = useState<string>(SOURCES[0]);
  const [sumField, setSumField] = useState<string>("");
  const [viewBy, setViewBy] = useState<string>("");
  const [detailBy, setDetailBy] = useState<string>("");
  const [viewMode, setViewMode] = useState<string>(ViewMode.TABLE);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const instance = getInstance();
      const response = await instance.get("/", {
        params: { source: currentSource },
      });
      setFields(Object.keys(response.data[0]));
      setData(response.data);
      setSumField(Object.keys(response.data[0])[0]);
      setViewBy(Object.keys(response.data[0])[1]);
      setDetailBy(Object.keys(response.data[0])[2]);
    } catch (error) {
      window.alert(t("ERRORS.FETCH"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSource]);

  return (
    <main className="flex min-h-screen flex-col p-24">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex space-x-4 mb-5">
            <div>
              <Label>{t("SELECTS.SOURCE")}</Label>
              <Select
                value={currentSource}
                onValueChange={(value) => setCurrentSource(value)}
              >
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
              <Select
                onValueChange={(value) => setSumField(value)}
                value={sumField}
              >
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
              <Label>{t("SELECTS.VIEW_BY")}</Label>
              <Select
                onValueChange={(value) => setViewBy(value)}
                value={viewBy}
              >
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
              <Select
                onValueChange={(value) => setDetailBy(value)}
                value={detailBy}
              >
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
        </>
      )}
    </main>
  );
};

export default Home;
