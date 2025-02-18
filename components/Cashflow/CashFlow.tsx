import { getAnnualCachflow } from "@/app/actions/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CashflowFilters from "./CashflowFilters";
import { getTransactionYearsRange } from "@/data/queries/getTransactionYearsRange";
import CashflowContent from "./CashflowContent";

async function Cashflow({ year }: { year: number }) {
  const [cashflow, yearsRange] = await Promise.all([
    getAnnualCachflow(year),
    getTransactionYearsRange(),
  ]);

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Cashflow</span>
          <CashflowFilters year={year} yearsRange={yearsRange || []} />
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-[1fr_250px]">
        <CashflowContent annualCashflow={cashflow} />
        {/* Additional components */}
      </CardContent>
    </Card>
  );
}

export default Cashflow;
