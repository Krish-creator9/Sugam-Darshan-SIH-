import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const templeNames = [
  "Shree Dwarkadhish Temple",
  "Shree Somnath Temple",
  "Nageshwar Jyotirlinga",
  "Ambaji Temple",
  "Swaminarayan Akshardham, Gandhinagar",
  "Modhera Sun Temple",
  "Jagannath Temple, Ahmedabad",
  "Ranchhodrai Temple, Dakor",
  "Kalika Mata Temple, Pavagadh",
  "Shree Shamlaji Vishnu Mandir",
  "Shri Bala Hanuman Sankirtan Temple, Jamnagar",
  "Gop Temple",
  "Stambheshwar Mahadev Temple",
  "Tulsi Shyam Temple",
  "Bhadkeshwar Mahadev Temple",
  "Bhavnath Mahadev Temple",
  "Girnar Temples, Junagadh",
  "Rukmini Devi Temple, Dwarka",
];

interface TempleSelectorProps {
  selectedTemple: string;
  onTempleChange: (temple: string) => void;
}

export function TempleSelector({ selectedTemple, onTempleChange }: TempleSelectorProps) {
  return (
    <Select value={selectedTemple} onValueChange={onTempleChange}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a temple" />
      </SelectTrigger>
      <SelectContent>
        {templeNames.map((temple) => (
          <SelectItem key={temple} value={temple}>
            {temple}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
