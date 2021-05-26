import React from 'react';

const Reportmain = () =>{
<Paper className="paper_tagadd">
<AppBar className="searchBar" position="static" color="default" elevation={0}>
  <Toolbar>
  </Toolbar>
</AppBar>
<div className="contentWrapper">
  <Typography color="textSecondary" align="center">
  <TextField id="standard-basic" label="태그등록" onChange={(e) => {setContents(e.target.value)}} value={contents} />
  <Button className="tag_add_button" variant="contained" color="primary" onClick={()=>onuploadClick(contents)}>
  등록
  </Button>
  </Typography>
</div>
</Paper>

}

export default Reportmain