import React from "react";
// import { Button, Pagination } from "react-bootstrap";

function PaginationButtons(props) {
  const paginationInfo = props.paginationInfo;
  let prev_btn = "";
  let next_btn = "";
  // if (paginationInfo.prev || paginationInfo.next) {
  //   if (paginationInfo.prev && paginationInfo.show_prev) {
  //     prev_btn = (
  //       <Button variant="info" href={paginationInfo.prev}>
  //         Назад
  //       </Button>
  //     );
  //   }
  //   if (paginationInfo.next && paginationInfo.show_next) {
  //     next_btn = (
  //       <Button variant="success" href={paginationInfo.next}>
  //         Вперёд
  //       </Button>
  //     );
  //   }
  // }
  return
  // (
  //   <>
  //     <Pagination>
  //       {prev_btn}
  //       {next_btn}
  //     </Pagination>
  //   </>
  // );
}

export default PaginationButtons;
