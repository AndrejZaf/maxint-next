import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Deposit } from "@/types/deposit";
import React, { useState } from "react";


const ExploreCards = ({ deposits }: { deposits: Deposit[] | null }) => {
    const [searchInput, setSearchInput] = useState("");

    const filterData = (filterParam: string) => {
        return deposits?.filter(deposit => deposit.offerName.toLowerCase().includes(filterParam.toLowerCase()) || deposit.bankName.toLowerCase().includes(filterParam.toLowerCase()));
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
                    {filterData(searchInput)?.map((deposit) => (
                        <TableRow key={deposit.bankName}>
                            <TableCell className="font-medium"><img alt={deposit.bankName} className="h-6" src={deposit.imageExternalUrl} />
                            </TableCell>
                            <TableCell className="font-medium">{deposit.bankName}</TableCell>
                            <TableCell>{deposit.offerName}</TableCell>
                            <TableCell className="text-right">{deposit.offerAPY}%</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};
export default ExploreCards;
