"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  year: number;
  yearsRange: number[];
};

function CashflowFilters({ year, yearsRange }: Props) {
  const router = useRouter();

  return (
    <div>
      <Select
        defaultValue={year.toString()}
        onValueChange={(value) => {
          router.push(`/dashboard/?cfyear=${value}`);
        }}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {yearsRange.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
export default CashflowFilters;
