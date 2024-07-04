/* eslint-disable react/prop-types */
import React from 'react';
import Flex from './Flex';
import {Pagination} from "@mantine/core";
import useQuery from "../hooks/useQuery";
import {useNavigate} from "react-router-dom";

export const AppPagination = ({
                                           fetch,
                                           count,
                                           length,
                                           itemsPerPage
                                       }) => {
    const query = useQuery()
    const navigate = useNavigate()
    const canPreviousPage = query.get("page") > 1
    const canNextPage = length === itemsPerPage && length !== 0;
    const handlePreviousPage = () => {
        if (canPreviousPage) {
            const pageIndex = (query.get("page")) - 1;
            handlePaginationChange(pageIndex);
        }
    };

    const handlePaginationChange = (pageIndex) => {
        query.set("page", pageIndex + 1);
        fetch(query);
        navigate(`?${query.toString()}`)
    };

    const handleNextPage = () => {
        if (canNextPage) {
            const pageIndex = (query.get("page")) + 1;
            handlePaginationChange(pageIndex);
        }
    };

    const gotoPage = (pageIndex) => {
        query.set("page", pageIndex);
        fetch(query);
        navigate(`?${query.toString()}`)
    }

    return (
        <Flex alignItems="center" justifyContent="center" className={"d-print-none"}>
            <Pagination total={Math.ceil(count / itemsPerPage)} siblings={1} activePage={(query.get("page"))}
                        onChange={gotoPage}>
                <Pagination.Previous disabled={!canPreviousPage} onClick={handlePreviousPage}/>
                <Pagination.Items/>
                <Pagination.Next disabled={!canNextPage} onClick={handleNextPage}/>
            </Pagination>
        </Flex>
    );
};

export default AppPagination;