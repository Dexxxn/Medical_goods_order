// 재고 현황 리스트
function invenList(url) {
    // Ajax 요청 보내기
    $.ajax({
        url: url,
        async: true,
        type: "POST",
        dataType: "json", // 데이터 형식을 JSON으로 설정
        cache: false
    }).done(function(data) {
        // Contents 영역 삭제
    	$("#formAll").remove();
    	
        // Contents 영역 교체
        //console.log(data)
        var str = "";
        
        var currentAmountDeptA = [];
        var currentAmountDeptB = [];
        var currentAmountDeptC = [];
        var currentAmountDeptD = [];
        var currentAmountDeptE = [];
        var currentAmountTotal = [];
        
        for (var i = 0; i < data.length; i++) {
            if (data[i].dept === '병동A') {
                currentAmountDeptA.push(data[i].current_amount);
            } else if (data[i].dept === '병동B') {
                currentAmountDeptB.push(data[i].current_amount);
            } else if (data[i].dept === '병동C') {
                currentAmountDeptC.push(data[i].current_amount);
            } else if (data[i].dept === '수술실') {
                currentAmountDeptD.push(data[i].current_amount);
            } else if (data[i].dept === '처치실') {
                currentAmountDeptE.push(data[i].current_amount);
            }
        }
        
        for (var i = 0; i < data.length; i++) {
            str += "<tr>";
	            str += "<td>" + data[i].item_id + "</td>";
	            str += "<td>" + data[i].item_name + "</td>";
	            str += "<td>" + data[i].standard + "</td>";
	            str += "<td>" + data[i].unit + "</td>";
	            str += "<td><b>" + (currentAmountDeptA[i] + currentAmountDeptB[i] + currentAmountDeptC[i] + currentAmountDeptD[i] + currentAmountDeptE[i]) + "</b></td>";
	            str += "<td>" + currentAmountDeptA[i] + "</td>";
	            str += "<td>" + currentAmountDeptB[i] + "</td>";
	            str += "<td>" + currentAmountDeptC[i] + "</td>";
	            str += "<td>" + currentAmountDeptD[i] + "</td>";
	            str += "<td>" + currentAmountDeptE[i] + "</td>";
            str += "</tr>";
        }
        
        // thead에 열 추가
        $(".table.only thead tr").append("<th>병동A</th>");
        $(".table.only thead tr").append("<th>병동B</th>");
        $(".table.only thead tr").append("<th>병동C</th>");
        $(".table.only thead tr").append("<th>수술실</th>");
        $(".table.only thead tr").append("<th>처치실</th>");
        // 테이블 요소 선택
        var table = document.querySelector(".table"); 
        var quantityHeader = table.querySelector("thead th:nth-child(5)"); // 수량 헤더 선택
        quantityHeader.innerHTML = "합계";
        
        // tbody 값 대체
        $(".table.only tbody").html(str);
        // 데이터가 많으니 길이 조정
        $(".table-container").css({
        	width: '1200px'
        });
        
    });

}


//사용 입력 품목 리스트
function useList() {
    // 선택한 날짜 가져오기
    var selectedDate = $("#searchDate").val();
    // 선택한 부서 가져오기
    var selectedDept = $("#dept").val(); // 예시에서는 'dept'라는 id를 가진 요소로 가정
    
    // 사용 입력 품목 리스트 조회 URL
    var url = "/useList?date=" + encodeURIComponent(selectedDate) + "&dept=" + encodeURIComponent(selectedDept); // 예시 URL

    // Ajax 요청 보내기
    $.ajax({
        url: url,
        async: true,
        type: "POST",
        dataType: "json", // 데이터 형식을 JSON으로 설정
        cache: false
    }).done(function(data) {
        // Contents 영역 삭제

        // Contents 영역 교체
        console.log(data)
        var str = "";
        
        if (data.length === 0) {
            str = '<tr><td colspan="6" style="text-align:center;">조회 결과가 없습니다.</td></tr>';
        } else {
            for (var i = 0; i < data.length; i++) {
                str += "<tr>";
                str += "<td>" + data[i].item_id + "</td>";
                str += "<td>" + data[i].item_name + "</td>";
                str += "<td>" + data[i].standard + "</td>";
                str += "<td>" + data[i].unit + "</td>";
                str += "<td id='quantityUsedCell'>" + data[i].quantity_used + "</td>";
                str += "<td>" + data[i].significant + "</td>";
                str += "</tr>";
            }
        }
        
        // thead에 열 추가 (추가되지 않도록 조건 확인)
        var $theadRow = $(".table.only thead tr");
        if ($theadRow.find("th").length === 5) {
            $theadRow.append("<th>특이사항</th>");
        }
           
        // tbody 값 대체
        $(".table.only tbody").html(str);
        
      
        
    });

}

//물품 사용입력 페이지 연결
$(document).on("click", "#modalOpen", function() {
    $.ajax({
        url: "/modal", // URL of the purchase.jsp page
        type: "GET",
        success: function(data) {
            // Update the content of the chartContent element with the response from purchase.jsp
        	$("body").append(data);
        	// 응답으로 받은 데이터로 page_title_section의 p태그의 innerHTML 업데이트
            $("#title_name").html("자가사용입력");
        },
        error: function(xhr, status, error) {
            alert("An error occurred while loading the page. Error: " + error);
            console.log("XHR status: " + status);
            console.log("Error details: " + error);
        }
    });		
})

//모달 열기 버튼 클릭 이벤트 핸들러
$(document).on("click", "#modalOpen", function() {     
    if ($(".modal1").length > 0) {
        // 기존 모달 창을 닫고 삭제
        $(".modal1").hide();
        $(".modal-overlay").hide();
        $(".modal1").remove();
        $(".modal-overlay").remove();
    }
    // 비동기식으로 모달 페이지를 불러와서 열기
    $.ajax({
        url: "/modal",
        type: "POST",
        dataType: "json",
        async: true,
        cache: false
    }).done(function(data) {
    	console.log(data)
    	
        // 모달 페이지를 추가한 후 열기
        $(".modal1").show();
        $(".modal-overlay").show();
        // 모달 닫고 요소 삭제(모달 재생성위해)
        $(".closeB").click(function() {
        	$(".modal1").hide();
            $(".modal-overlay").hide();
        });
        // table.jsp 삭제
        $("#table_form").remove();
        $(".modal1 .basicB.top input").remove();
        
        var str1 = "";
        
        for (var i = 0; i < data.length; i++) {
            str1 += "<tr>";
            str1 += "<td>" + data[i].item_id + "</td>";
            str1 += "<td>" + data[i].item_name + "</td>";
            str1 += "<td>" + data[i].standard + "</td>";
            str1 += "<td>" + data[i].unit + "</td>";
            str1 += "<td id='quantityUsedCell'>" + data[i].quantity_used + "</td>";
            str1 += "<td>" + data[i].significant + "</td>";
            str1 += "</tr>";
        }
        
        //
        $(".modal_title").html("자가사용입력");
        //
        $(".modal1 #title_name").html("자가사용입력>사용수량등록");
        // thead에 열 추가
        $(".modal1 .table.only thead tr").append("<th>특이사항</th>");
        // tbody 값 대체
        $(".modal1 .table.only tbody").html(str1);
        // 사용수량 셀을 입력 요소로 변경
        $(".modal1 #quantityUsedCell").html("<input type='text' name='quantity_used' value='0'>");
        
        

        $(".modal1 .basicB .pointB").html("<input class='pointB submit' type='button' value='전체 적용' formaction='/useInsert'>");
        $(".modal1 .basicB .closeB").html("<input class='closeB' type='button' value='닫기'>");

        $(".modal .submit").click(function() {
        	$("#table_only_form").submit();
            $(".modal1").remove();
            $(".modal-overlay").remove();
            // 부모 창 새로고침
            //window.location.reload();
        });
    });
});

