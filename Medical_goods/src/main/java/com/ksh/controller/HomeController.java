package com.ksh.controller;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {

	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/z", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);

		String formattedDate = dateFormat.format(date);

		model.addAttribute("serverTime", formattedDate);

		return "home";
	}

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String index() {
		return "login";
	}

	/*
	 * @RequestMapping(value = "/index", method = RequestMethod.GET) public String
	 * index() { return "index"; }
	 */


/*	@RequestMapping(value = "/modal", method = RequestMethod.GET)
	public String modal() {
		return "modal";
	}*/

	@RequestMapping(value = "/notice", method = RequestMethod.GET)
	public String notice() {
		return "notice";
	}

	
	// 비동기식 페이지 연결(성언)-발주내역서
	@RequestMapping(value = "/purchase", method = RequestMethod.GET)
	public String pur() {
		return "purchase";
	}
	
	// 비동기식 페이지 연결(성언)-안전재고통계
	@RequestMapping(value = "/chart", method = RequestMethod.GET)
	public String chart() {
		return "chart";
	}
	
	// 비동기식 페이지 연결(성언)-거래명세서
	@RequestMapping(value = "/spe", method = RequestMethod.GET)
	public String spe() {
		return "spe";
	}
	
	// 비동기식 페이지 연결(성언) -담당자별구매이력
	@RequestMapping(value = "/ph", method = RequestMethod.GET)
	public String ph() {
		return "ph";
	}
	
	
	@RequestMapping(value = "/ts", method = RequestMethod.GET)
	public String ts() {
		return "ts";
	}


	@RequestMapping(value = "/ph_detail", method = RequestMethod.GET)
	public String ph1() {
		return "ph1";
	}
}
