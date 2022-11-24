function saveWorkspaceLocal(){
	var xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
	localStorage.setItem('KidBrightLastWorkspace', xml);
}
function HomeController() {
	var that = this;
	var deletingBoardId = null;
	var standalone = false;
	var simulator = new Simulator();

	/////// Ning Edit
	var sceneKV = 0;
	var lang_sim = 0; //eng
	//$(function() {
    	$.getJSON("https://api.ipify.org?format=jsonp&callback=?",
      		function(json) {
        		//document.write("My public IP address is: ", json.ip);
        		//_ip = json.ip;
        		
        		$.ajax({
					type: 'POST',
					url: '/ip_client',
					data: {ipname: json.ip},
					dataType: 'json',
					error: function(e) {
					//
					},
					success: function(msg) {
					//req = _ip;
					}
				});
        		//simulator.sendIP(_ip);
      		}
    	);
	
    if(Blockly.Msg.CATEGORY_BASIC == 'Basic'){
    	lang_sim = 0;
    }	
    else{
    	lang_sim = 1;
    }
	$('#home-lang-en').click(function() {
		saveWorkspaceLocal();
		homeSetLanguage('en');
	});

	$('#home-lang-th').click(function() {
		saveWorkspaceLocal();
		homeSetLanguage('th');
	});

	// KidBrightOS, enable build button and set clock button
	$('#btn-build').prop('disabled', false);
	$('#btn-buildexam').prop('disabled', false);
	$('#btn-buildfks').prop('disabled', false);
	$('#btn-setclock').prop('disabled', false);
	$('#btn-update').prop('disabled', false);
	$('#btn-wifi-config').prop('disable', false);

	// check standalone flag
	$.ajax({
		url: '/standalone',
		type: 'POST',
		error: function(e) {
			//
		},
		success: function(reply) {
			standalone = reply.standalone;
		}
	});

	// get kidbrightide version
	$.ajax({
		type: 'POST',
		url: '/version',
		error: function(e) {
			//
		},
		success: function(res) {
			$('#version-text').html('ver. ' + res.version);
		}
	});

	// =========================================================================
	// save file browser modal form
	// =========================================================================
	$('.modal-save-file-browser').on('shown.bs.modal', function() {
		$(this).find('[autofocus]').focus();
	});
	$('.modal-save-file-browser #btn-ok').click(function() {
		var fn = $('.modal-save-file-browser #save-file-text').val();
		// if (fn == '') return;
		if (fn == '') {
			fn = "untitle.txt"
		}
		document.getElementById("save-file-text").value = '';
		saveFile(fn);
		/*
		var fn = $('.modal-save-file-browser #file-text').val();
		if (fn == '') return;
		// check file exists
		var dup_flag = false;
		var list_items = $('.modal-save-file-browser .modal-body .list-group .list-group-item');
		for (var i = 0; i < list_items.length; i++) {
			if (list_items[i].text == fn) {
				dup_flag = true;
			}
		}

		if (dup_flag) {
			$('.modal-save-overwrite-confirm .modal-header h4').text(LANG_FILE_OVERWRITE);
			$('.modal-save-overwrite-confirm .modal-footer #btn-ok').text(LANG_OK);
			$('.modal-save-overwrite-confirm .modal-footer #btn-cancel').text(LANG_CANCEL);
			$('.modal-save-overwrite-confirm').modal({
				show: true,
				keyboard: false,
				backdrop: 'static'
			});
		} else {
			saveFile(fn);
		}*/
	});

	$('.modal-save-overwrite-confirm #btn-ok').click(function() {
		saveFile($('.modal-save-file-browser #save-file-text').val());
		$('.modal-save-overwrite-confirm').modal('hide');
	});


	$('#btn-new').click(function() {
		Blockly.mainWorkspace.clear();
	});
	// =========================================================================
	// open file browser modal form
	// =========================================================================
	$('.modal-open-file-browser #btn-ok').click(function() {
		// if not insert mode
		if (!($('.modal-open-file-browser #insert-checkbox').is(":checked"))) {
			// clear old workspace
			Blockly.mainWorkspace.clear();
		}

		// load with new file
		$('.modal-open-file-browser').modal('hide');
		var xml = Blockly.Xml.textToDom(b64DecodeUnicode(workspaceData));
		Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
		filename = files[0].name;
		$('input').val("");
		/*var fn = null;
		var items = $('.modal-open-file-browser .modal-body .list-group .list-group-item');
		for (var i = 0; i < items.length; i++) {
			if ($(items[i]).hasClass('active')) {
				fn = $(items[i]).text();
			}
		}

		if (fn) {
			$.ajax({
				type: 'POST',
				url: '/openfile',
				data: {
					filename: fn
				},
				dataType: 'json',
				error: function(e) {
					alertError(e);
					$('.modal-open-file-browser').modal('hide');
				},
				success: function(msg) {
					// if not insert mode
					if (!($('.modal-open-file-browser #insert-checkbox').is(":checked"))) {
						// clear old workspace
						Blockly.mainWorkspace.clear();
					}

					// load with new file
					$('.modal-open-file-browser').modal('hide');
					var xml = Blockly.Xml.textToDom(b64DecodeUnicode(msg));
					Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
				}
			});
		}*/
	});
	$('.modal-open-file-browser #btn-cancel').click(function () {
		$('input').val("");
	});
	// =========================================================================
	// delete file browser modal form
	// =========================================================================
	$('.modal-delete-file-browser').on('shown.bs.modal', function() {
		$(this).find('[autofocus]').focus();
	});

	$('.modal-delete-file-browser #btn-ok').click(function() {
		var fn = $('.modal-delete-file-browser #file-text').val();
		if (fn == '') return;

		$('.modal-delete-confirm .modal-header h4').text(LANG_FILE_DELETE_CONFIRM);
		$('.modal-delete-confirm').modal({
			show: true,
			keyboard: false,
			backdrop: 'static'
		});
	});

	$('.modal-delete-confirm #btn-ok').click(function() {
		deleteFile($('.modal-delete-file-browser #file-text').val());
	});

	function alertError(e) {
		if (parseInt(e.responseText) < LANG_ERROR_CODE.length) {
			alert(LANG_ERROR_CODE[parseInt(e.responseText)]);
		} else {
			alert(LANG_ERROR_CODE_DEFAULT);
		}
	}

	// helper for modal autofocus (jade autofocus works only on first time opens)
	$('.modal').on('shown.bs.modal', function() {
		$(this).find('[autofocus]').focus();
	});

	function saveFile(fn) {
		let download = document.querySelector("a#btn-ok[download]");
		download.setAttribute("download", fn);
		var dom = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
		var data = b64EncodeUnicode(dom);
		download.setAttribute(
			"href",
			("data:text/plain;charset=utf-8," + encodeURIComponent(data))
		);

		$('.modal-save-file-browser').modal('hide');

	}
	function saveFile2(fn) {
		let download = document.querySelector("a#btn-save[download]");
		download.setAttribute("download", fn);
		var dom = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
		var data = b64EncodeUnicode(dom);
		download.setAttribute(
			"href",
			("data:text/plain;charset=utf-8," + encodeURIComponent(data))
		);

		$('.modal-save-file-browser').modal('hide');

	}

	function deleteFile(fn) {
		$.ajax({
			type: 'POST',
			url: '/deletefile',
			data: {
				filename: fn
			},
			dataType: 'json',
			error: function(e) {
				if (e.status != 200) {
					alertError(e);
				}
			},
			success: function() {
				$('.modal-delete-confirm').modal('hide');
				$('.modal-delete-file-browser').modal('hide');
			}
		});
	}

	$('#btn-save').click(function() {
		// save file browser modal form
		$('.modal-save-file-browser .modal-header h4').text(LANG_SAVE_FILE);
		$('.modal-save-file-browser .modal-footer #btn-ok').text(LANG_OK);
		$('.modal-save-file-browser .modal-footer #btn-cancel').text(LANG_CANCEL);

		$('.modal-save-file-browser #file-list').empty();
		$('.modal-save-file-browser #file-text').text('');

		$.ajax({
			type: 'POST',
			url: '/listfile',
			error: function(e) {
				if (e.status != 200) {
					alertError(e);
				}
			},
			success: function(file_list) {
				// render file list
				for (var i in file_list) {
					var item = file_list[i];
					$('.modal-save-file-browser #file-list').append('<a class="list-group-item">' + item.filename + '</a>');
				}

				$('.modal-save-file-browser .modal-body .list-group .list-group-item').click(function(e) {
					$('.modal-save-file-browser #file-text').val($(e.target).text());
				});

				$('.modal-save-file-browser').modal({
					show: true,
					keyboard: false,
					backdrop: 'static'
				});
			}
		});
	});

	function updateOpenFileButtons() {
		var open_flag = false;
		var items = $('.modal-open-file-browser .modal-body .list-group .list-group-item');

		for (var i = 0; i < items.length; i++) {
			if ($(items[i]).hasClass('active')) {
				open_flag = true;
			}
		}
		$('.modal-open-file-browser #btn-ok').prop('disabled', !open_flag);
	}

	function handleFileSelect(evt) {
		files = evt.target.files; // FileList object
		// use the 1st file from the list
		f = files[0];
		if (f == null) {
			// disable ok button
			$('.modal-open-file-browser #btn-ok').prop('disabled', true);
		} else {
			// enable ok button
			$('.modal-open-file-browser #btn-ok').prop('disabled', false);
		}
		var reader = new FileReader();
		// Closure to capture the file information.
		reader.onload = (function (theFile) {
			return function (e) {
				//console.log(e.target.result);
				workspaceData = e.target.result;
			};
		})(f);

		// Read in the image file as a data URL.
		reader.readAsText(f);
	}
	$('#btn-open').click(function() {
		// open file browser modal form
		$('.modal-open-file-browser .modal-header h4').text(LANG_OPEN_FILE);
		$('.modal-open-file-browser .modal-footer #btn-ok').text(LANG_OK);
		$('.modal-open-file-browser .modal-footer #btn-cancel').text(LANG_CANCEL);
		$('.modal-open-file-browser #insert-text').text(LANG_INSERT_MODE);
		$('.modal-open-file-browser #insert-checkbox').prop('checked', false);
		$('.modal-open-file-browser .modal-footer #btn-ok').prop('disabled', true);

		document.getElementById('customFile').addEventListener('change', handleFileSelect, false);
		//path_file = document.getElementById('customFile').value;
		$('.modal-open-file-browser').modal({
			show: true,
			keyboard: false,
			backdrop: 'static'
		});
		/*$('.modal-open-file-browser #file-list').empty();
		$.ajax({
			type: 'POST',
			url: '/listfile',
			error: function(e) {
				if (e.status != 200) {
					alertError(e);
				}
			},
			success: function(file_list) {
				// render file list
				for (var i in file_list) {
					var item = file_list[i];
					$('.modal-open-file-browser #file-list').append('<a class="list-group-item">' + item.filename + '</a>');
				}

				$('.modal-open-file-browser .modal-body .list-group .list-group-item').click(function(e) {
					if ($(e.target).hasClass('disabled')) {
						// disable ok button
						$('.modal-open-file-browser #btn-ok').prop('disabled', true);
					} else {
						// enable ok button
						$('.modal-open-file-browser #btn-ok').prop('disabled', false);
					}
					$('.modal-open-file-browser .modal-body .list-group .list-group-item').removeClass('active');
					$(e.target).addClass('active');
				});

				updateOpenFileButtons();
				$('.modal-open-file-browser').modal({
					show: true,
					keyboard: false,
					backdrop: 'static'
				});
			}
		});*/
	});

	$('#btn-delete').click(function() {
		$('.modal-delete-file-browser .modal-header h4').text(LANG_DELETE_FILE);
		$('.modal-delete-file-browser .modal-footer #btn-ok').text(LANG_OK);
		$('.modal-delete-file-browser .modal-footer #btn-cancel').text(LANG_CANCEL);

		$('.modal-delete-file-browser #file-list').empty();
		$('.modal-delete-file-browser #file-text').text('');

		$.ajax({
			type: 'POST',
			url: '/listfile',
			error: function(e) {
				if (e.status != 200) {
					alertError(e);
				}
			},
			success: function(file_list) {
				// render file list
				for (var i in file_list) {
					var item = file_list[i];
					$('.modal-delete-file-browser #file-list').append('<a class="list-group-item">' + item.filename + '</a>');
				}

				$('.modal-delete-file-browser .modal-body .list-group .list-group-item').click(function(e) {
					$('.modal-delete-file-browser #file-text').val($(e.target).text());
				});

				// show modal
				$('.modal-delete-file-browser').modal({
					show: true,
					keyboard: false,
					backdrop: 'static'
				});
			}
		});
	});
	$('#btn-build').click(function() { //////////////// ning edit
		if(sceneKV == 0 || sceneKV == 1){
			buildFunc(0);
			sceneKV = 1;
		}
	});
	
	$('#btn-buildfks').click(function() {

		if(sceneKV == 0 || sceneKV == 2){
			buildFunc(1);
			sceneKV = 2;
		}
	});
	$('#btn-buildexam').click(function() {

		if(sceneKV == 0 || sceneKV == 3){
			buildFunc(2);
			sceneKV = 3;
		}
	});
	//////////////////////////////////// ning edit
	function buildFunc(Sc){
		$('.modal-build .modal-header h4').text(LANG_BUILD);
		$('#build-ok').text(LANG_OK);
		$('.modal-build .modal-body ul').text('');
		$('.modal-build .modal-body ul').append('<li id="port_checking_li">' + LANG_PORT_CHECKING + '...</li>');

		// reset function number in current project
		Blockly.JavaScript.resetTaskNumber();
		var code_str = Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);

		// =============================================================================
		// simulator run
		// =============================================================================
		simulator.run(code_str, Sc, lang_sim);
		return;
		// =============================================================================

		//$('.modal-build.modal').modal('show'); // $('.modal-build.modal').modal('hide');
		$('.modal-build.modal').modal({
			backdrop: 'static', // protect background click
			keyboard: false,
			show: true
		});
		$('#build-ok').prop('disabled', true);

		//testbug
		//console.log(code_str);
		//return;
		
		$.ajax({
			url: '/port_list',
			type: 'POST',
			error: function(e) {
				$('#port_checking_li').text(LANG_PORT_CHECKING + '... ' + LANG_FAILED);
				$('#build-ok').prop('disabled', false);
			},
			success: function(reply) {
				// check port list
				if (reply.result.length <= 0) {
					$('#port_checking_li').text(LANG_PORT_CHECKING + '... ' + LANG_FAILED);
					$('#build-ok').prop('disabled', false);
				}
				else {
					var port_name = reply.result[0];
					$('#port_checking_li').text(LANG_PORT_CHECKING + '... ' + LANG_PASSED + ' (' + port_name + ')');
					$('.modal-build .modal-body ul').append('<li id="board_checking_li">' + LANG_BOARD_CHECKING + '...</li>');

					var wifi_ssid = sessionStorage.getItem('wifi-ssid');
					var wifi_password = sessionStorage.getItem('wifi-password');
					var enable_iot = sessionStorage.getItem('enable-iot');

					$('.modal-wifi-config input#sta-ssid').val(wifi_ssid);
					$('.modal-wifi-config input#sta-password').val(wifi_password);
					$('.modal-wifi-config #wifi-iot-checkbox').val(enable_iot);
					$.ajax({
						url: '/read_mac',
						type: 'POST',
						data: {
							port_name: port_name
						},
						error: function(e) {
							$('#board_checking_li').text(LANG_BOARD_CHECKING + '... ' + LANG_FAILED);
							$('#build-ok').prop('disabled', false);
						},
						success: function(reply) {
							var board_id = reply.board_id;
							var mac_addr = reply.mac_addr;
							$('#board_checking_li').text(LANG_BOARD_CHECKING + '... ' + LANG_PASSED + ' (' + mac_addr + ')');
							$('.modal-build .modal-body ul').append('<li id="build_li">' + LANG_BUILD + '...</li>');
							$.ajax({
								url: '/build',
								type: 'POST',
								data: {
									board_id: board_id,
									mac_addr: mac_addr,
									code: b64EncodeUnicode(code_str),
									// NETPIE Config Data
									sta_ssid: wifi_ssid,
									sta_password: wifi_password,
									enable_iot: enable_iot,
								},
								dataType: 'json',
								error: function(e) {
									$('#build_li').text(LANG_BUILD + '... ' + LANG_FAILED);
									$('#build-ok').prop('disabled', false);
								},
								success: function(reply) {
									$('#build_li').text(LANG_BUILD + '... ' + LANG_PASSED);
									$('.modal-build .modal-body ul').append('<li id="program_li">' + LANG_BOARD_FLASHING + '...</li>');

									$.ajax({
										url: '/program',
										type: 'POST',
										data: {
											board_id: board_id,
											mac_addr: mac_addr,
											port_name: port_name
										},
										dataType: 'json',
										error: function(e) {
											$('#program_li').text(LANG_BOARD_FLASHING + '... ' + LANG_FAILED);
											$('#build-ok').prop('disabled', false);
										},
										success: function(reply) {
											$('#program_li').text(LANG_BOARD_FLASHING + '... ' + LANG_PASSED);
											$('#build-ok').prop('disabled', false);
										}
									});

								}
							});

						}
					});
				}

			}
		});        
	}

	$('#btn-ex1').click(function() {
		
		$('.modal-panel-ex1 .modal-header h4').text(LANG_Primary4_H);
		//$('.modal-panel-ex1 .modal-footer #btn-ok').text(LANG_OK_EX);
		$('.modal-panel-ex1 .modal-footer #btn-cancel').text(LANG_CANCEL_EX);
		$('.modal-panel-ex1 #insert-Primary4-Act1-text').text(LANG_Primary4_Act1);
		$('.modal-panel-ex1 #insert-Primary4-Act2-text').text(LANG_Primary4_Act2);
		$('.modal-panel-ex1 #insert-Primary4-Act3-text').text(LANG_Primary4_Act3);
		$('.modal-panel-ex1 #insert-Primary4-Act4-text').text(LANG_Primary4_Act4);
		$('.modal-panel-ex1 #insert-Primary4-Act5-text').text(LANG_Primary4_Act5);
		$('.modal-panel-ex1 #insert-Primary4-Act6-text').text(LANG_Primary4_Act6);
		$('.modal-panel-ex1 #insert-Primary4-Act7-text').text(LANG_Primary4_Act7);
		$('.modal-panel-ex1').modal({
			show: true,
			keyboard: false,
			backdrop: 'static'
		});
	});
	$('#btn-ex2').click(function() {
		$('.modal-panel-ex2 .modal-header h4').text(LANG_EX2_FILE);
		$('.modal-panel-ex2 .modal-footer #btn-ok').text(LANG_OK_EX);
		$('.modal-panel-ex2 .modal-footer #btn-cancel').text(LANG_CANCEL_EX);
		$('.modal-panel-ex2 #insert-text').text(LANG_EX2_MODE);
		$('.modal-panel-ex2').modal({
			show: true,
			keyboard: false,
			backdrop: 'static'
		});
	});
	$('#btn-ex3').click(function() {
		$('.modal-panel-ex3 .modal-header h4').text(LANG_EX3_FILE);
		$('.modal-panel-ex3 .modal-footer #btn-ok').text(LANG_OK_EX);
		$('.modal-panel-ex3 .modal-footer #btn-cancel').text(LANG_CANCEL_EX);
		$('.modal-panel-ex3 #insert-text').text(LANG_EX3_MODE);
		$('.modal-panel-ex3').modal({
			show: true,
			keyboard: false,
			backdrop: 'static'
		});
	});
	$('#btn-exam').click(function() {
		$('.modal-exam .modal-header h4').text(LANG_EXAM_FILE);
		$('.modal-exam .modal-footer #btn-ok').text(LANG_OK_EXAM);
		$('.modal-exam .modal-footer #btn-cancel').text(LANG_CANCEL_EXAM);
		$('.modal-exam #insert-text').text(LANG_EXAM_MODE);
		$('.modal-exam').modal({
			show: true,
			keyboard: false,
			backdrop: 'static'
		});
	});
	$('#btn-practice').click(function() {
		$('.modal-practice .modal-header h4').text(LANG_PRAC_FILE);
		$('.modal-practice .modal-footer #btn-ok').text(LANG_OK_PRAC);
		$('.modal-practice .modal-footer #btn-cancel').text(LANG_CANCEL_PRAC);
		$('.modal-practice #insert-text').text(LANG_PRAC_MODE);
		$('.modal-practice').modal({
			show: true,
			keyboard: false,
			backdrop: 'static'
		});
	});

	$('.modal-panel-ex1 #pri4-select1').click(function() {
		$('.modal-panel-ex1').modal('hide');
	});
	$('.modal-panel-ex1 #pri4-select2').click(function() {
		$('.modal-panel-ex1').modal('hide');
	});
	$('.modal-panel-ex1 #pri4-select3').click(function() {
		$('.modal-panel-ex1').modal('hide');
		workspaceData = 'PHhtbCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCI+PHZhcmlhYmxlcz48L3ZhcmlhYmxlcz48YmxvY2sgdHlwZT0iYmFzaWNfZm9yZXZlciIgaWQ9ImR4RERYdnhnOjdmOlBScUoheiQpIiB4PSIyNjMiIHk9Ii00MzciPjxzdGF0ZW1lbnQgbmFtZT0iSEFORExFUiI+PGJsb2NrIHR5cGU9ImJhc2ljX2xlZDE2eDgiIGlkPSIlZUExZyQxZCs7UnhkdG9VRjpvKyI+PGZpZWxkIG5hbWU9IlBPU19YMF9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZNyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1k3Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1k2Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1k2Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1k2Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1k2Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1k0Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1k0Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZNCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZNCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTIiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTIiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTIiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZMiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZMiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZMiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZMSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZMSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZMSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZMSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZMSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZMSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTAiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1kwIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZMCI+RkFMU0U8L2ZpZWxkPjxuZXh0PjxibG9jayB0eXBlPSJiYXNpY19kZWxheSIgaWQ9ImQ6bl9Xe1daVlBZLkQhYVB1WyF5Ij48ZmllbGQgbmFtZT0iVkFMVUUiPjAuNTwvZmllbGQ+PG5leHQ+PGJsb2NrIHR5cGU9ImJhc2ljX2xlZDE2eDgiIGlkPSJ+c1MseEs5cGtvPS5KTihaaGJwOyI+PGZpZWxkIG5hbWU9IlBPU19YMF9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1k3Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTciPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTYiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTYiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTYiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTYiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZNSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZNSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZNSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZNSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZNSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZNSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZNCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZNCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1k0Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZNCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTMiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTMiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTMiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTMiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTMiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTMiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTMiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZMiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZMiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZMiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1kyIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1kyIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZMiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1kxIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1kxIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1kxIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1kxIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1kxIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1kxIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZMCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTAiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZMCI+RkFMU0U8L2ZpZWxkPjxuZXh0PjxibG9jayB0eXBlPSJiYXNpY19kZWxheSIgaWQ9IixDSU9sSUNOJHJQKyhIe2B4YShoIj48ZmllbGQgbmFtZT0iVkFMVUUiPjAuNTwvZmllbGQ+PG5leHQ+PGJsb2NrIHR5cGU9ImJhc2ljX2xlZDE2eDgiIGlkPSJVdVVeWyQ7eih3OnRiTVVwPytLXSI+PGZpZWxkIG5hbWU9IlBPU19YMF9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTciPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTciPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZNiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZNiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZNiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTYiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1k1Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1k1Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1k1Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1k1Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZNSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1k0Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1k0Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZNCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZNCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZNCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZMyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZMyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZMyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZMyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZMyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTMiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZMyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1kyIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1kyIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1kyIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1kyIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZMiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTIiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTEiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTEiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTEiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTEiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1kxIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZMSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1kwIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1kwIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZMCI+RkFMU0U8L2ZpZWxkPjxuZXh0PjxibG9jayB0eXBlPSJiYXNpY19kZWxheSIgaWQ9IipUYCF0S3RNXmsxVl9KSnolbSVnIj48ZmllbGQgbmFtZT0iVkFMVUUiPjAuNTwvZmllbGQ+PG5leHQ+PGJsb2NrIHR5cGU9ImJhc2ljX2xlZDE2eDgiIGlkPSJALiQzXlpHVH03ZyU7K1dPI2FIeSI+PGZpZWxkIG5hbWU9IlBPU19YMF9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZNyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1k3Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1k2Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZNiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTYiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1k2Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1k1Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZNSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1k1Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZNCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1k0Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZMyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTMiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZMyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTMiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTIiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTIiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTIiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZMiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTIiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1kyIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZMSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZMSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTEiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1kxIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZMSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTEiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTAiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZMCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZMCI+RkFMU0U8L2ZpZWxkPjxuZXh0PjxibG9jayB0eXBlPSJiYXNpY19kZWxheSIgaWQ9IjNbKEgqMkpVI0hZOi1CQ30uOC5+Ij48ZmllbGQgbmFtZT0iVkFMVUUiPjAuNTwvZmllbGQ+PC9ibG9jaz48L25leHQ+PC9ibG9jaz48L25leHQ+PC9ibG9jaz48L25leHQ+PC9ibG9jaz48L25leHQ+PC9ibG9jaz48L25leHQ+PC9ibG9jaz48L25leHQ+PC9ibG9jaz48L25leHQ+PC9ibG9jaz48L3N0YXRlbWVudD48L2Jsb2NrPjwveG1sPg==';
		Blockly.mainWorkspace.clear();
		// load with new file
		var xml = Blockly.Xml.textToDom(b64DecodeUnicode(workspaceData));
		Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
	});
	$('.modal-panel-ex1 #pri4-select4').click(function() {
		$('.modal-panel-ex1').modal('hide');
	});
	$('.modal-panel-ex1 #pri4-select5').click(function() {
		$('.modal-panel-ex1').modal('hide');
	});
	$('.modal-panel-ex1 #pri4-select6').click(function() {
		$('.modal-panel-ex1').modal('hide');
	});
	$('.modal-panel-ex1 #pri4-select7').click(function() {
		$('.modal-panel-ex1').modal('hide');
	});

	$('.modal-panel-ex1 #btn-ok').click(function() {
		$('.modal-panel-ex1').modal('hide');
		workspaceData = 'PHhtbCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCI+PHZhcmlhYmxlcz48L3ZhcmlhYmxlcz48YmxvY2sgdHlwZT0iYmFzaWNfZm9yZXZlciIgaWQ9ImR4RERYdnhnOjdmOlBScUoheiQpIiB4PSIyNjMiIHk9Ii00MzciPjxzdGF0ZW1lbnQgbmFtZT0iSEFORExFUiI+PGJsb2NrIHR5cGU9ImJhc2ljX2xlZDE2eDgiIGlkPSIlZUExZyQxZCs7UnhkdG9VRjpvKyI+PGZpZWxkIG5hbWU9IlBPU19YMF9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZNyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1k3Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1k2Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1k2Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1k2Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1k2Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1k0Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1k0Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZNCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZNCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTIiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTIiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTIiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZMiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZMiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZMiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZMSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZMSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZMSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZMSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZMSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZMSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTAiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1kwIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZMCI+RkFMU0U8L2ZpZWxkPjxuZXh0PjxibG9jayB0eXBlPSJiYXNpY19kZWxheSIgaWQ9ImQ6bl9Xe1daVlBZLkQhYVB1WyF5Ij48ZmllbGQgbmFtZT0iVkFMVUUiPjAuNTwvZmllbGQ+PG5leHQ+PGJsb2NrIHR5cGU9ImJhc2ljX2xlZDE2eDgiIGlkPSJ+c1MseEs5cGtvPS5KTihaaGJwOyI+PGZpZWxkIG5hbWU9IlBPU19YMF9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1k3Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTciPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTYiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTYiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTYiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTYiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZNSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZNSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZNSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZNSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZNSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZNSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZNCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZNCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1k0Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZNCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTMiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTMiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTMiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTMiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTMiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTMiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTMiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZMiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZMiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZMiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1kyIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1kyIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZMiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1kxIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1kxIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1kxIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1kxIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1kxIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1kxIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZMCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTAiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZMCI+RkFMU0U8L2ZpZWxkPjxuZXh0PjxibG9jayB0eXBlPSJiYXNpY19kZWxheSIgaWQ9IixDSU9sSUNOJHJQKyhIe2B4YShoIj48ZmllbGQgbmFtZT0iVkFMVUUiPjAuNTwvZmllbGQ+PG5leHQ+PGJsb2NrIHR5cGU9ImJhc2ljX2xlZDE2eDgiIGlkPSJVdVVeWyQ7eih3OnRiTVVwPytLXSI+PGZpZWxkIG5hbWU9IlBPU19YMF9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTciPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTciPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZNiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZNiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZNiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTYiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1k1Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1k1Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1k1Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1k1Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZNSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1k0Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1k0Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZNCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZNCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZNCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZMyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZMyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZMyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZMyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZMyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTMiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZMyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1kyIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1kyIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1kyIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1kyIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZMiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTIiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTEiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTEiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTEiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTEiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1kxIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZMSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1kwIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1kwIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZMCI+RkFMU0U8L2ZpZWxkPjxuZXh0PjxibG9jayB0eXBlPSJiYXNpY19kZWxheSIgaWQ9IipUYCF0S3RNXmsxVl9KSnolbSVnIj48ZmllbGQgbmFtZT0iVkFMVUUiPjAuNTwvZmllbGQ+PG5leHQ+PGJsb2NrIHR5cGU9ImJhc2ljX2xlZDE2eDgiIGlkPSJALiQzXlpHVH03ZyU7K1dPI2FIeSI+PGZpZWxkIG5hbWU9IlBPU19YMF9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZNyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1k3Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1k2Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZNiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTYiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1k2Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1k1Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZNSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1k1Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZNCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1k0Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZMyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTMiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZMyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTMiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTIiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTIiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTIiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZMiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTIiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1kyIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZMSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZMSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTEiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1kxIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZMSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTEiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTAiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZMCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZMCI+RkFMU0U8L2ZpZWxkPjxuZXh0PjxibG9jayB0eXBlPSJiYXNpY19kZWxheSIgaWQ9IjNbKEgqMkpVI0hZOi1CQ30uOC5+Ij48ZmllbGQgbmFtZT0iVkFMVUUiPjAuNTwvZmllbGQ+PC9ibG9jaz48L25leHQ+PC9ibG9jaz48L25leHQ+PC9ibG9jaz48L25leHQ+PC9ibG9jaz48L25leHQ+PC9ibG9jaz48L25leHQ+PC9ibG9jaz48L25leHQ+PC9ibG9jaz48L25leHQ+PC9ibG9jaz48L3N0YXRlbWVudD48L2Jsb2NrPjwveG1sPg==';
		Blockly.mainWorkspace.clear();
		// load with new file
		var xml = Blockly.Xml.textToDom(b64DecodeUnicode(workspaceData));
		Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
	});

	$('.modal-panel-ex2 #btn-ok').click(function() {
		ok_ex2();
		$('.modal-panel-ex2').modal('hide');
	});
	function ok_ex2() {
		workspaceData = 'PHhtbCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCI+PHZhcmlhYmxlcz48L3ZhcmlhYmxlcz48YmxvY2sgdHlwZT0iYmFzaWNfZm9yZXZlciIgaWQ9IjJbaU97ZFclPztxKW8kdWFhRHkpIiB4PSIzMTMiIHk9IjExMiI+PHN0YXRlbWVudCBuYW1lPSJIQU5ETEVSIj48YmxvY2sgdHlwZT0iY29udHJvbHNfaWYiIGlkPSI5Ly1EbG43RmRRKispO2lPfVMvMiI+PG11dGF0aW9uIGVsc2VpZj0iMSIgZWxzZT0iMSI+PC9tdXRhdGlvbj48dmFsdWUgbmFtZT0iSUYwIj48YmxvY2sgdHlwZT0ibG9naWNfc3cxX3ByZXNzZWQiIGlkPSJEezI1UVpxT2gtME1kMCtXKTZ2SSI+PC9ibG9jaz48L3ZhbHVlPjxzdGF0ZW1lbnQgbmFtZT0iRE8wIj48YmxvY2sgdHlwZT0iYmFzaWNfbGVkMTZ4OCIgaWQ9Inl3eEZqQ3Z7aF5+JXtpWXElYShAIj48ZmllbGQgbmFtZT0iUE9TX1gwX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1k3Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZNyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTYiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTYiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1k2Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZNiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1k1Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZMyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZMiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1kyIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1kxIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1kxIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZMSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZMCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZMCI+RkFMU0U8L2ZpZWxkPjwvYmxvY2s+PC9zdGF0ZW1lbnQ+PHZhbHVlIG5hbWU9IklGMSI+PGJsb2NrIHR5cGU9ImxvZ2ljX3N3Ml9wcmVzc2VkIiBpZD0ibi5uflhHazVlQGIuR2FwQW04dG8iPjwvYmxvY2s+PC92YWx1ZT48c3RhdGVtZW50IG5hbWU9IkRPMSI+PGJsb2NrIHR5cGU9ImJhc2ljX2xlZDE2eDgiIGlkPSJLNERWVlVMeltCaUoyKU1CK2N0RSI+PGZpZWxkIG5hbWU9IlBPU19YMF9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZNyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTciPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTYiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTYiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTYiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1k2Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZNiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTYiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1k1Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1k1Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1k1Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1k1Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1k1Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZNSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1k0Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1k0Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1k0Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1k0Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1k0Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZNCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZMyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZMyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZMyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZMyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTMiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZMiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZMiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZMiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1kxIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZMCI+RkFMU0U8L2ZpZWxkPjwvYmxvY2s+PC9zdGF0ZW1lbnQ+PHN0YXRlbWVudCBuYW1lPSJFTFNFIj48YmxvY2sgdHlwZT0iYmFzaWNfbGVkMTZ4OCIgaWQ9InxdNCUyeyo6USN5U05JTDJhSCk/Ij48ZmllbGQgbmFtZT0iUE9TX1gwX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZNyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZNiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZNiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZNiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZNiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZNiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTYiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1k2Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZNiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1k1Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1k1Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZNSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1k0Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1k0Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZNCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1k0Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZNCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTMiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZMyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1kyIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTIiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1kyIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZMiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1kxIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTEiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1kxIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZMSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1kwIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZMCI+RkFMU0U8L2ZpZWxkPjwvYmxvY2s+PC9zdGF0ZW1lbnQ+PC9ibG9jaz48L3N0YXRlbWVudD48L2Jsb2NrPjwveG1sPg==';
		Blockly.mainWorkspace.clear();
		// load with new file
		var xml = Blockly.Xml.textToDom(b64DecodeUnicode(workspaceData));
		Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
	}
	$('.modal-panel-ex3 #btn-ok').click(function() {
		ok_ex3();
		$('.modal-panel-ex3').modal('hide');
	});
	function ok_ex3() {
		workspaceData = 'PHhtbCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCI+PHZhcmlhYmxlcz48dmFyaWFibGUgdHlwZT0iIiBpZD0iL3UlaWZGJSVINkAzQ3FNM1JeQjgiPng8L3ZhcmlhYmxlPjwvdmFyaWFibGVzPjxibG9jayB0eXBlPSJtYXRoX3ZhcmlhYmxlc19zZXQiIGlkPSIlNU4yYGpeRisuWXRQa3BhIUNhZyIgeD0iLTQxMyIgeT0iLTg4Ij48ZmllbGQgbmFtZT0iVkFSIiBpZD0iL3UlaWZGJSVINkAzQ3FNM1JeQjgiIHZhcmlhYmxldHlwZT0iIj54PC9maWVsZD48dmFsdWUgbmFtZT0iVkFMVUUiPjxibG9jayB0eXBlPSJtYXRoX251bWJlciIgaWQ9Im1RRnxfNkkoZj90Nk1mQSwtOnhiIj48ZmllbGQgbmFtZT0iVkFMVUUiPjA8L2ZpZWxkPjwvYmxvY2s+PC92YWx1ZT48bmV4dD48YmxvY2sgdHlwZT0iYmFzaWNfZm9yZXZlciIgaWQ9IlZlNl1PRyghMnlmSzhme0tQck5TIj48c3RhdGVtZW50IG5hbWU9IkhBTkRMRVIiPjxibG9jayB0eXBlPSJjb250cm9sc19pZiIgaWQ9IlVUKklGWH01Q0s/czQ3ZSojNiQjIj48dmFsdWUgbmFtZT0iSUYwIj48YmxvY2sgdHlwZT0ibG9naWNfc3cxX3ByZXNzZWQiIGlkPSJCYWV6IUVXYV1+d3hIZ2JmMGhzVCI+PC9ibG9jaz48L3ZhbHVlPjxzdGF0ZW1lbnQgbmFtZT0iRE8wIj48YmxvY2sgdHlwZT0ibWF0aF92YXJpYWJsZXNfc2V0IiBpZD0iNElBOmk6XlI/blsvRFk/WVM2fXoiPjxmaWVsZCBuYW1lPSJWQVIiIGlkPSIvdSVpZkYlJUg2QDNDcU0zUl5COCIgdmFyaWFibGV0eXBlPSIiPng8L2ZpZWxkPjx2YWx1ZSBuYW1lPSJWQUxVRSI+PGJsb2NrIHR5cGU9Im1hdGhfcmFuZG9tX2ludCIgaWQ9Ij96Kld2aEpZMDghZXIrWWA0UDVfIj48ZmllbGQgbmFtZT0iRlJPTSI+MDwvZmllbGQ+PGZpZWxkIG5hbWU9IlRPIj4xMDA8L2ZpZWxkPjwvYmxvY2s+PC92YWx1ZT48L2Jsb2NrPjwvc3RhdGVtZW50PjxuZXh0PjxibG9jayB0eXBlPSJjb250cm9sc19pZiIgaWQ9IkdwKSMtWzI9X3t2ST14enZecSx2Ij48bXV0YXRpb24gZWxzZWlmPSIyIiBlbHNlPSIxIj48L211dGF0aW9uPjx2YWx1ZSBuYW1lPSJJRjAiPjxibG9jayB0eXBlPSJsb2dpY19jb21wYXJlIiBpZD0iezNEaW1mRzl6OEsqZklUbj9WSDQiPjxmaWVsZCBuYW1lPSJPUCI+TFQ8L2ZpZWxkPjx2YWx1ZSBuYW1lPSJBIj48YmxvY2sgdHlwZT0ibWF0aF92YXJpYWJsZXNfZ2V0IiBpZD0iaEUjLGVaanlxcTJHfntoYHcvVTIiPjxmaWVsZCBuYW1lPSJWQVIiIGlkPSIvdSVpZkYlJUg2QDNDcU0zUl5COCIgdmFyaWFibGV0eXBlPSIiPng8L2ZpZWxkPjwvYmxvY2s+PC92YWx1ZT48dmFsdWUgbmFtZT0iQiI+PGJsb2NrIHR5cGU9Im1hdGhfbnVtYmVyIiBpZD0iV2o2dyQ2bkU7ZUs3I08/fS5ZPXoiPjxmaWVsZCBuYW1lPSJWQUxVRSI+MjU8L2ZpZWxkPjwvYmxvY2s+PC92YWx1ZT48L2Jsb2NrPjwvdmFsdWU+PHN0YXRlbWVudCBuYW1lPSJETzAiPjxibG9jayB0eXBlPSJiYXNpY19sZWQxNng4IiBpZD0iKWJiSzJTNWxzXUxULUhIL2w4MWIiPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTciPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTciPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTciPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTciPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZNiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1k2Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1k1Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZNCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZMyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZMyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZMyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZMiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTIiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTIiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTIiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTIiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTIiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1kxIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTEiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1kwIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1kwIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1kwIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1kwIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTAiPkZBTFNFPC9maWVsZD48L2Jsb2NrPjwvc3RhdGVtZW50Pjx2YWx1ZSBuYW1lPSJJRjEiPjxibG9jayB0eXBlPSJsb2dpY19vcGVyYXRpb24iIGlkPSJfR0AxWjhsVFAwR0VWc0psZlVhNCI+PGZpZWxkIG5hbWU9Ik9QIj5BTkQ8L2ZpZWxkPjx2YWx1ZSBuYW1lPSJBIj48YmxvY2sgdHlwZT0ibG9naWNfY29tcGFyZSIgaWQ9Inx5OnZtaDZFVD9lTHpzW1NyYHNAIj48ZmllbGQgbmFtZT0iT1AiPkdURTwvZmllbGQ+PHZhbHVlIG5hbWU9IkEiPjxibG9jayB0eXBlPSJtYXRoX3ZhcmlhYmxlc19nZXQiIGlkPSIpcl55X3dCei9SXjhwbXZTJWkyUCI+PGZpZWxkIG5hbWU9IlZBUiIgaWQ9Ii91JWlmRiUlSDZAM0NxTTNSXkI4IiB2YXJpYWJsZXR5cGU9IiI+eDwvZmllbGQ+PC9ibG9jaz48L3ZhbHVlPjx2YWx1ZSBuYW1lPSJCIj48YmxvY2sgdHlwZT0ibWF0aF9udW1iZXIiIGlkPSJhcTIwczF0LSpUaD19Ri06akk4eiI+PGZpZWxkIG5hbWU9IlZBTFVFIj4yNTwvZmllbGQ+PC9ibG9jaz48L3ZhbHVlPjwvYmxvY2s+PC92YWx1ZT48dmFsdWUgbmFtZT0iQiI+PGJsb2NrIHR5cGU9ImxvZ2ljX2NvbXBhcmUiIGlkPSJFYUlgaUdiOVVVbHBMYDtCMV1KJCI+PGZpZWxkIG5hbWU9Ik9QIj5MVDwvZmllbGQ+PHZhbHVlIG5hbWU9IkEiPjxibG9jayB0eXBlPSJtYXRoX3ZhcmlhYmxlc19nZXQiIGlkPSJeeXoqfi1rQ2ViblNpSD8zWEtTdiI+PGZpZWxkIG5hbWU9IlZBUiIgaWQ9Ii91JWlmRiUlSDZAM0NxTTNSXkI4IiB2YXJpYWJsZXR5cGU9IiI+eDwvZmllbGQ+PC9ibG9jaz48L3ZhbHVlPjx2YWx1ZSBuYW1lPSJCIj48YmxvY2sgdHlwZT0ibWF0aF9udW1iZXIiIGlkPSJHI1lLR3g5QSptYiU3VzZVcC9VNyI+PGZpZWxkIG5hbWU9IlZBTFVFIj41MDwvZmllbGQ+PC9ibG9jaz48L3ZhbHVlPjwvYmxvY2s+PC92YWx1ZT48L2Jsb2NrPjwvdmFsdWU+PHN0YXRlbWVudCBuYW1lPSJETzEiPjxibG9jayB0eXBlPSJiYXNpY19sZWQxNng4IiBpZD0iSF0/T2p3SC5XYD1DfUQuMC5GZXAiPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTciPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTciPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTciPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTciPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZNiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1k2Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1k1Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZNCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZMyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZMyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZMiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTIiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZMiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZMiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTEiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1kxIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1kxIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTEiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1kwIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1kwIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1kwIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1kwIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTAiPkZBTFNFPC9maWVsZD48L2Jsb2NrPjwvc3RhdGVtZW50Pjx2YWx1ZSBuYW1lPSJJRjIiPjxibG9jayB0eXBlPSJsb2dpY19vcGVyYXRpb24iIGlkPSIpbi9nKElTezZqISExN1o6U3BySSI+PGZpZWxkIG5hbWU9Ik9QIj5BTkQ8L2ZpZWxkPjx2YWx1ZSBuYW1lPSJBIj48YmxvY2sgdHlwZT0ibG9naWNfY29tcGFyZSIgaWQ9Iix3UlQ0cyNfNC5gWmN8UWY5OD9KIj48ZmllbGQgbmFtZT0iT1AiPkdURTwvZmllbGQ+PHZhbHVlIG5hbWU9IkEiPjxibG9jayB0eXBlPSJtYXRoX3ZhcmlhYmxlc19nZXQiIGlkPSJVWEI9NEZ2cz0jTz1VQj1vNl91UCI+PGZpZWxkIG5hbWU9IlZBUiIgaWQ9Ii91JWlmRiUlSDZAM0NxTTNSXkI4IiB2YXJpYWJsZXR5cGU9IiI+eDwvZmllbGQ+PC9ibG9jaz48L3ZhbHVlPjx2YWx1ZSBuYW1lPSJCIj48YmxvY2sgdHlwZT0ibWF0aF9udW1iZXIiIGlkPSJlMX5VMXJ9MmYqfD9PV15tQWtjKiI+PGZpZWxkIG5hbWU9IlZBTFVFIj41MDwvZmllbGQ+PC9ibG9jaz48L3ZhbHVlPjwvYmxvY2s+PC92YWx1ZT48dmFsdWUgbmFtZT0iQiI+PGJsb2NrIHR5cGU9ImxvZ2ljX2NvbXBhcmUiIGlkPSJOT1tsd2NyLlV5TVB0YkYubWVaSSI+PGZpZWxkIG5hbWU9Ik9QIj5MVDwvZmllbGQ+PHZhbHVlIG5hbWU9IkEiPjxibG9jayB0eXBlPSJtYXRoX3ZhcmlhYmxlc19nZXQiIGlkPSI4em9TLUt1cDgqaEkqPSl2U31bUSI+PGZpZWxkIG5hbWU9IlZBUiIgaWQ9Ii91JWlmRiUlSDZAM0NxTTNSXkI4IiB2YXJpYWJsZXR5cGU9IiI+eDwvZmllbGQ+PC9ibG9jaz48L3ZhbHVlPjx2YWx1ZSBuYW1lPSJCIj48YmxvY2sgdHlwZT0ibWF0aF9udW1iZXIiIGlkPSIsOSl6LC1aNU9DLStVMndVR0kwciI+PGZpZWxkIG5hbWU9IlZBTFVFIj43NTwvZmllbGQ+PC9ibG9jaz48L3ZhbHVlPjwvYmxvY2s+PC92YWx1ZT48L2Jsb2NrPjwvdmFsdWU+PHN0YXRlbWVudCBuYW1lPSJETzIiPjxibG9jayB0eXBlPSJiYXNpY19sZWQxNng4IiBpZD0iMnZ1JUV6OlFudCU2KE5nRjZTUWoiPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTciPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTciPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTciPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTciPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZNiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1k2Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1k1Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1k0Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTMiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZMyI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTJfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxM19ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE0X1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTVfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gwX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMV9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDJfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gzX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNF9ZMiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1kyIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZMSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1kxIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZMCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZMCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZMCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZMCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1kwIj5GQUxTRTwvZmllbGQ+PC9ibG9jaz48L3N0YXRlbWVudD48c3RhdGVtZW50IG5hbWU9IkVMU0UiPjxibG9jayB0eXBlPSJiYXNpY19sZWQxNng4IiBpZD0ifFcjd0kkVzVrK0Z2OSNmR1N0ZzQiPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTciPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTciPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDhfWTciPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTciPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1k3Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTciPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZNyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZNiI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1k2Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTYiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZNiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1k2Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1k1Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDlfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTUiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTUiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZNSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1k1Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDZfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1k0Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1k0Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTQiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1k0Ij5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1k0Ij5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTQiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZNCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1kzIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTFfWTMiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTMiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZMyI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1kzIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTIiPlRSVUU8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDVfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g2X1kyIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g3X1kyIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1kyIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g5X1kyIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMF9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDExX1kyIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMl9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEzX1kyIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTRfWTIiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNV9ZMiI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDBfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxX1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMl9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDNfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g0X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNV9ZMSI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDdfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g4X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEwX1kxIj5UUlVFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTEiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZMSI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1kxIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMF9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDFfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gyX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YM19ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDRfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1g1X1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YNl9ZMCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YN19ZMCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOF9ZMCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YOV9ZMCI+VFJVRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTBfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxMV9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDEyX1kwIj5GQUxTRTwvZmllbGQ+PGZpZWxkIG5hbWU9IlBPU19YMTNfWTAiPkZBTFNFPC9maWVsZD48ZmllbGQgbmFtZT0iUE9TX1gxNF9ZMCI+RkFMU0U8L2ZpZWxkPjxmaWVsZCBuYW1lPSJQT1NfWDE1X1kwIj5GQUxTRTwvZmllbGQ+PC9ibG9jaz48L3N0YXRlbWVudD48L2Jsb2NrPjwvbmV4dD48L2Jsb2NrPjwvc3RhdGVtZW50PjwvYmxvY2s+PC9uZXh0PjwvYmxvY2s+PC94bWw+';
		Blockly.mainWorkspace.clear();
		// load with new file
		var xml = Blockly.Xml.textToDom(b64DecodeUnicode(workspaceData));
		Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
	}
	function ok_exam() {

		$('.modal-exam-question .modal-header h4').text(LANG_EXAM_Q1_FILE);
		$('.modal-exam-question .modal-footer #btn-ok').text(LANG_CODE_EXAM_Q);
		$('.modal-exam-question .modal-footer #btn-cancel').text(LANG_SKIP_EXAM_Q);
		$('.modal-exam-question #insert-text').text(LANG_EXAM_Q1_MODE);
		$('.modal-exam-question').modal({
			show: true,
			keyboard: false,
			backdrop: 'static'
		});
	}
	$('.modal-exam #btn-ok').click(function() {
		ok_exam();
		$('.modal-exam').modal('hide');
	});
	$('.modal-exam-ques-1 #btn-ok').click(function() {

		$('.modal-exam-ques-1').modal('hide');
	});
	$('.modal-practice #btn-ok').click(function() {
		//ok_exam();
		$('.modal-practice').modal('hide');
	});
	///////////////////////////////////
	function setting_clock(clock_str) {
		$('.modal-setting-clock .modal-header h4').text(LANG_SETCLOCK);
		$('.modal-setting-clock #setting-clock-ok').text(LANG_OK);
		$('.modal-setting-clock .modal-body ul').text('');
		$('.modal-setting-clock .modal-body ul').append('<li id="port_checking_li">' + LANG_PORT_CHECKING + '...</li>');

		$('.modal-setting-clock.modal').modal({
			backdrop: 'static', // protect background click
			keyboard: false,
			show: true
		});
		$('.modal-setting-clock #setting-clock-ok').prop('disabled', true);

		$.ajax({
			url: '/port_list',
			type: 'POST',
			error: function(e) {
				$('.modal-setting-clock #port_checking_li').text(LANG_PORT_CHECKING + '... ' + LANG_FAILED);
				$('.modal-setting-clock #setting-clock-ok').prop('disabled', false);
			},
			success: function(reply) {
				// check port list
				if (reply.result.length <= 0) {
					$('.modal-setting-clock #port_checking_li').text(LANG_PORT_CHECKING + '... ' + LANG_FAILED);
					$('.modal-setting-clock #setting-clock-ok').prop('disabled', false);
				}
				else {
					var port_name = reply.result[0];
					$('.modal-setting-clock #port_checking_li').text(LANG_PORT_CHECKING + '... ' + LANG_PASSED + ' (' + port_name + ')');
					$('.modal-setting-clock .modal-body ul').append('<li id="setting_clock_li">' + LANG_SETTING_CLOCK + '...</li>');

					$.ajax({
						url: '/setclock',
						type: 'POST',
						data: {
							port_name: port_name,
							datetime: clock_str
						},
						dataType: 'json',
						error: function(e) {
							$('.modal-setting-clock #setting_clock_li').text(LANG_SETTING_CLOCK + '... ' + LANG_FAILED);
							$('.modal-setting-clock #setting-clock-ok').prop('disabled', false);
							$('.modal-set-clock').modal('hide');
						},
						success: function(reply) {
							$('.modal-setting-clock #setting_clock_li').text(LANG_SETTING_CLOCK + '... ' + LANG_PASSED);
							$('.modal-setting-clock #setting-clock-ok').prop('disabled', false);
							$('.modal-set-clock').modal('hide');
						}
					});

				}
			}
		});
	}

	$('#btn-setclock').click(function() {
		// open file browser modal form
		$('.modal-set-clock .modal-header h4').text(LANG_SETCLOCK);
		$('.modal-set-clock .modal-footer #btn-ok').text(LANG_OK);
		$('.modal-set-clock .modal-footer #btn-cancel').text(LANG_CANCEL);

		// sub7 available only on KidBrightOS version
		if (!standalone) {
			var dttm_sub7 = moment().subtract(7, 'hours');
			$('.modal-set-clock #button-sub7').text(dttm_sub7.format('DD/MM/YYYY HH:mm:ss'));
			$('#div-sub7').css('display', 'block');
		}
		else {
			$('#div-sub7').css('display', 'none');
		}

		var dttm_zero = moment();
		$('.modal-set-clock #button-zero').text(dttm_zero.format('DD/MM/YYYY HH:mm:ss'));

		// show set-clock modal
		$('.modal-set-clock').modal({
			show: true,
			keyboard: false,
			backdrop: 'static'
		});
	});

	$('.modal-set-clock #button-sub7').click(function() {
		var dttm_sub7 = moment($('.modal-set-clock #button-sub7').text(), 'DD/MM/YYYY HH:mm:ss');
		var dttm_sub7_serial = dttm_sub7.format('YYMMDD0eHHmmss');
		setting_clock(dttm_sub7_serial);
	});

	$('.modal-set-clock #button-zero').click(function() {
		var dttm_zero = moment($('.modal-set-clock #button-zero').text(), 'DD/MM/YYYY HH:mm:ss');
		var dttm_zero_serial = dttm_zero.format('YYMMDD0eHHmmss');
		setting_clock(dttm_zero_serial);
	});
	// =========================================================================
	// set wifi connection modal form
	// =========================================================================
	$('#wifi-build-ok').click(function(){
		if (typeof(sessionStorage.getItem('wifi-ssid')) !== 'undefined'){
			sessionStorage.setItem('wifi-ssid', $('.modal-wifi-config input#sta-ssid').val());
		}
		if (typeof(sessionStorage.getItem('wifi-password')) !== 'undefined'){
			sessionStorage.setItem('wifi-password', $('.modal-wifi-config input#sta-password').val());
		}
		if (typeof(sessionStorage.getItem('enable-iot')) !== 'undefined'){
			if ($('.modal-wifi-config #wifi-iot-checkbox').prop('checked') == false){
				sessionStorage.setItem('enable-iot', false);
			}
			else{
				sessionStorage.setItem('enable-iot', true);
			}
		}
	});
	$('#btn-wifi-config').click(function() {
		$('.modal-wifi-config #wifi-iot-text').text(LANG_IOT_MODE);
		$('.modal-wifi-config input#sta-ssid').val(sessionStorage.getItem('wifi-ssid'));
		$('.modal-wifi-config input#sta-password').val(sessionStorage.getItem('wifi-password'));
		if (sessionStorage.getItem('enable-iot') == false){
			$('.modal-wifi-config #wifi-iot-checkbox').prop('checked', false);
		}
		else{
			$('.modal-wifi-config #wifi-iot-checkbox').prop('checked', true);
		}
		$('.modal-wifi-config.modal').modal({
			show: true,
			keyboard: false,
			backdrop: 'static'
		});
	});
	// =========================================================================
	// read serial to generate QR code modal form
	// =========================================================================
	$('#btn-qrcode').click(function(){
		Blockly.JavaScript.resetTaskNumber();
		$('.modal-qrcode .modal-body').text('');
		$('img #qrcode-img').remove();
		$('.modal-qrcode .modal-body').append('<li id="board_checking_li">' + LANG_QR_CHECKING + '</li>');
		$.ajax({
			url: '/port_list',
			type: 'POST',
			error: function(e) {
				$('#board_checking_li').text(LANG_PORT_CHECKING + '... ' + LANG_FAILED);
			},
			success: function(reply) {
				// check port list
				if (reply.result.length <= 0) {
					$('#board_checking_li').text(LANG_PORT_CHECKING + '... ' + LANG_FAILED);
				}
				else {
					var port_name = reply.result[0];
					var request = $.ajax({
						url: '/read_mac',
						method: 'POST',
						data: {
							port_name: port_name
						},
						error: function(e) {
							$('#board_checking_li').text(LANG_BOARD_CHECKING + '... ' + LANG_FAILED);
						},
						success: function(reply) {
							var mac_addr = reply.mac_addr.replace(/[:]/g, '-');

							var request = $.ajax({
								url: '/gen_qr',
								method: 'POST',
								data: {
									mac_addr: mac_addr,
								},
								dataType: 'json',
								error: function(e) {
									$('#board_checking_li').text(LANG_BOARD_CHECKING + '... ' + LANG_FAILED);
								},
								success: function(reply) {
									// $('#board_checking_li').text(LANG_BOARD_CHECKING + '... ' + LANG_PASSED + ' (' + mac_addr + ')');
									$('.modal-qrcode .modal-body').append('<img id="qrcode-img" src="/images/qrcode.png" style="display: block;margin-left: auto;margin-right: auto;width: 50%;">');
								}
							});
						}
					});
				}
			}
		});
		$('.modal-qrcode.modal').modal('show');
	});

}

HomeController.prototype.onUpdateSuccess = function() {
	$('.modal-alert').modal({
		show: false,
		keyboard: true,
		backdrop: true
	});
	$('.modal-alert .modal-header h4').text('Success!');
	$('.modal-alert .modal-body p').html('Your account has been updated.');
	$('.modal-alert').modal('show');
	$('.modal-alert button').off('click');
}

function homeSetLanguage(lang) {
	$.ajax({
		type: 'GET',
		url: '/lang?set=' + lang,
		error: function(e) {
			window.location.href = '/home';
		},
		success: function() {
			window.location.href = '/home';

		},
	});

	
}

// https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings#answer-30106551
function b64EncodeUnicode(str) {
	return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
		return String.fromCharCode(parseInt(p1, 16))
	}))
}

function b64DecodeUnicode(str) {
	return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
	}).join(''))
}

