package com.study.dvd.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.study.dvd.dao.ProducerDao;
import com.study.dvd.entity.Producer;

@WebServlet("/producer/add")
public class AddProducerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.getRequestDispatcher("/WEB-INF/views/add_producer.jsp").forward(req, resp);
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		String producerName = req.getParameter("producer");
		Producer producer = new Producer();
		producer.setProducerName(producerName);
		boolean isSuccess = ProducerDao.save(producer) > 0;
		req.setAttribute("isSuccess", isSuccess);
		req.getRequestDispatcher("/WEB-INF/views/add_producer_result.jsp").forward(req, resp);
	}
}






