$('#email').click(function(){
	alert();
});

$("#unipdCoursesButton").click(function() {
	$('#unipdProjectsButton').text('PROJECTS');
	$("#unipdProjects").hide('fold', 100);
	$(this).hide('fade', 400, function() {
		$(this).text(function(i, text) {
			return text === "COURSES" ? 'CLOSE' : "COURSES";
		})
		$(this).show('fade', 400);
	});

	$("#unipdCourses").toggle('fold', 1000);
});

$("#unipdProjectsButton").click(function() {
	$('#unipdCoursesButton').text('COURSES');
	$("#unipdCourses").hide('fold', 100);
	$(this).hide('fade', 400, function() {
		$(this).text(function(i, text) {
			return text === "PROJECTS" ? 'CLOSE' : "PROJECTS";
		})
		$(this).show('fade', 400);
	});
	$("#unipdProjects").toggle('fold', 1000);
});

