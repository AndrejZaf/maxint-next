"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
    const paths = usePathname();
    const pathNames = paths.split("/").filter(path => path);
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {pathNames.map((link, index) => {
                    const href = `/${pathNames.slice(0, index + 1).join('/')}`;
                    const itemLink = link.toUpperCase()[0] + link.slice(1, link.length);
                    return (
                        <div className="flex space-x-2 items-center" key={link}>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href={href}>
                                    {itemLink}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {pathNames.length !== index + 1 && <BreadcrumbSeparator className="hidden md:block" />}
                        </div>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};
export default Breadcrumbs;