
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { APPLY_LOADING_REQUEST, APPLY_DETAIL_REQUEST } from '../../actions/applyAction';
import { BOARD_DETAIL_REQUEST } from "../../actions/boardAction"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Modal from '@material-ui/core/Modal';
import { Link } from "react-router-dom"
import ApplyModal from "./applymodal"
import SelectInput from '@material-ui/core/Select/SelectInput';
import Pagination from '../layout/Pagenation'

const Board = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setTagsPerPage] = useState(10);
  const [open, setOpen] = useState(false)
  const [applyId] = useState("")
  const { applys, applydetails, totalElements } = useSelector((state) => state.apply);
  const { text, title, board } = useSelector((state) => state.board);
  const indexOfLastTag = currentPage * postsPerPage
  const indexOfFirstTag = indexOfLastTag - postsPerPage

  const styles = {
    tableHead: {
      textAlign: 'center',
    },
    tableCell: {
      textAlign: 'center',
      height: "60px"
    },
  }

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
  useEffect(() => {
    dispatch({
      type: APPLY_LOADING_REQUEST,
      payload: { params: { direction: "ASC", page: currentPage, size: postsPerPage } },
      currentPage: currentPage
    })
  }, [currentPage])

  const detailLoading = (applyId) => {

    setOpen(true)

    dispatch({
      type: APPLY_DETAIL_REQUEST,
      payload: applyId
    })

    dispatch({
      type: BOARD_DETAIL_REQUEST,
      payload: applydetails.recruitmentBoardId
    })
  }

  console.log(totalElements)
  return (
    <div>
      <Paper className="paper">
        <AppBar className="searchBar" position="static" color="default" elevation={0}>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
              </Grid>
              <Grid item xs>
              </Grid>

            </Grid>
          </Toolbar>
        </AppBar>
        <div className="contentWrapper">
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
        </div>
        <Pagination postsPerPage={postsPerPage} totalPosts={totalElements} paginate={setCurrentPage} />

      </Paper>
      <ApplyModal useOpen={[open, setOpen]} applyId={applyId} applydetails={applydetails} text={text} title={title} />

    </div>


  );
}

export default Board;