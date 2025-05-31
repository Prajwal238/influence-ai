
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface LanguageSelectorProps {
  selectedLanguages: string[];
  onLanguageToggle: (language: string) => void;
}

const LanguageSelector = ({ selectedLanguages, onLanguageToggle }: LanguageSelectorProps) => {
  const languages = ["english", "spanish", "french", "german"];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        Target Languages
      </label>
      <div className="flex flex-wrap gap-2">
        {languages.map((lang) => (
          <Button
            key={lang}
            variant={selectedLanguages.includes(lang) ? "default" : "outline"}
            size="sm"
            onClick={() => onLanguageToggle(lang)}
            className="capitalize flex items-center space-x-1"
          >
            <Globe className="h-3 w-3" />
            <span>{lang}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
