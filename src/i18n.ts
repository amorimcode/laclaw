import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";

export default getRequestConfig(async () => {
  const headersList = headers();
  const defaultLocale = headersList.get("accept-language")?.split(",").shift();
  const locale = defaultLocale;

  console.log("locale", locale);

  try {
    return {
      locale,
      messages: (await import(`../messages/${locale}.json`)).default,
    };
  } catch (error) {
    console.error(error);
    return {
      locale,
      messages: (await import(`../messages/pt-BR.json`)).default,
    };
  }
});
