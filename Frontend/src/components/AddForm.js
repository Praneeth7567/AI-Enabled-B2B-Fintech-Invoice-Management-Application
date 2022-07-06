import { TextField } from "@mui/material"
import { Box } from "@mui/system"
import { Button } from "@mui/material"
import { Dialog } from "@mui/material";
import { DialogActions } from "@mui/material";

function AddForm({business_code, invoice_currency,business_year, baseline_create_date, area_business, invoice_id, cust_number, doc_id, due_in_date, total_open_amount, posting_date, document_type, cust_payment_terms,clear_date, document_create_date, posting_id, changeHandler, submitHandler, closeHandler})
{
    function validate()  {
        let x = document.getElementById("1");
        if (x == ""){
            let b = document.getElementById("submit");
            b.disabled = true;
        }
        else{
            let b = document.getElementById("submit");
            b.disabled = true;    
        }
    }

    return <div>
        <form name = "forms" onSubmit = {changeHandler}>
            <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '20ch' },}} autoComplete="off">
            <TextField type = "text" name = "business_code" value = {business_code} onChange = {changeHandler} label="Business Code" required/>
            <TextField required name = "cust_number" value = {cust_number} onChange = {changeHandler} label="Customer Number"/>
            <TextField required name = "clear_date" type = "date"value = {clear_date} onChange = {changeHandler} label="Clear Date"/>
            <TextField required name = "business_year" value = {business_year} onChange = {changeHandler} label="Business year" />
            <TextField required name = "doc_id" value = {doc_id} onChange = {changeHandler} label="Document ID"/>
            <TextField  required name = "posting_date" type = "date" value = {posting_date} onChange = {changeHandler} label="Posting Date"/>
            <TextField required name = "document_create_date" type = "date" value = {document_create_date} onChange = {changeHandler} label="Document Create Date"/>
            <TextField required type= "date" name = "due_in_date" value = {due_in_date} onChange = {changeHandler} label="Due Date"/>
            <TextField reuired name = "invoice_currency" value = {invoice_currency} onChange = {changeHandler} label="Invoice Currency"/>
            <TextField required name = "document_type" value = {document_type} onChange = {changeHandler} label="Document Type"/>
            <TextField required name = "posting_id" value = {posting_id} onChange = {changeHandler} label="Posting ID"/>
            <TextField required name = "total_open_amount" value = {total_open_amount} onChange = {changeHandler} label="Total Open Amount"/>
            <TextField required type= "date" name = "baseline_create_date" value = {baseline_create_date} onChange = {changeHandler} label="Baseline Create Date"/>
            <TextField required name = "cust_payment_terms" value = {cust_payment_terms} onChange = {changeHandler} label="Payment Terms"/>
            <TextField required name = "invoice_id" value = {invoice_id} onChange = {changeHandler} label="Invoice ID"/>
            </Box>
            <DialogActions>
                <Button style = {{height:50 ,width:200}} id = "submit" type = {"submit"} value = {"Add"} onClick = {submitHandler} onClose = {submitHandler}>Add</Button>
                <Button style = {{height:50 ,width:200}} onClick={closeHandler}>Cancel</Button>
            </DialogActions>
        </form>
        </div>
}
export default AddForm