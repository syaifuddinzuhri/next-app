"use client"
import Icon from "@/components/ui/Icon";
import ReactPaginate from "react-paginate";
const PaginationButtons = ({ setCurrentPage, currentPage, totalPages }: any) => {
    const handlePageClick = ({ selected }: any) => {
        setCurrentPage(selected + 1);
    };

    const paginationVariants = {
        hidden: {
            opacity: 0,
            y: 200,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 2,
            },
        },
    };

    const showNextButton = currentPage !== totalPages - 1;
    const showPrevButton = currentPage !== 0;
    return (
        // <motion.div
        //     variants={paginationVariants}
        //     initial="hidden"
        //     animate="visible"
        // >
            <ReactPaginate
                breakLabel={<span className="mr-4">...</span>}
                nextLabel={
                    showNextButton ? (
                        <span className="w-10 h-10 flex items-center justify-center hover:text-white hover:bg-gray-300 rounded-md">
                            <Icon icon='mdi:chevron-right' />
                        </span>
                    ) : null
                }
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={totalPages}
                previousLabel={
                    showPrevButton ? (
                        <span className="w-10 h-10 flex items-center justify-center hover:text-white hover:bg-gray-300 rounded-md mr-4">
                            <Icon icon='mdi:chevron-left' />
                        </span>
                    ) : null
                }
                forcePage={currentPage - 1}
                containerClassName="flex items-center justify-center mt-8 mb-4"
                pageClassName="hover:bg-gray-300 w-10 h-10 flex items-center justify-center rounded-md mr-4"
                activeClassName="bg-blue-500 text-white hover:bg-blue-600"
            />
        // </motion.div>
    );
};

export default PaginationButtons;