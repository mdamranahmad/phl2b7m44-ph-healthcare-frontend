import { useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./pagination";

const getButtonArray = (totalPages: number) => {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
};

const TablePagination = () => {
    const [page, setPage] = useState(1);
    const totalPage = 7;

    // console.log(getButtonArray(totalPage));

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious>#</PaginationPrevious>
                </PaginationItem>
                {getButtonArray(totalPage).map((item) => (
                    <PaginationItem key={item}>
                        <PaginationLink
                            onClick={() => setPage(item)}
                            isActive={page === item}
                        >
                            {item}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext>#</PaginationNext>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default TablePagination;
