
const reviewState = (reviewstate) => {

    console.log(reviewstate)
    switch (reviewstate) {
      case "BEFORE":
        return (<div>리뷰 작성 전</div>)
      case "WAITING":
        return (<div>리뷰 승인 대기</div>)
      case "ACCEPT":
        return (<div>리뷰 승인</div>)
      case "REJECT":
        return (<div>리뷰 반려</div>)
        
    }

  }

const Applytable = ({applys}) => {
    return(
        <Typography color="textSecondary" align="center">
            <Table>
              <TableHead>
                <TableCell style={styles.tableHead}> 지원번호  </TableCell>
                <TableCell style={styles.tableHead}> 계약여부  </TableCell>
                <TableCell style={styles.tableHead}> 리뷰      </TableCell>
                <TableCell style={styles.tableHead}> 리뷰상태 </TableCell>
                <TableCell style={styles.tableHead}> 상세보기 </TableCell>
              </TableHead>
              <TableBody>
                {applys.map((apply) => (
                  <TableRow  /*component={Link} to ={`/admin/apply/${apply.applyId}`} key={apply.applyId}*/>
                    <TableCell style={styles.tableCell} >{apply.applyId}</TableCell>
                    <TableCell style={styles.tableCell}>{apply.isContracted === 1 ? "계약 완료" : "계약 전"}</TableCell>
                    <TableCell style={styles.tableCell}>{apply.review === null ? "리뷰 작성 전" : apply.review}</TableCell>
                    <TableCell style={styles.tableCell}>{reviewState(apply.reviewState)}</TableCell>
                    <TableCell style={styles.tableCell}>{apply.reviewState !== "WAITING" ? "" : <Button color="primary" onClick={() => detailLoading(apply.applyId)} style={{ height: "0px" }}>리뷰처리</Button>}</TableCell>
                  </TableRow>
                ))
                }
              </TableBody>
            </Table>
          </Typography>
    )
}