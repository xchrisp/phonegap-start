/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var map; // กำหนดตัวแปร map ไว้ด้านนอกฟังก์ชัน เพื่อให้สามารถเรียกใช้งาน จากส่วนอื่นได้
var my_Marker; // กำหนดตัวแปรสำหรับเก็บตัว marker
var infowindow; // กำหนดตัวแปรสำหรับเก็บตัว popup แสดงรายละเอียดสถานที่
var GGM; // กำหนดตัวแปร GGM ไว้เก็บ google.maps Object จะได้เรียกใช้งานได้ง่ายขึ้น
function initialize() { // ฟังก์ชันแสดงแผนที่
    GGM=new Object(google.maps); // เก็บตัวแปร google.maps Object ไว้ในตัวแปร GGM
	// กำหนดจุดเริ่มต้นของแผนที่
	var my_Latlng  = new GGM.LatLng(14.158831205140325,101.3462369090148);
	var my_mapTypeId=GGM.MapTypeId.ROADMAP; // กำหนดรูปแบบแผนที่ที่แสดง
	// กำหนด DOM object ที่จะเอาแผนที่ไปแสดง ที่นี้คือ div id=map_canvas
	var my_DivObj=$("#map_canvas")[0]; 
	// กำหนด Option ของแผนที่
	var myOptions = {
		zoom: 13, // กำหนดขนาดการ zoom
		center: my_Latlng , // กำหนดจุดกึ่งกลาง
		mapTypeId:my_mapTypeId // กำหนดรูปแบบแผนที่
	};
	map = new GGM.Map(my_DivObj,myOptions);// สร้างแผนที่และเก็บตัวแปรไว้ในชื่อ map
	
	my_Marker = new GGM.Marker({ // สร้างตัว marker
		position: my_Latlng,  // กำหนดไว้ที่เดียวกับจุดกึ่งกลาง
		map: map, // กำหนดว่า marker นี้ใช้กับแผนที่ชื่อ instance ว่า map
//		draggable:true, // กำหนดให้สามารถลากตัว marker นี้ได้
		title:"คลิกเพื่อดูรายละเอียดของสถานที่!" // แสดง title เมื่อเอาเมาส์มาอยู่เหนือ
	});

	infowindow = new GGM.InfoWindow({
		content:$.ajax({
			url:'placeDetail.php',//ใช้ ajax ใน jQuery ดึงข้อมูลจากไฟล์ placeDetail.php มาแสดง
			async:false
		}).responseText
	});
	
	// กำหนด event ให้กับตัว marker เมื่อคลิกที่ตัว marker ให้แสดง infowindows
	GGM.event.addListener(my_Marker, 'click', function() {
		infowindow.open(map,my_Marker); // ให้แสดง infowindows รายละเอียดสถานที่ ทุกครั้งที่โหลดแผนที่แล้ว 

	});		


	// กำหนด event ให้กับตัวแผนที่ เมื่อส่วนของแผนที่ทำการโหลดเรียบร้อยแล้ว
	GGM.event.addListener(map, 'tilesloaded', function() {
		infowindow.open(map,my_Marker); // ให้แสดง infowindows รายละเอียดสถานที่ ทุกครั้งที่โหลดแผนที่แล้ว 

	});



}
$(function(){
	// โหลด สคริป google map api เมื่อเว็บโหลดเรียบร้อยแล้ว
	// ค่าตัวแปร ที่ส่งไปในไฟล์ google map api
	// v=3.2&sensor=false&language=th&callback=initialize
	//	v เวอร์ชัน่ 3.2
	//	sensor กำหนดให้สามารถแสดงตำแหน่งที่เปิดแผนที่อยู่ได้ เหมาะสำหรับมือถือ ปกติใช้ false
	//	language ภาษา th ,en เป็นต้น
	//	callback ให้เรียกใช้ฟังก์ชันแสดง แผนที่ initialize
	$("<script/>", {
	  "type": "text/javascript",
	  src: "http://maps.google.com/maps/api/js?v=3.2&sensor=false&language=th&callback=initialize"
	}).appendTo("body");	
});
