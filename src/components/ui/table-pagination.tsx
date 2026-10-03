import { Dispatch, SetStateAction, useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./pagination";

const getButtonArray = (
    totalPages: number,
    page: number,
): (number | "ellipsis")[] => {
    // return Array.from({ length: totalPages }, (_, index) => index + 1);
    if (page <= 7) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }
    if (page <= 4) {
        return [1, 2, 3, 4, 5, "ellipsis", totalPages];
    }

    if (page >= totalPages - 3) {
        return [
            1,
            "ellipsis",
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
        ];
    }

    return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages];
};

interface IProps {
    totalPages: number;
    handlePageChange: Dispatch<SetStateAction<number>>;
    page: number;
}

const TablePagination = ({ totalPages, handlePageChange, page }: IProps) => {
    // const [page, setPage] = useState(1);
    // const totalPage = 8;

    const goToPage = (page: number) => {
        // setPage(page);
        handlePageChange(page);
    };

    // console.log(getButtonArray(totalPage));

    if (totalPages <= 1) {
        return null;
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => goToPage(page - 1)}
                        // aria-disabled={page === 1} // no visual effect without class
                        aria-disabled={page === 1}
                        className={
                            page === 1
                                ? "pointer-events-none opacity-50"
                                : undefined
                        }
                    >
                        #
                    </PaginationPrevious>
                </PaginationItem>
                {getButtonArray(totalPages, page).map((item, index) =>
                    item === "ellipsis" ? (
                        <PaginationItem
                            key={`ellipsis${item}+${
                                // biome-ignore lint/suspicious/noArrayIndexKey: explanation>
                                index
                            }`}
                        >
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={item}>
                            <PaginationLink
                                onClick={() =>
                                    // setPage(item)
                                    handlePageChange(item)
                                }
                                isActive={page === item}
                            >
                                {item}
                            </PaginationLink>
                        </PaginationItem>
                    ),
                )}
                {/* <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem> */}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => goToPage(page + 1)}
                        // aria-disabled={page === 1} // no visual effect without class
                        aria-disabled={page === totalPages}
                        className={
                            page === totalPages
                                ? "pointer-events-none opacity-50"
                                : undefined
                        }
                    >
                        #
                    </PaginationNext>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default TablePagination;
