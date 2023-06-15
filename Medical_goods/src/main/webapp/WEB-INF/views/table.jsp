<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
	
	<form id="oo">
	<%@ include file = "form.jsp" %>
	<div class="tableAll" id="CheckboxTable">
		<div class="table-container">
			<table class="table checkbox" id="publicTable" border="1">
			    <thead>
			        <tr>
			            <th><input type="checkbox" name="checkbox" name="checkbox" onclick="selectAll(this)"></th>
			            <th>의약품 코드</th>
			            <th>의약품 명</th>
			            <th>규격</th>
	   		            <th>수량</th>
	  		            <th>특이사항</th>
			        </tr>
			    </thead>
			    <tbody>
			        <tr>
			            <td><input type="checkbox" name="checkbox"></td>
			            <td>00001</td>
			            <td>Prohaskdfafsdfsdfafa</td>
			            <td>3box</td>
			            <td>30</td>
			            <td>유통기한 확인 요망</td>
			        </tr>
			        <tr>
			            <td><input type="checkbox" name="checkbox"></td>
			            <td>00002</td>
			            <td>Prohaska</td>
			            <td>1box</td>
			            <td>30</td>
			            <td>유통기한 확인 요망</td>
			        </tr>
			        <tr>
			            <td><input type="checkbox" name="checkbox"></td>
			            <td>00003</td>
			            <td>Prohaska</td>
			            <td>1box</td>
			            <td>30</td>
			            <td>유통기한 확인 요망</td>
			        </tr>
			    </tbody>
			</table>
		</div>
		<hr>
		<div class="basicB">
			<button class="pointB">전체 적용</button>
			<button>닫기</button>
		</div>
		<br><br>
	</div>
</form>			

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<script>

	//checkbox 전체 선택 기능
	function selectAll(selectAll)  {
		const checkboxes 
			= document.getElementsByName('checkbox');
	  
		checkboxes.forEach((checkbox) => {
		checkbox.checked = selectAll.checked;
		})
	};
</script>	
