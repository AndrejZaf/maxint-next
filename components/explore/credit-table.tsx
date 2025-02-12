import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Credit } from "@/types/credit";
import React, { useState } from "react";


const CreditTable = ({ credits }: { credits: Credit[] | null }) => {
    const [searchInput, setSearchInput] = useState("");

    const filterData = (filterParam: string) => {
        return credits?.filter(credit => credit.name.toLowerCase().includes(filterParam.toLowerCase()) || credit.introBonus.toLowerCase().includes(filterParam.toLowerCase()));
    };

    return (
        <>
            <Input placeholder="Filter offers by bank name or offer name" value={searchInput}
                   onChange={(event) => setSearchInput(event.target.value)} />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Bank Name</TableHead>
                        <TableHead>Offer Name</TableHead>
                        <TableHead className="text-right">Offer APY</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterData(searchInput)?.map((credit) => (
                        <TableRow key={credit.name}>
                            <TableCell className="font-medium"><img alt={credit.name} className="h-6" src={credit.imageExternalUrl} />
                            </TableCell>
                            <TableCell className="font-medium">{credit.name}</TableCell>
                            <TableCell>{credit.introBonus}</TableCell>
                            <TableCell className="text-right">{credit.estimatedEarning}$</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};
export default CreditTable;
