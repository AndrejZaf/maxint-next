import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Deposit } from "@/types/deposit";
import React from "react";


const ExploreCards = ({ deposits }: { deposits: Deposit[] | null }) => {
    return (
        <>
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
                    {deposits?.map((deposit) => (
                        <TableRow key={deposit.bankName}>
                            <TableCell className="font-medium"><img className="h-6" src={deposit.imageExternalUrl} />
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
