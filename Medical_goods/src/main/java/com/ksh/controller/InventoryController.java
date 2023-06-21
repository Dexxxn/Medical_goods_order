package com.ksh.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.ksh.model.InventoryVO;
import com.ksh.service.InventoryService;

@Controller
public class InventoryController {

	// 비즈니스 모델을 컨트롤러에 연결하기
	@Autowired
	InventoryService is;

	/*
	 * @RequestMapping(value = "/inventory-status", method = RequestMethod.GET) //
	 * ResponseEntity: 비동기식은 결과가 js로 가기때문에 통신상태를 확인하기 위해 통신상태를 함께 보냄 public
	 * ResponseEntity<ArrayList<InventoryVO>> getList(@PathVariable("dept") String
	 * dept){ InventoryVO ivo = new InventoryVO(); // mapper.xml(if문 가공)에서 String
	 * dept(단순 변수) 처리 못함 반드시 VO에담아서 전달해야함 ivo.setDept(dept); //setter: VO에 데이터 저장하기
	 * 위함 System.out.println(ivo); // 로그인 session값도 넘겨야겠지 //
	 * model.addAttribute("data", fetchedData); return new
	 * ResponseEntity<>(is.select1(ivo),HttpStatus.OK); // return is.select1(ivo) //
	 * 이렇게해도 되지만 서버 통신상태를 확인하기 위해서는 위 코드를 쓸것 }
	 */

	// 전체 재고 현황
	@RequestMapping(value = "/table_only", method = RequestMethod.POST)
	public ResponseEntity<?> select1(InventoryVO inven) {
		System.out.println(is.select1(inven));
		return new ResponseEntity<>(is.select1(inven), HttpStatus.OK);
	}

	// 사용 수량 입력을 위한 의약품 리스트
	@RequestMapping(value = "/useList", method = RequestMethod.POST)
	public ResponseEntity<?> useList(InventoryVO inven) {
		System.out.println(is.useList(inven));
		return new ResponseEntity<>(is.useList(inven), HttpStatus.OK);
	}
	
	// 모달 전체 의약품 리스트
	@RequestMapping(value = "/modal", method = RequestMethod.POST)
	public ResponseEntity<?> modalList(InventoryVO inven) {
		System.out.println(is.modalList(inven));
		return new ResponseEntity<>(is.modalList(inven), HttpStatus.OK);
	}
	
	 // 사용 수량 입력(insert)
	 @RequestMapping(value = "/useInsert", method = RequestMethod.POST) public
	 String useInsert(InventoryVO inven) {
		 is.useInsert(inven); 
		 System.out.println(inven);// 어떤 값을 받았는지 콘솔에서 확인
		 return "redirect:/useList";
	 }
	 
	// 발주요청 리스트
	@RequestMapping(value = "/orderList", method = RequestMethod.POST)
	public ResponseEntity<?> orderList(InventoryVO inven) {
		System.out.println(is.orderList(inven));
		return new ResponseEntity<>(is.orderList(inven), HttpStatus.OK);
	}	 

	 
	 
	 
	 
	 
	@RequestMapping(value = "/ph_detail", method = RequestMethod.GET)
	public String phDetail(Model model, @RequestParam("dept") String dept, @RequestParam("name") String name,
			@RequestParam("date") String date) {
		// 서버에서 데이터 조회
		ArrayList<InventoryVO> inventoryList = is.ph(dept, name, date);
		System.out.println(inventoryList);

		// 조회된 데이터를 모델에 추가하여 해당 뷰 페이지로 전달
		model.addAttribute("inventoryList", inventoryList);

		return "ph1";
	}

	@RequestMapping(value = "/ts", method = RequestMethod.GET)
	public String sTS(Model model, @RequestParam("supplier") String supplier, @RequestParam("name") String name,
			@RequestParam("date") String date

	) {

		List<InventoryVO> inventoryList1 = is.si(supplier, name, date);
		model.addAttribute("inventoryList1", inventoryList1);

		return "ts";
	}



}