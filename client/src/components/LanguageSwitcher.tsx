import { Button } from "./ui/button";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => changeLanguage("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("hi")}>
          Hindi
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("gu")}>
          Gujarati
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("bn")}>
          Bengali
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("ta")}>
          Tamil
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("te")}>
          Telugu
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
