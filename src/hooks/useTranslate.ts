import { useTranslations } from "next-intl";

const useTranslate = (key?: string) => {
  const t = useTranslations(key);
  return { t };
};

export default useTranslate;
