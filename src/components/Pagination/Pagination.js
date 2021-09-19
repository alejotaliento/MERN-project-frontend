import React from 'react';
//antd components
import { Pagination as PaginationAntd } from "antd";
//SASS
import "./Pagination.scss";

export default function Pagination(props) {
    const { posts, location, history } = props;
    const curretPage = parseInt(posts.page);

    const onChangePage = newPage => {
        history.push(`${location.pathname}?page=${newPage}`);
    };

    return (
        <PaginationAntd
            defaultCurrent={curretPage}
            total={posts.total}
            pageSize={posts.limit}
            onChange={newPage => { onChangePage(newPage) }}
            className="pagination"
        >

        </PaginationAntd>
    )
}
