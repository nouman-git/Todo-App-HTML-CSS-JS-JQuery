var totalData = new Array();
var count = 1;
// form validation
(function () {
    'use strict'
    const forms = document.querySelectorAll('.requires-validation')
    Array.from(forms)  
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          event.preventDefault()
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            form.classList.add('was-validated')
          }else{
            var data = $('.requires-validation').serializeArray();
            var addJson1 = {"name":"id","value":count++};
            data.unshift(addJson1);
            if (data.length != 4) {
              var addJson2 = {"name":"status","value":0};
              data.push(addJson2);
            }
            totalData.push(data);
            successToast("Task added successfully!!");
            $(".addList").toggleClass("active");
            $(".addList").toggleClass("collapsed");
            $("#add-list").removeClass("show");
            $('.requires-validation').trigger("reset");
            $('.requires-validation').attr("class","requires-validation w-100");
          }
        }, false)
      })
})()

// menu button toggle
var menu_btn = document.querySelector("#menu-btn");
var sidebar = document.querySelector("#sidebar");
var container = document.querySelector(".my-container");
menu_btn.addEventListener("click", () => {
  sidebar.classList.toggle("active-nav");
  container.classList.toggle("active-cont");
  menu_btn.classList.toggle("rotate_btn");
});
// sidebar.addEventListener("mouseover", () => {
//   $(sidebar).addClass("active-nav");
//   $(container).addClass("active-cont");
//   $(menu_btn).addClass("rotate_btn");
// });
// sidebar.addEventListener("mouseout", () => {
//   $(sidebar).removeClass("active-nav");
//   $(container).removeClass("active-cont");
//   $(menu_btn).removeClass("rotate_btn");
// });
$(".nav-link div.w-100").click(function () { 
  if (!$(this).hasClass("active")) {
    $(".nav-link div.w-100").removeClass("active");
  }
  $(this).toggleClass("active");
});



$(".editModal1").on("click",function(){
  $("table").addClass("editTable");
})
$(".deleteModal1").on("click",function(){
  $("table").addClass("deleteTable");
})
// All Modal
$(".allModal").on("click",function(){
  $("body").addClass("modal-open");
  $("#allModal").addClass("show");
  $("#allModal").css("display","block");
  $("#allData").html(" ");
  if (totalData.length > 0) {  
    for (let i = 0; i < totalData.length; i++) {
      var thisId = totalData[i][0].value;
      var thisTitle = totalData[i][1].value;
      var thisdescription = totalData[i][2].value;
      var thisStatus = (totalData[i][3].value == 1 ? "<span class='text-success fw-bold'>Done</span>" : "<span class='text-danger fw-bold'>Pending</span>");
      $("#allData").append("<tr><td class='fw-bold'>"+thisId+"</td><td>"+thisTitle+"</td><td class='tdDescription'>"+thisdescription+"</td><td>"+thisStatus+"</td><td class='edit_delete'><button class='btn btn-edit btn-sm text-white editModal onEdit' id='"+thisId+"'>Update</button><button class='btn btn-danger btn-sm onDelete' id='"+thisId+"'>Delete</button></td></tr>");
    }
  }else{
    $("#allData").html("<tr><td colspan='5'>No Task Exists Yet</td></tr>");
  }
});
$(".btnAllClose").on("click",function(){
  allModalClose();
});
function allModalClose(){
  $("body").removeClass("modal-open");
  $("#allModal").removeClass("show");
  $("#allModal").css("display","none");
  $(".allModal").removeClass("active");
  $("table").removeClass("editTable");
  $("table").removeClass("deleteTable");
}

// Delete Data
$("table ").on("click",".onDelete",function(){
  var deleteId = $(this).attr("id");
  console.log(deleteId);
  for (let i = 0; i < totalData.length; i++) {
    var thisId = totalData[i][0].value;
    if (thisId == deleteId) {
      totalData.splice(i, 1);
      deleteToast("Task deleted Successfully!!");
      break;
    }
  }
  allModalClose();
});
// Edit Modal
$("table ").on("click",".editModal",function(){
  $("body").addClass("modal-open");
  $("#editModal").addClass("show");
  $("#editModal").css("display","block");
  var editId = $(this).attr("id");
  for (let i = 0; i < totalData.length; i++) {
    var thisId = totalData[i][0].value;
    if (thisId == editId) {
      var thisTitle = totalData[i][1].value;
      var thisdescription = totalData[i][2].value;
      var thisStatus = totalData[i][3].value;
      $("#EditId").val(thisId);
      $("#EditTitle").val(thisTitle);
      $("#Editdescription").val(thisdescription);
      if (thisStatus == 1) {        
        $("#EditStatus").prop("checked",true); 
      }else{
        $("#EditStatus").prop("checked",false); 
      }
    }
  }
});

$(".btneditClose").on("click",function(){
  editModalClose();
});
function editModalClose(){
  $("body").removeClass("modal-open");
  $("#editModal").removeClass("show");
  $("#editModal").css("display","none");
  $(".editModal").toggleClass("active");
  $(".editForm").removeClass("was-validated");
}


// Edit Data
$(".editData").on("click",function(){
  $(".editForm").addClass("was-validated");
  var editData = $(".editForm").serializeArray();
  var thisTitle = editData[1].value;
  var thisDescription = editData[2].value;
  if (thisTitle.length > 0 && thisDescription.length > 0) {
    if (editData.length != 4) {
      var addJson2 = {"name":"status","value":0};
      editData.push(addJson2);
    }
    var thisStatus = editData[3].value;
    for (let i = 0; i < totalData.length; i++) {
      var thisId = totalData[i][0].value;
      if (thisId == editData[0].value) {
        totalData[i][1].value = thisTitle;
        totalData[i][2].value = thisDescription;
        totalData[i][3].value = thisStatus;
        successToast("Task updated successfully!!");
        editModalClose();
        allModalClose();
        break;
      }
    }
  }
});


// sweet Toast 

var toastMixin = Swal.mixin({
  toast: true,
  icon: 'success',
  title: 'General Title',
  animation: false,
  position: 'bottom-right',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
  toast.addEventListener('mouseenter', Swal.stopTimer)
  toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});
function successToast(text) {
  toastMixin.fire({
    animation: true,
    title: text
  });
}
function deleteToast(text) {
  toastMixin.fire({
    animation: true,
    title: text,
    icon: 'error'
  });
}
