import { useTranslations } from "next-intl";

const useTranslate = (key?: string) => {
  try {
    const t = useTranslations(key);
    return { t };
  } catch (error) {
    return { t: (key: string) => key };
  }
};

export default useTranslate;
