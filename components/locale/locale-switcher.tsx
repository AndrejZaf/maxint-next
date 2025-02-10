import LocaleSwitcherSelect from "@/components/locale/locale-switcher-select";
import { useLocale, useTranslations } from "next-intl";

export default function LocaleSwitcher() {
    const t = useTranslations("LocaleSwitcher");
    const locale = useLocale();
    return (
        <LocaleSwitcherSelect
            defaultValue={locale}
            items={[
                {
                    value: "en",
                    label: t("en"),
                },
                {
                    value: "es",
                    label: t("es"),
                },
            ]}
        />
    );
}