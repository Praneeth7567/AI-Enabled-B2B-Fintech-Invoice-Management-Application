import axios from "axios";

export const getData = async (start, limit, order, orderBy) => {
    let str = "start="+(start*limit)+"&limit="+limit+"&orderby="+orderBy+"&order="+order;
    let response = await axios.get("http://localhost:8080/H2H_Backend/Fetch?"+str);
    let data = response.data.backend;
    console.log(response.data)
    console.log(data);
    let count = response.data.count;
    data.map((backend, index) => ({...backend, "id":index}))
    return {data,count};
}

export const addUser = async({business_code, business_year, baseline_create_date, area_business,invoice_id, cust_number, doc_id, due_in_date, total_open_amount, posting_date, document_type, cust_payment_terms, invoice_currency}) => {
    let data = "business_code="+business_code+"&buisness_year="+business_year+"&baseline_create_date="+baseline_create_date+ "&area_business="+area_business+"&invoice_id="+ invoice_id+"&cust_number="+cust_number+"&doc_id="+ doc_id+ "&due_in_date=" + due_in_date+"&total_open_amount=" + total_open_amount + "&posting_date="+posting_date + "&document_type="+document_type+"&cust_payment_terms="+cust_payment_terms+"&invoice_currency="+invoice_currency;
    let response = await axios.get("http://localhost:8080/H2H_Backend/Add_row?"+data)
    return response.data;
} 

export const updateUser = async({ sl_no,cust_payment_terms, invoice_currency }) => {
    let data = "sl_no="+sl_no+"&cust_payment_terms="+cust_payment_terms+"&invoice_currency="+invoice_currency;
    let response = await axios.get("http://localhost:8080/H2H_Backend/Edit_row?"+data);
    return response.data;
}

export const deleteUser = async( sl_no ) => {
    let data = "sl_no="+sl_no;
    let response = await axios.get("http://localhost:8080/H2H_Backend/Delete_row?"+data);
    return response.data;
}

export const predict = async (data) => {
    let response = await axios.post('http://127.0.0.1:5000/', data);
    let doc_id = response.data[0].doc_id;
    let aging_bucket = response.data[0].aging_bucket;
    let dat = "doc_id="+doc_id+"&aging_bucket="+aging_bucket;
    let get = await axios.get("http://localhost:8080/H2H_Backend/Predict_row?"+dat)
    return get.dat;
}

export const getSearch = async ({cust_number, doc_id,invoice_id, buisness_year}) => {
    let data = "cust_number="+cust_number+"&doc_id="+doc_id+"&invoice_id="+invoice_id+"&buisness_year="+buisness_year;
    let response = await axios.get("http://localhost:8080/H2H_Backend/Search_row?"+data);
    return response.data;
}