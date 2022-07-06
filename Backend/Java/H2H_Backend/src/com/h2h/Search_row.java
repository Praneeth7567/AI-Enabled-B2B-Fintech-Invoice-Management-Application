package com.h2h;
import java.sql.*;
import java.util.ArrayList;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;

/**
 * Servlet implementation class Search
 */
@WebServlet("/Search_row")
public class Search_row extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
    public AddInvoice() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String cust_number =request.getParameter("cust_number");
		String buisness_year = request.getParameter("buisness_year");
		String doc_id = request.getParameter("doc_id");
		String invoice_id =request.getParameter("invoice_id");
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/grey_goose","root","root");
			String query = "SELECT * FROM winter_internship WHERE invoice_id = ? and cust_number= ? and doc_id = ? and buisness_year = ?;";
			PreparedStatement ps = connection.prepareStatement(query);
			ps.setInt(4,Integer.parseInt(buisness_year));
			ps.setString(3,doc_id);
			if (invoice_id=="" || invoice_id==null) 
			{
				ps.setNull(1,Types.INTEGER);
				
			}
			else
			{
				ps.setInt(1,Integer.parseInt(invoice_id));
			}
			if (cust_number=="" || cust_number==null) 
			{
				ps.setNull(2,Types.INTEGER);
			}
			else
			{
				ps.setInt(2,Integer.parseInt(cust_number));
			}
		    ResultSet result=ps.executeQuery();
		    ArrayList<Pojo> fetchDatas= new ArrayList<>();
		    while(result.next()) {
				Pojo fetchData=new Pojo();
				fetchData.setSl_no(result.getInt("sl_no"));
				fetchData.setBusiness_code(result.getString("business_code"));
				fetchData.setCust_number(result.getInt("cust_number"));
				fetchData.setClear_date(result.getDate("clear_date"));
				fetchData.setBuisness_year(result.getInt("buisness_year"));
				fetchData.setDoc_id(result.getString("doc_id"));
				fetchData.setPosting_date(result.getDate("posting_date"));
				fetchData.setDocument_create_date(result.getDate("document_create_date"));
				fetchData.setDue_in_date(result.getDate("due_in_date"));
				fetchData.setInvoice_currency(result.getString("invoice_currency"));
				fetchData.setDocument_type(result.getString("document_type"));
				fetchData.setPosting_id(result.getInt("posting_id"));
				fetchData.setTotal_open_amount(result.getDouble("total_open_amount"));
				fetchData.setBaseline_create_date(result.getDate("baseline_create_date"));
				fetchData.setCust_payment_terms(result.getString("cust_payment_terms"));
				fetchData.setInvoice_id(result.getInt("invoice_id"));
				fetchData.setAging_bucket(result.getString("aging_bucket"));
				
				fetchDatas.add(fetchData);
		}
		    
		    result.close();
			Gson gson = new Gson();
            String dataFetch = gson.toJson(fetchDatas);
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.getWriter().append(dataFetch);            /*System.out.println(dataFetch);*/
		}catch(Exception e) {
			e.printStackTrace();
		}
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}
}