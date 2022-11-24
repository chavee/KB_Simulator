$(document).ready(function() {
	// update caption
	// $('#btn-open').text(LANG_OPEN_FILE);
	// $('#btn-save').text(LANG_SAVE_FILE);
	// $('#btn-delete').text(LANG_DELETE_FILE);
	// $('#btn-build').text(LANG_BUILD);
	// $('#btn-setclock').text(LANG_SETCLOCK);
	// $('#btn-update').text(LANG_UPDATE);
	// $('#btn-wifi-config').text(LANG_WIFI_CONFIG);
	// $('#btn-qrcode').text(LANG_QRCODE);
	$('#btn-new').text("");
	$('#btn-open').text("");
	$('#btn-save').text("");
	$('#btn-delete').text("");
	$('#btn-build').text("");
	$('#btn-buildexam').text("");//ning edit
	$('#btn-buildfks').text("");//ning edit
	$('#btn-setclock').text("");
	$('#btn-update').text("");
	$('#btn-wifi-config').text("");
	$('#btn-qrcode').text("");
	$('#btn-ex1').text("");//ning edit
	$('#btn-ex2').text("");//ning edit
	$('#btn-ex3').text("");//ning edit
	$('#btn-exam').text("Exam");//ning edit
	$('#btn-practice').text("Practice");//ning edit
	// add title
	$('#btn-new').prop('title', LANG_NEW_FILE_TITLE);
	$('#btn-open').prop('title', LANG_OPEN_FILE_TITLE);
	$('#btn-save').prop('title', LANG_SAVE_FILE_TITLE);
	$('#btn-delete').prop('title', LANG_DELETE_FILE_TITLE);
	$('#btn-build').prop('title', LANG_BUILD_TITLE);
	$('#btn-buildexam').prop('title', LANG_BUILD_EXAM_TITLE);//ning edit
	$('#btn-buildfks').prop('title', LANG_BUILD_FKS_TITLE);//ning edit
	$('#btn-setclock').prop('title', LANG_SETCLOCK_TITLE);
	$('#btn-update').prop('title', LANG_UPDATE_TITLE);
	$('#btn-ex1').prop('title', LANG_PRI4_TITLE);//ning edit
	$('#btn-ex2').prop('title', LANG_EX2_FILE_TITLE);//ning edit
	$('#btn-ex3').prop('title', LANG_EX3_FILE_TITLE);//ning edit
	$('#btn-exam').prop('title', LANG_EXAM_FILE_TITLE);//ning edit
	$('#btn-practice').prop('title', LANG_PRAC_FILE_TITLE);//ning edit
	
	$('.modal-wifi-config .modal-header h4').text(LANG_WIFI_CONFIG);
	$('.modal-qrcode .modal-header h4').text(LANG_QRCODE);

	// create home controller
	var hc = new HomeController();

});
////////////////// ning edit
/*setInterval(Home,1);
function Home(){
	this.QuizSim = function(val) {
		u_quiz = val;
	}
	this.timer = function(val) {
		$('#timer').text(val + "" + u_quiz);
	}

}*/
