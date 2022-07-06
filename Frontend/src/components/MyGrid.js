import {TableContainer, TableHead, Paper, Table, TableRow, TableCell, TableBody } from "@mui/material";
import React, { useReducer } from 'react';
import { useEffect, useState } from 'react';
import {addUser, getData} from '../services/data';
import { Checkbox } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddButton from './AddButton';
import EditForm from './EditForm';
import { updateUser } from "../services/data";
import { deleteUser } from "../services/data";
import '../App.css';
import RefreshIcon from '@mui/icons-material/Refresh';
import { getSearch } from "../services/data";
import { predict } from "../services/data";
import { Dialog ,DialogContentText , DialogContent, DialogActions, TablePagination } from "@material-ui/core";
import A_search from "./A_search";

function MyGrid() {

  const [data,setData] = useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState({business_code:'',buisness_year:'', baseline_create_date:'', invoice_id:'', cust_number:'', doc_id:'', due_in_date:'', total_open_amount:'', posting_date:'', document_type:'', cust_payment_terms:'',invoice_currency:'', clear_date:'', document_create_date:'', posting_id:''});
  const [edit, setEdit] = useState({sl_no:'', invoice_currency:'',cust_payment_terms:'', name_customer:''});
  const [adv, setadv] = useState({business_code:'',buisness_year:'', baseline_create_date:'', invoice_id:'', cust_number:'', doc_id:'', due_in_date:'', total_open_amount:'', posting_date:'', document_type:'', cust_payment_terms:'',invoice_currency:'', clear_date:'', document_create_date:'', posting_id:''})
  const [pred, setpred] = React.useState({business_code : '', buisness_year : '', baseline_create_date : '', cust_number : '',doc_id : '', due_in_date : '', posting_date : '', cust_payment_terms : '', clear_date : '', converted_usd : ''})
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [count, setCount] = React.useState(0);
  const [anaopen, setanaopen] = React.useState(false);
  const [orderBy, setOrderBy] = React.useState('sl_no');
  const [order, setOrder] = React.useState('ASC');
  const [search, setSearch] = useState(false);
  const [input, setInput] = useState('');

  var {business_code, buisness_year, baseline_create_date, area_business, invoice_id, cust_number, doc_id, due_in_date, total_open_amount, posting_date, document_type, cust_payment_terms,invoice_currency,clear_date, document_create_date, posting_id} = user;
  var {sl_no,invoice_currency, cust_payment_terms } = edit;
  var {invoice_id, doc_id, buisness_year,cust_number} = adv
  
  //Handles input to convert them to search results
  let inputHandler = (e) => {
      var lowerCase = e.target.value.toLowerCase();
      setInput(lowerCase);
      }

  //Change Handler for edit which handles changes and sets edit using destructuring
  const changeHandler = (e) => {
    const {name, value} = e.target;
    setEdit({...edit,[name] :value});
  }

  // Opens Edit dialog box
  const editHandler = () => {
  setOpen(true);
  }

  // Deletes Invoice and reloads document
  const deleteHandler = async (e) => {
    console.log(e.target.checked == true)
      let response =  await deleteUser(sl_no);
      window.alert('Deleted successfully')
      document.location.reload(true)
    }
  
  //Filters the data for the edit pop up box
  const checkHandler = (e, sl_no) => {
    if (e.target.checked){ 
    let edit = data.filter(user => user.sl_no == sl_no)[0];
    setEdit(edit)
    }
  }

  //Handles the predict and sets the predicted values
  const handlePredict = () => {
    let data = {
      name_customer:edit.name_customer,
      business_code: edit.business_code,
      cust_number: edit.cust_number,
      clear_date: edit.clear_date,
      buisness_year: edit.buisness_year,
      doc_id: edit.doc_id,
      posting_date: edit.posting_date,
      due_in_date: edit.due_in_date,
      baseline_create_date: edit.baseline_create_date,
      cust_payment_terms: edit.cust_payment_terms,
      converted_usd: edit.invoice_currency==="CAD"?edit.total_open_amount*0.79:edit.total_open_amount}
      let age = predict(data)
  }


  //Handles the search box to open the pop up
  const searchHandler = () => {
    setSearch(true);
  }

  //Handles the advanced search box set the values
  const advanceSearchHandler = (e) => {
      const {name, value} = e.target;
      setadv({...adv,[name] :value});
  }
  
  //Gets the results from backend
  const handleSearch = async (update) => {
    if(update){
      let response = await getSearch(adv);
      if(response[10]=='t')
      {
        window.alert('Record not found')
      }
      else{     
      window.alert('Record found at row ' + response[10])
      setadv({business_code:'',buisness_year:'', baseline_create_date:'', invoice_id:'', cust_number:'', doc_id:'', due_in_date:'', total_open_amount:'', posting_date:'', document_type:'', cust_payment_terms:'',invoice_currency:'', clear_date:'', document_create_date:'', posting_id:''})
      }
    }
    setSearch(false);
  }

  //Handles close for updating the invoice 
  const handleClose = async (update) => {
    if (update){
      let response = await updateUser(edit);
      window.alert('Edited successfully')
      document.location.reload(true)
    }
    setOpen(false);
  };

  //Handles the page changes for pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //Handles the rows per page changes for pagination
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //Handles the sortings for the table
  const sortHandler = (newField) =>{
    if (orderBy == newField){
      let newOrder = order == "ASC" ? "DESC" : "ASC";
      setOrder(newOrder)
      window.alert('Sorted')
    }
    else{
      setOrder("ASC");
    }
    setOrderBy(newField);
  } 
  
  //Pop up for analytics view(not completed)
  const message = () => {
    setanaopen(true);
    window.alert('This feature is not yet implemented')
  }

  //Use effect to get the data from backend
  useEffect(async function () {
    let data = await getData(page, rowsPerPage, order, orderBy);
    setData(data['data']);
    setCount(data['count']);
  }, [rowsPerPage, page, order, orderBy]);

  return <>
    <div classname = "grid">
    <div className='box-container grid'>
    <div className = "left">
      <Stack direction="row">
        <Button style = {{height : 50, width:100, background: "#16aef2",borderColor: "#16aef2"}} variant="contained" onClick = {handlePredict}>Predict</Button>

        {/* Analytics-view Button */}
        <Button style = {{height : 50,borderColor:"#16aef2",color:'white', width:150}} variant="outlined" onClick = {message}>Analytics View</Button>
        
        {/* Advanced-view Button */}
        <A_search invoice_id = {  invoice_id }  cust_number = {cust_number} doc_id = { doc_id } buisness_year = {buisness_year} handleSearch={handleSearch} open = {search} changeHandleSearch = {advanceSearchHandler} />
        <Button style = {{height : 50, borderColor:"#16aef2" , color:'white', width:150}} variant="outlined" onClick = {searchHandler}>Advance Search</Button>
        
        {/* Refresh Button */}
        <Button style = {{height:50, width:50}}onClick = {() => document.location.reload(true)}><RefreshIcon /></Button>
    </Stack>     
    </div>

    <div className = "center">
      <TextField  className = 'search-box' style = {{outline :"None",background:'white' , color:'white'}} id="standard-basic" label="Search Customer ID" variant="outlined" onChange={inputHandler}/> 
    </div>
      
    <div className = "right">
      <Stack direction="row">
        <AddButton />  
        <EditForm invoice_currency = {  invoice_currency }  cust_payment_terms = {cust_payment_terms} sl_no = { sl_no } handleClose={handleClose} open = {open} changeHandler = {changeHandler}/>
        <Button style = {{width : 120, height : 50,borderColor:"white",color : "white"}} variant="outlined" onClick={editHandler} >Edit</Button>
        <Button style = {{width : 120, height : 50,borderColor:"white" ,color : "white"}} variant="outlined" onClick={(e) => deleteHandler(e)}>Delete</Button>
      </Stack>
    </div>
    </div>      
    </div>

    <div class = "grid">

    {/* Displaying the data table */}
    <TableContainer component={Paper} style = {{backgroundColor:"#172f3f", outlineStyle:"solid"}} className = "grid">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead >
          <TableRow >
              <TableCell style ={{color:"white"}} align=""></TableCell>
              <TableCell onClick = {() => sortHandler("sl_no")} style ={{color:"white"}} align="">Sl No</TableCell>
              <TableCell onClick = {() => sortHandler("business_code")} style ={{color:"white"}} align="">Business Code</TableCell>
              <TableCell onClick = {() => sortHandler("cust_number")} style ={{color:"white"}} align="">Customer number</TableCell>
              <TableCell onClick = {() => sortHandler("clear_date")} style ={{color:"white"}} align="">Clear Date</TableCell>
              <TableCell onClick = {() => sortHandler("buisness_year")} style ={{color:"white"}} align="">Business Year</TableCell>
              <TableCell onClick = {() => sortHandler("doc_id")} style ={{color:"white"}} align="">Document ID</TableCell>
              <TableCell onClick = {() => sortHandler("posting_date")} style ={{color:"white"}} align="">Posting Date</TableCell>
              <TableCell onClick = {() => sortHandler("document_create_date")} style ={{color:"white"}} align="">Document Create Date</TableCell>
              <TableCell onClick = {() => sortHandler("due_in_date")} style ={{color:"white"}} align="">Due In Date</TableCell>
              <TableCell onClick = {() => sortHandler("invoice_currency")} style ={{color:"white"}} align="">Invoice Currency</TableCell>
              <TableCell onClick = {() => sortHandler("document_type")} style ={{color:"white"}} align="">Document Type</TableCell>
              <TableCell onClick = {() => sortHandler("posting_id")} style ={{color:"white"}} align="">Posting Code</TableCell>
              <TableCell onClick = {() => sortHandler("total_open_amount")} style ={{color:"white"}} align="">Total Open Amount</TableCell>
              <TableCell onClick = {() => sortHandler("baseline_create_date")} style ={{color:"white"}} align="">Baseline Create Date</TableCell>
              <TableCell onClick = {() => sortHandler("cust_payment_terms")} style ={{color:"white"}} align="">Customer Payment terms</TableCell>
              <TableCell onClick = {() => sortHandler("invoice_id")} style ={{color:"white"}} align="">Invoice ID</TableCell>
              <TableCell onClick = {() => sortHandler("aging_bucket")} style ={{color:"white"}}align="">Aging Bucket</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {data.map(user => (
            <TableRow key={user.sl_no} sx={{ '&:last-child td, &:last-child th': {border: 0} }}>
          <TableCell component="th" scope="user">
            <Checkbox color="default" onClick={(e) => checkHandler(e,user.sl_no)}/>
          </TableCell>
            <TableCell style ={{color:"white"}} align="center" component="th" scope="user">{user.sl_no}</TableCell>
            <TableCell style ={{color:"white"}} align="center">{user.business_code}</TableCell>
            <TableCell style ={{color:"white"}} align="center">{user.cust_number}</TableCell>
            <TableCell style ={{color:"white"}} align="center">{user.clear_date}</TableCell>
            <TableCell style ={{color:"white"}} align="center">{user.buisness_year}</TableCell>
            <TableCell style ={{color:"white"}} align="center">{user.doc_id}</TableCell>
            <TableCell style ={{color:"white"}} align="center">{user.posting_date}</TableCell>
            <TableCell style ={{color:"white"}} align="center">{user.document_create_date}</TableCell>
            <TableCell style ={{color:"white"}} align="center">{user.due_in_date}</TableCell>
            <TableCell style ={{color:"white"}} align="center">{user.invoice_currency}</TableCell>
            <TableCell style ={{color:"white"}} align="center">{user.document_type}</TableCell>
            <TableCell style ={{color:"white"}} align="center">{user.posting_id}</TableCell>
            <TableCell style ={{color:"white"}} align="center">{user.total_open_amount}</TableCell>
            <TableCell style ={{color:"white"}} align="center">{user.baseline_create_date}</TableCell>
            <TableCell style ={{color:"white"}} align="center">{user.cust_payment_terms}</TableCell>
            <TableCell style ={{color:"white"}} align="center">{user.invoice_id}</TableCell>
            <TableCell style ={{color:"white"}} align="center">{user.aging_bucket}</TableCell>
        </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      <TablePagination 
      style = {{color :"white"}}
      rowsPerPageOptions={[5,10,20,50,100,200]}
      count={count}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </div>
  </>
}
export default MyGrid;